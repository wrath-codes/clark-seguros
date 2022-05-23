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
	const contracts = await Contract.find({}).populate('employer').populate('operator')

	// check if there are no contracts in the database
	if (contracts <= 0) {
		res.status(400)
		throw new Error(`There are ${contracts.length} contracts in the database!`)
	}

	// response
	res.json(contracts)
})

//* -------------------------------------------------------------

// @desc    Fetch Single Contract
// @route   GET - /api/contracts/:id
// @access  Private
// --------------------------------------------------------------
const getContract = asyncHandler(async (req, res) => {
	// get contract with id
	const contract = await Contract.findById(req.params.id)
		.populate({
			path: 'employer',
			select: 'name cnpj'
		})
		.populate({
			path: 'operator',
			select: 'name cnpj'
		})
		.populate({
			path: 'employees',
			select: 'employee',
			populate: {
				path: 'employee',
				select: 'name cpf'
			}
		})
		.populate({
			path: 'employees',
			select: 'plan',
			populate: {
				path: 'plan',
				select: 'name ansRegister'
			}
		})

	// checks if contract exists
	if (contract) {
		res.status(200).json({
			success: true,
			msg: `Show contract ${contract.name}`,
			count: contract.length,
			data: contract
		})
	} else {
		res.status(404)
		throw new Error('Contract not found!')
	}
})

//* -------------------------------------------------------------

// @desc    Create Single Contract
// @route   POST - /api/contracts
// @access  Private
// --------------------------------------------------------------
const createContract = asyncHandler(async (req, res) => {
	// destructure contract
	const { operator, employer, identifier } = req.body

	// check if operator exists
	const checkOperator = await Operator.findById(operator)
	if (!operator || !checkOperator) {
		res.status(400)
		throw new Error('Operator not found!')
	}

	// check if employer exists
	const checkEmployer = await Employer.findById(employer)
	if (!employer || !checkEmployer) {
		res.status(400)
		throw new Error('Employer not found!')
	}
	// checks if the contract identifier was inputed
	if (!identifier) {
		res.status(400)
		throw new Error('Please add the contract identifier!')
	}

	// creates contract
	const contract = await Contract.create({
		operator: operator,
		employer: employer,
		identifier: identifier,
		startDate: new Date()
	})

	if (contract) {
		// increse number of contracts on employer
		await Employer.findByIdAndUpdate(
			{ _id: employer },
			{
				$inc: { numContracts: 1 }
			},
			{ new: true }
		)
		// increse number of contracts on operator
		await Operator.findByIdAndUpdate(
			{ _id: operator },
			{
				$inc: { numContracts: 1 }
			},
			{ new: true }
		)
		// adds contract to contract history}
		await Employer.findByIdAndUpdate(
			{ _id: employer },
			{
				$push: { contractHistory: contract._id }
			},
			{ new: true }
		)
	}

	// complete result
	const result = await Contract.findById(contract._id)
		.populate('employer')
		.populate('operator')

	// response
	res.status(200).json(result)
})

//* -------------------------------------------------------------

// @desc    Ends Single Contract
// @route   PUT - /api/contracts/:id
// @access  Private
// --------------------------------------------------------------
const endContract = asyncHandler(async (req, res) => {
	// get contract with id
	const contract = await Contract.findById(req.params.id)

	// check if contract exists
	if (!contract) {
		res.status(400)
		throw new Error('Contract not found!')
	}

	//updates contract history
	const update = await Contract.findByIdAndUpdate(
		{ _id: contract._id },
		{
			$set: {
				endDate: new Date(),
				isValid: false
			}
		},
		{ new: true }
	)

	res.status(200).json({ success: true, update })
})

//* -------------------------------------------------------------

// @desc    Delete Single Contract
// @route   DELETE - /api/contracts/:id
// @access  Private
// --------------------------------------------------------------
const deleteContract = asyncHandler(async (req, res) => {
	// get contract with id
	const contract = await Contract.findById(req.params.id)

	// check if contract exists
	if (!contract) {
		res.status(400)
		throw new Error('Contract not found!')
	}

	// get employer and decreases number of contracts
	await Employer.findByIdAndUpdate(
		{ _id: contract.employer },
		{
			$inc: { numContracts: -1 }
		},
		{ new: true }
	)

	// get operator and decreases number of contracts
	await Operator.findByIdAndUpdate(
		{ _id: contract.operator },
		{
			$inc: { numContracts: -1 }
		},
		{ new: true }
	)

	//delete contract from database
	await contract.delete()

	res.status(200).json({ success: true, update })
})

//* -------------------------------------------------------------

export { getContracts, getContract, createContract, endContract, deleteContract }
