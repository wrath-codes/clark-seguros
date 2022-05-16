//* Contract Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
const router = express.Router()
// @controller
import { getContracts, getContract } from '../controllers/contractController.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All Contracts
// @route   GET/POST - /api/contracts
// @access  Private
// --------------------------------------------------------------
router.route('/').get(getContracts)
//* -------------------------------------------------------------

// @desc    Fetch Single Contract
// @route   GET - /api/contracts/:id
// @access  Private
// --------------------------------------------------------------
router.route('/:id').get(getContract)

//* ------------------------------------------------------------
export default router
