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
const getOperators = asyncHandler(async (req, res) => {
	//get all operators
	let query

	let queryStr = JSON.stringify(req.query)
	queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

	console.log(queryStr)

	query = Operator.find(JSON.parse(queryStr))
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
		data: operators
	})
})

//* -------------------------------------------------------------

// @desc    Fetch a single Operator
// @route   GET - /api/operators/:id
// @access  Private
// --------------------------------------------------------------
const getOperator = asyncHandler(async (req, res) => {
	//get operator with id and populate contact field
	const operator = await Operator.findById(req.params.id)

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
const createOperator = asyncHandler(async (req, res) => {
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
const deleteOperator = asyncHandler(async (req, res) => {
	// get operator, contact and plans with id
	const operator = await Operator.findById(req.params.id)
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
	await operator.delete()

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
const updateOperator = asyncHandler(async (req, res) => {
	// get operator with id
	const operator = await Operator.findById(req.params.id)

	// find operator's contact and change it's cnpj to operators cnpj
	const contact = await Contact.findOne({ cnpj: operator.cnpj })
	if (!contact) {
		res.status(404)
		throw new Error('Contact not found!')
	}

	// check if operator exists
	if (!operator) {
		res.status(404)
		throw new Error('Operator not found!')
	}

	// edits operator
	const updatedOperator = await Operator.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	})

	await Contact.findOneAndUpdate(
		{ cnpj: contact.cnpj },
		{
			$set: {
				cnpj: updatedOperator.cnpj
			}
		}
	)

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
const getOperatorPlans = asyncHandler(async (req, res) => {
	// get operator with id
	const operator = await Operator.findById(req.params.id)

	// check if operator exists
	if (!operator) {
		res.status(404)
		throw new Error('Operator not found!')
	}

	const plans = await Plan.find({ operator: operator._id })
	// return plans
	res.status(200).json({
		success: true,
		msg: `Show ${operator.name} plans`,
		count: plans.length,
		data: plans
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
	getOperatorPlans,
	getOperatorContact
}
