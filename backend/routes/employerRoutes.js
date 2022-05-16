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
	updateEmployer
} from '../controllers/employerController.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All Employers
// @route   GET - /api/employers/
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

export default router
