//* Auth Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
// @models
import User from '../models/userModel.js'

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
	if (!name || !email || !password || !cellphone || !role) {
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

export { registerUser, loginUser, getMe }
