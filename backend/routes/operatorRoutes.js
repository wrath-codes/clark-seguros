//* Contact Routes
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
	deleteOperator
} from '../controllers/operatorController.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All Operators
// @route   GET - /api/operators
// @access  Private
// --------------------------------------------------------------
router.route('/').get(getOperators).post(createOperator)

//* -------------------------------------------------------------

// @desc    Fetch a single Operator
// @route   GET - /api/operators/:id
// @access  Private
// --------------------------------------------------------------
router.route('/:id').get(getOperator).delete(deleteOperator)

//* -------------------------------------------------------------
export default router
