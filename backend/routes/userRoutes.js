//* User Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
const router = express.Router()
// @controller
import {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser
} from '../controllers/userController.js'
// @models
import User from '../models/userModel.js'
// @middleware
import { protect, authorize } from '../middleware/authProtectMiddleware.js'
import { advancedResults } from '../middleware/advancedResults.js'

// uses
router.use(protect)
router.use(authorize('admin'))

//* @routes
//* -------------------------------------------------------------

// @desc    Get All Users | Create User
// @route   GET/POST - /api/users/
// @access  Private / Admin
// --------------------------------------------------------------
router.route('/').get(advancedResults(User), getUsers).post(createUser)

//* -------------------------------------------------------------

// @desc    Get Single User | Update User
// @route   GET/PUT/DELETE - /api/users/:id
// @access  Private / Admin
// --------------------------------------------------------------
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

//* -------------------------------------------------------------

export default router

// "email":"rvazn.ds@gmail.com",
//     "password": "Quel6969!
