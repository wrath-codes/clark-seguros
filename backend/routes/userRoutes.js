//* Operator Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
const router = express.Router()
// @controller
import { authUser } from '../controllers/userController.js'

//* @routes
//* -------------------------------------------------------------

// @desc    Auth User & Get Token
// @route   GET - /api/users/login
// @access  Public
// --------------------------------------------------------------
router.route('/login').post(authUser)

//* -------------------------------------------------------------

export default router
