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
		res.status(201).json({
			_id: user._id,
			name: user.name.firstName + ' ' + user.name.lastName,
			email: user.email,
			cellphone: user.cellphone,
			role: user.role,
			token: token
		})
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
		res.status(200).json({
			_id: user._id,
			name: user.name.firstName + ' ' + user.name.lastName,
			email: user.email,
			token: token
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data!')
	}
})

//* -------------------------------------------------------------

export { registerUser, loginUser }
