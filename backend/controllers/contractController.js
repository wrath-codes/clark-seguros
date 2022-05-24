//* Contract Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
import path from 'path'
// @utils
import { uploadFile } from '../utils/uploadFile.js'
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
const getContracts = asyncHandler(async (req, res, next) => {
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
const getContract = asyncHandler(async (req, res, next) => {
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
			msg: `Show contract ${contract.identifier}`,
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
const createContract = asyncHandler(async (req, res, next) => {
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

	// complete result
	const result = await Contract.findById(contract._id)
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

	// response
	res.status(200).json({
		success: true,
		msg: `Contract ${contract.identifier} created`,
		data: contract
	})
})

//* -------------------------------------------------------------

// @desc    Ends Single Contract
// @route   PUT - /api/contracts/:id
// @access  Private
// --------------------------------------------------------------
const endContract = asyncHandler(async (req, res, next) => {
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

	// response
	res.status(200).json({
		success: true,
		msg: `Contract ${contract.identifier} ended`,
		data: update
	})
})

//* -------------------------------------------------------------

// @desc    Delete Single Contract
// @route   DELETE - /api/contracts/:id
// @access  Private
// --------------------------------------------------------------
const deleteContract = asyncHandler(async (req, res, next) => {
	// get contract with id
	const contract = await Contract.findById(req.params.id)

	// check if contract exists
	if (!contract) {
		res.status(400)
		throw new Error('Contract not found!')
	}

	//delete contract from database
	await contract.delete()

	// response
	res.status(200).json({
		success: true,
		msg: `Contract ${req.params.id} deleted`
	})
})

//* -------------------------------------------------------------

// @desc    Upload Contract File
// @route   PUT - /api/contracts/:id/file
// @access  Private
// -------------------------------------------------------------
const fileUploadContract = asyncHandler(async (req, res, next) => {
	// get contract with id
	const contract = await Contract.findById(req.params.id)

	// check if contract exists
	if (!contract) {
		res.status(400)
		throw new Error('Contract not found!')
	}

	// check if file was uploaded
	if (!req.files) {
		res.status(400)
		throw new Error('Please upload a file!')
	}

	const file = req.files.file

	// make sure the image is a photo
	if (!file.mimetype.includes('pdf')) {
		res.status(400)
		throw new Error('Only pdfs are accepted!')
	}

	// check file size
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		res.status(400)
		throw new Error(`Please upload a image with less than ${process.env.MAX_FILE_UPLOAD}!`)
	}

	// create custom file name
	file.name = `file_contract_${contract._id}${path.parse(file.name).ext}`

	// upload to aws
	await uploadFile(file)

	// creates path to image
	await Contract.findByIdAndUpdate(req.params.id, {
		contractFile: process.env.AWS_URL + file.name
	})

	const updatedContract = await Contract.findById(req.params.id)

	// response
	res.status(200).json({
		success: true,
		msg: `Contract ${req.params.id} file uploaded`,
		data: updatedContract
	})
})

//* -------------------------------------------------------------

export {
	getContracts,
	getContract,
	createContract,
	endContract,
	deleteContract,
	fileUploadContract
}
