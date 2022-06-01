//* Employer Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
const router = express.Router()
// @controller
import {
	getEmployers,
	getEmployer,
	createEmployer,
	deleteEmployer,
	updateEmployer,
	photoUploadEmployer
} from '../controllers/employerController.js'
// include other resource routers
import employeeRouter from './employeeRoutes.js'
// @middleware
import { protect, authorize } from '../middleware/authProtectMiddleware.js'
// uses
router.use(protect)
router.use(authorize('admin', 'staff'))

// re-route into other resource routers
router.use('/:employerId/employees', employeeRouter) // add employee routes

//* routes

// @access  Private
// --------------------------------------------------------------
router.route('/').get(getEmployers).post(createEmployer)

//* -------------------------------------------------------------

// @desc    Fetch Single Employer | Delete Single Employer | Update Single Employer
// @route   GET - /api/employers/:id
// @access  Private
// --------------------------------------------------------------
router.route('/:id').get(getEmployer).delete(deleteEmployer).put(updateEmployer)
//* ------------------------------------------------------------

// @desc    Upload Photo for Employer
// @route   PUT - /api/employers/:id/photo
// @access  Private
// --------------------------------------------------------------
router.route('/:id/photo').put(photoUploadEmployer)
//* ------------------------------------------------------------

export default router
