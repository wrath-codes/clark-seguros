//* Contract Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
// @models
import Contract from '../models/contractModel.js'
import Employer from '../models/employerModel.js'
import Operator from '../models/operatorModel.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All Contracts
// @route   GET - /api/contracts
// @access  Private
// --------------------------------------------------------------
const getContracts = asyncHandler(async (req, res) => {
	// get all contracts
	const contracts = await Contract.find({})
		.populate('employer')
		.populate('operator')

	// check if there are no contracts in the database
	if (contracts <= 0) {
		res.status(400)
		throw new Error(
			`There are ${contracts.length} contracts in the database!`
		)
	}

	// response
	res.json(contracts)
})

//* -------------------------------------------------------------

// @desc    Fetch All Contracts
// @route   GET - /api/contracts
// @access  Private
// --------------------------------------------------------------
const getContract = asyncHandler(async (req, res) => {
	// get contract with id
	const contract = await Contract.findById(req.params.id)

	// checks if contract exists
	if (contract) {
		res.json(contract)
	} else {
		res.status(404)
		throw new Error('Contract not found!')
	}
})

//* -------------------------------------------------------------

export { getContracts, getContract }
