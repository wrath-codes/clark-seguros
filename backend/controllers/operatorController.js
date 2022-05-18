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
	const operators = await Operator.find({}).populate('contact')

	//checks if there are no operators
	if (operators <= 0) {
		res.status(400)
		throw new Error(`There are ${operators.length} operators in the database!`)
	}

	// response
	res.json(operators)
})

//* -------------------------------------------------------------

// @desc    Fetch a single Operator
// @route   GET - /api/operators/:id
// @access  Private
// --------------------------------------------------------------
const getOperator = asyncHandler(async (req, res) => {
	//get operator with id and populate contact field
	const operator = await Operator.findById(req.params.id).populate('contact')

	//checks if there's an operator with that id
	if (operator) {
		res.json(operator)
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
		contact
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

	// gets contact from contact collection or create dummy data
	const checkContact = await Contact.findById(contact)
	const dummyContact = await new Contact({
		name: {
			firstName: 'firstName',
			lastName: 'lastName'
		},
		cellphone: 'cellphone',
		email: 'email',
		kind: 'Operadora',
		cnpj: cnpj
	})

	if (!contact) {
		await Contact.create(dummyContact)
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
		contact: contact ? checkContact._id : dummyContact._id
	})

	const result = await Operator.findById(operator._id).populate('contact')

	// response
	res.status(200).json(result)
})

//* -------------------------------------------------------------

// @desc    Delete single Operator
// @route   DELETE - /api/operators/:id
// @access  Private
// -------------------------------------------------------------
const deleteOperator = asyncHandler(async (req, res) => {
	// get operator, contact and plans with id
	const operator = await Operator.findById(req.params.id)
	const contact = await Contact.findById(operator.contact)
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
	res.status(200).json({ success: true })
})

//* -------------------------------------------------------------

// @desc    Update single Operator
// @route   PUT - /api/operators/:id
// @access  Private
// -------------------------------------------------------------
const updateOperator = asyncHandler(async (req, res) => {
	// get operator with id
	const operator = await Operator.findById(req.params.id)

	// check if operator exists
	if (!operator) {
		res.status(404)
		throw new Error('Operator not found!')
	}

	// edits operator
	const updatedOperator = await Operator.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	})

	const result = await Operator.findById(updatedOperator._id).populate('contact')

	// response
	res.status(200).json(result)
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
	res.status(200).json(plans)
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

	const contact = await Contact.findOne({ cnpj: operator.cnpj })

	// return contact
	res.status(200).json(contact)
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
