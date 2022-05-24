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
	updateOperator,
	photoUploadOperator
} from '../controllers/operatorController.js'
// include other resource routers
import planRouter from './planRoutes.js'
import contactRouter from './contactRoutes.js'

const router = express.Router()

// re-route into other resource routers
router.use('/:operatorId/plans', planRouter) // add routes to plans
router.use('/:operatorId/contacts', contactRouter) // add routes to contact

//* routes
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

// @desc    Upload Operator Photo
// @route   PUT - /api/operators/:id
// @access  Private
// --------------------------------------------------------------
router.route('/:operatorId/photo').put(photoUploadOperator)

//* -------------------------------------------------------------

export default router
