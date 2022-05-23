//* Employer Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
// @controller
import {
	getEmployers,
	getEmployer,
	createEmployer,
	deleteEmployer,
	updateEmployer,
	getEmployerStats
} from '../controllers/employerController.js'

const router = express.Router()

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

// @desc    Fetch Employer's Stats
// @route   GET - /api/employers/:id/stats
// @access  Private
// --------------------------------------------------------------
router.route('/:id/stats').get(getEmployerStats)
//* ------------------------------------------------------------

export default router
