//* Auth Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
const router = express.Router()
// @controller
import { registerUser, loginUser } from '../controllers/authController.js'

//* @routes
//* -------------------------------------------------------------

// @desc    Register User
// @route   POST - /api/auth/register
// @access  Private
// --------------------------------------------------------------
router.route('/register').post(registerUser)

//* -------------------------------------------------------------

// @desc    Login User
// @route   POST - /api/auth/login
// @access  Public
// --------------------------------------------------------------
router.route('/login').post(loginUser)
//* -------------------------------------------------------------

export default router
