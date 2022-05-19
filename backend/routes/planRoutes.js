//* Plan Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
const router = express.Router()
// @controller
import {
	getPlans,
	getPlan,
	createPlan,
	deletePlan,
	updatePlan
} from '../controllers/planController.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All Plans | Create Plan
// @route   GET/POST - /api/plans
// @access  Private
// --------------------------------------------------------------
router.route('/').get(getPlans).post(createPlan)

//* -------------------------------------------------------------

// @desc    Fetch Single Plan | Delete Single Plan | Update Single Plan
// @route   GET - /api/plans/:id
// @access  Private
// --------------------------------------------------------------
router.route('/:id').get(getPlan).delete(deletePlan).put(updatePlan)

//* ------------------------------------------------------------

export default router