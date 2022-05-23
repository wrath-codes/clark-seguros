//* Operator Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
// @controller
import {
	getOperators,
	getOperator,
	createOperator,
	deleteOperator,
	updateOperator
} from '../controllers/operatorController.js'
// include other resource routers
import planRouter from './planRoutes.js'
import contactRouter from './contactRoutes.js'

const router = express.Router()

// re-route into other resource routers
router.use('/:operatorId/plans', planRouter) // add routes to plans
router.use('/:operatorId/contacts', contactRouter) // add routes to contact

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
router.route('/:operatorId').get(getOperator).delete(deleteOperator).put(updateOperator)

//* -------------------------------------------------------------

export default router
