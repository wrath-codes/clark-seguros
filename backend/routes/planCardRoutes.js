//* Employee Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
// @controller
import {
	getPlanCards,
	getPlanCard,
	updatePlanCard
} from '../controllers/planCardController.js'

const router = express.Router()

//* routes
//* -------------------------------------------------------------

// @desc    Fetch All Operators | Create an Operator
// @route   GET - /api/plan-cards
// @access  Private
// --------------------------------------------------------------
router.route('/').get(getPlanCards)

//* -------------------------------------------------------------

// @desc    Fetch Single Operator
// @route   GET - /api/plan-cards/:id
// @access  Private
// --------------------------------------------------------------
router.route('/:id').get(getPlanCard).put(updatePlanCard)

//* -------------------------------------------------------------

export default router
