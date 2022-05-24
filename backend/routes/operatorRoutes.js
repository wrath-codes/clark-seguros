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
// include middleware
import { advancedResults } from '../middleware/advancedResults.js'
import { protect, authorize } from '../middleware/authProtectMiddleware.js'
// @import Operator Model
import Operator from '../models/operatorModel.js'
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
router
	.route('/')
	.get(
		protect,
		authorize('admin', 'staff-health', 'staff-all'),
		advancedResults(Operator, {
			path: 'plans contracts contact',
			select: 'name ansRegister employer identifier name cellphone'
		}),
		getOperators
	)
	.post(protect, authorize('admin', 'staff-health', 'staff-all'), createOperator)

//* -------------------------------------------------------------

// @desc    Fetch an Operator | Delete an Operator | Updates Operator
// @route   GET|DELETE|PUT - /api/operators/:id
// @access  Private
// --------------------------------------------------------------
router
	.route('/:operatorId')
	.get(protect, authorize('admin', 'staff-health', 'staff-all'), getOperator)
	.delete(protect, authorize('admin', 'staff-health', 'staff-all'), deleteOperator)
	.put(protect, authorize('admin', 'staff-health', 'staff-all'), updateOperator)

//* -------------------------------------------------------------

// @desc    Upload Operator Photo
// @route   PUT - /api/operators/:id
// @access  Private
// --------------------------------------------------------------
router
	.route('/:operatorId/photo')
	.put(protect, authorize('admin', 'staff-health', 'staff-all'), photoUploadOperator)

//* -------------------------------------------------------------

export default router
