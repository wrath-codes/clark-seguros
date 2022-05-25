//* User Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
// @models
import User from '../models/userModel.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Get All Users
// @route   GET - /api/users/
// @access  Private / Admin
// --------------------------------------------------------------

const getUsers = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults)
})

//* -------------------------------------------------------------

// @desc    Get Single User
// @route   GET - /api/users/:id
// @access  Private / Admin
// --------------------------------------------------------------

const getUser = asyncHandler(async (req, res, next) => {
	//
	const user = await User.findById(req.user.id)

	res.status(200).json({
		success: true,
		message: `User ${user._id} showing`,
		data: user
	})
})

//* -------------------------------------------------------------

// @desc    Create User
// @route   POST - /api/users/
// @access  Private / Admin
// --------------------------------------------------------------

const createUser = asyncHandler(async (req, res, next) => {
	//
	const user = await User.create(req.body)

	res.status(201).json({
		success: true,
		message: `User ${user._id} created`,
		data: user
	})
})

//* -------------------------------------------------------------

// @desc    Update User
// @route   PUT - /api/users/:id
// @access  Private / Admin
// --------------------------------------------------------------

const updateUser = asyncHandler(async (req, res, next) => {
	//
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	})

	res.status(200).json({
		success: true,
		message: `User ${user._id} created`,
		data: user
	})
})

//* -------------------------------------------------------------

// @desc    Delete User
// @route   DELETE - /api/users/:id
// @access  Private / Admin
// --------------------------------------------------------------

const deleteUser = asyncHandler(async (req, res, next) => {
	// find user
	const user = await User.findById(req.params.id)

	// checks if user exists
	if (!user) {
		res.status(400)
		throw new Error('User not found!')
		next()
	}

	await user.delete()

	res.status(200).json({
		success: true,
		message: `User ${req.params.id} deleted`,
		data: {}
	})
})

//* -------------------------------------------------------------

export { getUsers, getUser, createUser, updateUser, deleteUser }
