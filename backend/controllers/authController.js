//* Auth Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
import crypto from 'crypto'
// @models
import User from '../models/userModel.js'
// @utils
import { sendEmail } from '../utils/sendEmail.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Register User
// @route   POST - /api/auth/register
// @access  Private
// --------------------------------------------------------------

const registerUser = asyncHandler(async (req, res, next) => {
	// destructure user data
	const { name, email, cellphone, password, role } = req.body

	// validation
	if (!name || !email || !password || !cellphone) {
		res.status(400)
		throw new Error('Please Include all fields!')
	}

	// checks if user exists
	const checkUser = await User.findOne({ email: email })
	if (checkUser) {
		res.status(409)
		throw new Error('User with this email already exists')
	}

	const user = await User.create({
		name: {
			firstName: name.firstName,
			lastName: name.lastName
		},
		cellphone,
		email,
		password,
		role
	})

	// create token
	const token = user.getSignedJwtToken()

	if (user) {
		sendTokenResponse(user, 200, res)
	} else {
		res.status(400)
		throw new Error('Invalid user data!')
	}
})

//* -------------------------------------------------------------

// @desc    Login User
// @route   POST - /api/auth/login
// @access  Public
// --------------------------------------------------------------

const loginUser = asyncHandler(async (req, res, next) => {
	// destructure user data
	const { email, password } = req.body

	// validation
	if (!email || !password) {
		res.status(400)
		throw new Error('Please provide an email and password!')
	}

	// checks if user exists
	const user = await User.findOne({ email: email }).select('+password')
	if (!user) {
		res.status(400)
		throw new Error('Invalid Credentials!')
	}

	// check if password matches
	const isMatch = await user.matchPassword(password)
	if (!isMatch) {
		res.status(400)
		throw new Error('Invalid Credentials!')
	}

	// create token
	const token = user.getSignedJwtToken()

	if (user) {
		sendTokenResponse(user, 200, res)
	} else {
		res.status(400)
		throw new Error('Invalid user data!')
	}
})

//* -------------------------------------------------------------

// @desc    Log User Out / Clear Cookie
// @route   GET - /api/auth/logout
// @access  Private
// --------------------------------------------------------------

const logoutUser = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true
	})

	res.status(200).json({
		success: true,
		data: {}
	})
})

//* -------------------------------------------------------------

// @desc    Get Current User
// @route   POST - /api/auth/me
// @access  Private
// --------------------------------------------------------------

const getMe = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id)

	res.status(200).json({
		success: true,
		data: user
	})
})

//* -------------------------------------------------------------

// @desc    Update User Details
// @route   PUT - /api/auth/updatedetails
// @access  Private
// --------------------------------------------------------------

const updateDetails = asyncHandler(async (req, res, next) => {
	//
	const fieldsToUpdate = {
		name: req.body.name,
		email: req.body.email
	}

	const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
		new: true,
		runValidators: true
	})

	res.status(200).json({
		success: true,
		data: user
	})
})

//* -------------------------------------------------------------

// @desc    Update User Password
// @route   PUT - /api/auth/updatepassword
// @access  Private
// --------------------------------------------------------------

const updatePassword = asyncHandler(async (req, res, next) => {
	// find current user
	const user = await User.findById(req.user.id).select('+password')

	// check current password
	if (!(await user.matchPassword(req.body.currentPassword))) {
		res.status(401)
		throw new Error('Password is incorrect!')
		next()
	}

	// set password to new password
	user.password = req.body.newPassword
	await user.save()

	// send token response
	sendTokenResponse(user, 200, res)
})

//* -------------------------------------------------------------

// @desc    Forgot Password
// @route   POST - /api/auth/forgotpassword
// @access  Private
// --------------------------------------------------------------

const forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email })

	if (!user) {
		res.status(404)
		throw new Error('There is no user with that email!')
		next()
	}

	// get resetToken
	const resetToken = user.getResetPasswordToken()

	await user.save({ validateBeforeSave: false })

	// create reset url
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/auth/resetpassword/${resetToken}`

	const message = `You're receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n
					${resetUrl}`

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset token',
			message
		})

		res.status(200).json({
			success: true,
			data: 'Email sent!'
		})
	} catch (error) {
		console.log(error)
		user.resetPasswordToken = undefined
		user.resetPasswordExpire = undefined

		await user.save({ validateBeforeSave: false })

		res.status(500)
		throw new Error('Email could not be sent!')
		next()
	}

	res.status(200).json({
		success: true,
		data: user
	})
})

//* -------------------------------------------------------------

// @desc    Reset Password
// @route   PUT - /api/auth/resetpassword/:resettoken
// @access  Public
// --------------------------------------------------------------
const resetPassword = asyncHandler(async (req, res, next) => {
	// get hashed token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resettoken)
		.digest('hex')

	// find user by resettoken and valid expire date
	const user = await User.findOne({
		resetPasswordToken: resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() }
	})

	// checks if user is valid
	if (!user) {
		res.status(400)
		throw new Error('Invalid token!')
		next()
	}

	// set new password
	user.password = req.body.password
	user.resetPasswordToken = undefined
	user.resetPasswordExpire = undefined

	// saves user
	await user.save()

	// send token response
	sendTokenResponse(user, 200, res)
})

//* -------------------------------------------------------------

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = user.getSignedJwtToken()

	const options = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		httpOnly: true
	}

	if (process.env.NODE_ENV === 'production') {
		options.secure = true
	}

	res.status(statusCode).cookie('token', token, options).json({
		success: true,
		token
	})
}

//* -------------------------------------------------------------

export {
	registerUser,
	loginUser,
	getMe,
	forgotPassword,
	resetPassword,
	updateDetails,
	updatePassword,
	logoutUser
}
