//* Auth Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
const router = express.Router()
// @controller
import {
	registerUser,
	loginUser,
	logoutUser,
	getMe,
	forgotPassword,
	resetPassword,
	updateDetails,
	updatePassword
} from '../controllers/authController.js'
// @middleware
import { protect, authorize } from '../middleware/authProtectMiddleware.js'

//* @routes
//* -------------------------------------------------------------

// @desc    Register User
// @route   POST - /api/auth/register
// @access  Private / Admin
// --------------------------------------------------------------
router.route('/register').post(protect, authorize('admin'), registerUser)

//* -------------------------------------------------------------

// @desc    Login User
// @route   POST - /api/auth/login
// @access  Public
// --------------------------------------------------------------
router.route('/login').post(loginUser)

//* -------------------------------------------------------------'

// @desc    Log User Out / Clear Cookie
// @route   GET - /api/auth/logout
// @access  Private
// --------------------------------------------------------------
router.route('/logout').get(protect, logoutUser)

//* ------------------------------------------------------------
// @desc    Get Current User
// @route   POST - /api/auth/me
// @access  Private
// --------------------------------------------------------------
router.route('/me').get(protect, getMe)

//* -------------------------------------------------------------

// @desc    Forgot Password
// @route   POST - /api/auth/forgotpassword
// @access  Private
// --------------------------------------------------------------
router.route('/forgotpassword').post(forgotPassword)

//* -------------------------------------------------------------

// @desc    Reset Password
// @route   PUT - /api/auth/resetpassword/:resettoken
// @access  Public
// --------------------------------------------------------------
router.route('/resetpassword/:resettoken').put(resetPassword)

//* -------------------------------------------------------------

// @desc    Update User Details
// @route   PUT - /api/auth/updatedetails
// @access  Private
// --------------------------------------------------------------
router.route('/updatedetails').put(protect, updateDetails)

//* -------------------------------------------------------------

// @desc    Update User Password
// @route   PUT - /api/auth/updatepassword
// @access  Private
// --------------------------------------------------------------
router.route('/updatepassword').put(protect, updatePassword)

//* -------------------------------------------------------------

export default router
