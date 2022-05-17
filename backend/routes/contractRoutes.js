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
	deleteContract
} from '../controllers/contractController.js'

//* @routes
//* -------------------------------------------------------------

// @desc    Fetch All Contracts | Create Single Contract
// @route   GET/POST - /api/contracts
// @access  Private
// --------------------------------------------------------------
router.route('/').get(getContracts).post(createContract)
//* -------------------------------------------------------------

// @desc    Fetch Single Contract | Updates contract to history | Delete Single Contract
// @route   GET - /api/contracts/:id
// @access  Private
// --------------------------------------------------------------
router.route('/:id').get(getContract).put(endContract).delete(deleteContract)

//* ------------------------------------------------------------
export default router
