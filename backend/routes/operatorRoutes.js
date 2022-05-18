//* Operator Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
const router = express.Router()
// @controller
import {
	getOperators,
	getOperator,
	createOperator,
	deleteOperator,
	updateOperator,
	getOperatorPlans,
	getOperatorContact
} from '../controllers/operatorController.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All Operators | Create an Operator
// @route   GET|POST - /api/operators
// @access  Private
// --------------------------------------------------------------
router.route('/').get(getOperators).post(createOperator)

//* -------------------------------------------------------------

// @desc    Fetch an Operator | Delete an Operator | Updates Operator
// @route   GET|DELETE|PUT - /api/operators/:id
// @access  Private
// --------------------------------------------------------------
router.route('/:id').get(getOperator).delete(deleteOperator).put(updateOperator)

//* -------------------------------------------------------------

// @desc    Fetch Plans from Operator
// @route   GET - /api/operators/:id/plans
// @access  Private
// --------------------------------------------------------------
router.route('/:id/plans').get(getOperatorPlans)

//* -------------------------------------------------------------

// @desc    Fetch Contact from Operator
// @route   GET - /api/operators/:id/contact
// @access  Private
// --------------------------------------------------------------
router.route('/:id/contact').get(getOperatorContact)

//* -------------------------------------------------------------

export default router
