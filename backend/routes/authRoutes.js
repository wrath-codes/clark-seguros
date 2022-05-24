//* Auth Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
const router = express.Router()
// @controller
import { registerUser, loginUser, getMe } from '../controllers/authController.js'
// @middleware
import { protect, authorize } from '../middleware/authProtectMiddleware.js'

//* @routes
//* -------------------------------------------------------------

// @desc    Register User
// @route   POST - /api/auth/register
// @access  Private
// --------------------------------------------------------------
router.route('/register').post(protect, authorize('admin'), registerUser)

//* -------------------------------------------------------------

// @desc    Login User
// @route   POST - /api/auth/login
// @access  Public
// --------------------------------------------------------------
router.route('/login').post(loginUser)

//* -------------------------------------------------------------

// @desc    Get Current User
// @route   POST - /api/auth/me
// @access  Private
// --------------------------------------------------------------
router
	.route('/me')
	.get(
		protect,
		authorize('admin', 'staff-auto', 'staff-health', 'staff-others', 'staff-all'),
		getMe
	)

//* -------------------------------------------------------------
export default router
