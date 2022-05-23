//* Operator Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
// @models
import Contact from '../models/contactModel.js'
import Operator from '../models/operatorModel.js'
import Plan from '../models/planModel.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All Operators
// @route   GET - /api/operators
// @access  Private
// --------------------------------------------------------------
const getOperators = asyncHandler(async (req, res, next) => {
	//get all operators
	let query

	// copy req.query
	const reqQuery = { ...req.query }

	// fields to exclude
	const removeFields = ['select', 'sort', 'page', 'limit']

	// loop over removeFields and delete them from reqQuery
	removeFields.forEach((param) => delete reqQuery[param])

	//create query string
	let queryStr = JSON.stringify(reqQuery)

	// create operators ($gt | $gte | $lt | $lte | $in)
	queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

	// finding resource
	query = Operator.find(JSON.parse(queryStr))
		.populate({
			path: 'plans',
			select: 'name ansRegister'
		})
		.populate({
			path: 'contracts',
			select: 'employer identifier'
		})
		.populate({
			path: 'contact',
			select: 'name cellphone'
		})

	// select fields
	if (req.query.select) {
		const fields = req.query.select.split(',').join(' ')
		query = query.select(fields)
	}
	// sort
	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ')
		query = query.sort(sortBy)
	} else {
		query = query.sort('-createdAt')
	}

	// pagination
	const page = parseInt(req.query.page, 10) || 1
	const limit = parseInt(req.query.limit, 10) || 24
	const startIndex = (page - 1) * limit
	const endIndex = page * limit
	const total = await Operator.countDocuments()

	// pagination result
	const pagination = {}

	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit
		}
	}

	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit
		}
	}

	query = query.skip(startIndex).limit(limit)

	// Executing query
	const operators = await query

	//checks if there are no operators
	if (operators <= 0) {
		res.status(400)
		throw new Error(`There are ${operators.length} operators in the database!`)
	}

	// response
	res.status(200).json({
		success: true,
		msg: 'Show all operators',
		count: operators.length,
		pagination,
		data: operators
	})
})

//* -------------------------------------------------------------

// @desc    Fetch a single Operator
// @route   GET - /api/operators/:id
// @access  Private
// --------------------------------------------------------------
const getOperator = asyncHandler(async (req, res, next) => {
	//get operator with id and populate contact field
	const operator = await Operator.findById(req.params.operatorId)

	//checks if there's an operator with that id
	if (operator) {
		res.status(200).json({
			success: true,
			msg: `Show operator ${operator.name}`,
			count: operator.length,
			data: operator
		})
	} else {
		res.status(404)
		throw new Error('Operator not found!')
	}
})

//* -------------------------------------------------------------

// @desc    Create a new Operator
// @route   POST - /api/operators
// @access  Private
// -------------------------------------------------------------
const createOperator = asyncHandler(async (req, res, next) => {
	// destructure operator
	const {
		name,
		cnpj,
		website,
		street,
		streetNumber,
		complement,
		neighborhood,
		city,
		cep,
		state,
		country,
		username,
		password
	} = req.body

	if (
		!name ||
		!cnpj ||
		!website ||
		!street ||
		!streetNumber ||
		!neighborhood ||
		!city ||
		!cep ||
		!state ||
		!country
	) {
		res.status(400)
		throw new Error('Please add all fields for the Operator!')
	}

	// creates operator with Contact
	const operator = await Operator.create({
		name: name,
		cnpj: cnpj,
		website: website,
		address: {
			street: street,
			streetNumber: streetNumber,
			complement: complement,
			neighborhood: neighborhood,
			city: city,
			cep: cep,
			state: state,
			country: country
		},
		login: {
			username: username ? username : 'username',
			password: password ? password : 'password'
		}
	})

	// response
	res.status(201).json({
		success: true,
		msg: `Operator ${operator.name} created`,
		count: operator.length,
		data: operator
	})
})

//* -------------------------------------------------------------

// @desc    Delete single Operator
// @route   DELETE - /api/operators/:id
// @access  Private
// -------------------------------------------------------------
const deleteOperator = asyncHandler(async (req, res, next) => {
	// get operator, contact and plans with id
	const operator = await Operator.findById(req.params.operatorId)
	const contact = await Contact.findOne({ cnpj: operator.cnpj })
	const plans = await Plan.find({ operator: operator._id })

	// checks if operator exists
	if (!operator) {
		res.status(404)
		throw new Error('Operator not found!')
	}

	//checks if contact exists and deletes it
	if (contact) {
		await contact.delete()
	}

	if (plans) {
		await Plan.deleteMany({ operator: operator._id })
	}

	// delete operator
	await operator.remove()

	// success message response
	res.status(200).json({
		success: true,
		msg: `Operator ${operator.name} deleted`,
		count: operator.length
	})
})

//* -------------------------------------------------------------

// @desc    Update single Operator
// @route   PUT - /api/operators/:id
// @access  Private
// -------------------------------------------------------------
const updateOperator = asyncHandler(async (req, res, next) => {
	// get operator with id
	const operator = await Operator.findById(req.params.operatorId)

	// check if operator exists
	if (!operator) {
		res.status(404)
		throw new Error('Operator not found!')
	}

	// edits operator
	const updatedOperator = await Operator.findByIdAndUpdate(req.params.operatorId, req.body, {
		new: true
	})

	// response
	res.status(200).json({
		success: true,
		msg: `Operator ${operator.name} updated`,
		count: updatedOperator.length,
		data: updatedOperator
	})
})

//* -------------------------------------------------------------

// @desc    Update single Operator
// @route   PUT - /api/operators/:id
// @access  Private
// -------------------------------------------------------------
const getOperatorContact = asyncHandler(async (req, res) => {
	// get operator with id
	const operator = await Operator.findById(req.params.id)

	// check if operator exists
	if (!operator) {
		res.status(404)
		throw new Error('Operator not found!')
	}

	// checa se operadora tem contato
	const contact = await Contact.findOne({ cnpj: operator.cnpj })
	if (!contact) {
		res.status(404)
		throw new Error('Contact not found!')
	}

	// return contact
	res.status(200).json({
		success: true,
		msg: `Show ${operator.name} contact`,
		count: contact.length,
		data: contact
	})
})

//* -------------------------------------------------------------

export {
	getOperators,
	getOperator,
	createOperator,
	deleteOperator,
	updateOperator,
	getOperatorContact
}
