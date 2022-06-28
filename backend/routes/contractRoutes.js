//* Contract Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
const router = express.Router()
// @controller
import {
	getContracts,
	getContract,
	createContract,
	endContract,
	deleteContract,
	fileUploadContract
} from '../controllers/contractController.js'
// @models
import Contract from '../models/contractModel.js'
// @middleware
import { protect, authorize } from '../middleware/authProtectMiddleware.js'
import { advancedResults } from '../middleware/advancedResults.js'
// uses
router.use(protect)
router.use(authorize('admin', 'staff'))

//* @routes
//* -------------------------------------------------------------

// @desc    Fetch All Contracts | Create Single Contract
// @route   GET/POST - /api/contracts
// @access  Private
// --------------------------------------------------------------
router
	.route('/')
	.get(
		advancedResults(Contract, {
			path: 'employer operator',
			select: 'name cnpj plans'
		}),
		getContracts
	)
	.post(createContract)
//* -------------------------------------------------------------

// @desc    Fetch Single Contract | Updates contract to history | Delete Single Contract
// @route   GET - /api/contracts/:id
// @access  Private
// --------------------------------------------------------------
router.route('/:id').get(getContract).put(endContract).delete(deleteContract)

//* ------------------------------------------------------------

// @desc    Upload Contract File
// @route   PUT - /api/contracts/:id/file
// @access  Private
// --------------------------------------------------------------
router.route('/:id/file').put(fileUploadContract)

//* ------------------------------------------------------------
export default router
