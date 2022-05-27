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
	photoUploadOperator
} from '../controllers/operatorController.js'
// include middleware
import { advancedResults } from '../middleware/advancedResults.js'
import { protect, authorize } from '../middleware/authProtectMiddleware.js'
// @import Operator Model
import Operator from '../models/operatorModel.js'
// include other resource routers
import planRouter from './planRoutes.js'
import contactRouter from './contactRoutes.js'

// uses
router.use(protect)
router.use(authorize('admin', 'staff-all', 'staff-health'))

// re-route into other resource routers
router.use('/:operatorId/plans', planRouter) // add routes to plans
router.use('/:operatorId/contacts', contactRouter) // add routes to contact

//* routes
//* -------------------------------------------------------------

// @desc    Fetch All Operators | Create an Operator
// @route   GET|POST - /api/operators
// @access  Private
// --------------------------------------------------------------
router
	.route('/')
	.get(
		advancedResults(Operator, {
			path: 'plans contracts contact',
			select: 'name ansRegister employer identifier name cellphone'
		}),
		getOperators
	)
	.post(createOperator)

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
