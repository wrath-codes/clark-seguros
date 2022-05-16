//* Employer Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
// @models
import Employer from '../models/employerModel.js'
import Contact from '../models/contactModel.js'
import User from '../models/userModel.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All Employers
// @route   GET - /api/employers
// @access  Private
// --------------------------------------------------------------

const getEmployers = asyncHandler(async (req, res) => {
	// get employers and populate manager and handler fields
	const employers = await Employer.find({})
		.populate('manager')
		.populate('handler')

	// checks if there are no employers
	if (employers <= 0) {
		res.status(400)
		throw new Error(
			`There are ${employers.length} employers in the database!`
		)
	}

	// response
	res.json(employers)
})

//* -------------------------------------------------------------

// @desc    Fetch Single Employer
// @route   GET - /api/employers/:id
// @access  Private
// --------------------------------------------------------------

const getEmployer = asyncHandler(async (req, res) => {
	// get employer with id and populate manager and handler fields
	const employer = await Employer.findById(req.params.id)
		.populate('manager')
		.populate('handler')

	// check if there's an employer with that id
	if (employer) {
		res.json(employer)
	} else {
		res.status(404)
		throw new Error('Employer not found!')
	}
})

//* -------------------------------------------------------------

// @desc    Create single Employer
// @route   POST - /api/employers
// @access  Private
// --------------------------------------------------------------

const createEmployer = asyncHandler(async (req, res) => {
	// destructure employer
	const {
		name,
		cnpj,
		street,
		streetNumber,
		complement,
		neighborhood,
		city,
		cep,
		state,
		country,
		manager,
		handler
	} = req.body

	// checks if all required fields are filled
	if (
		!name ||
		!cnpj ||
		!street ||
		!streetNumber ||
		!neighborhood ||
		!city ||
		!cep ||
		!state ||
		!country
	) {
		res.status(400)
		throw new Error('Please add all fields for the Employer!')
	}

	// gets manager from contact collection or create dummy data
	const checkManager = await Contact.findById(manager)
	const dummyManager = await new Contact({
		name: {
			firstName: 'firstName',
			lastName: 'lastName'
		},
		cellphone: 'cellphone',
		email: 'email',
		kind: 'Cliente',
		cnpj: cnpj
	})

	// checks if manager exists otherwise create dummyManager
	if (!manager) {
		await Contact.create(dummyManager)
	}

	// create employer with manager and user
	const user = await User.findById(handler)

	// checks if user exists
	if (!user) {
		res.status(404)
		throw new Error('Handler does not exist!')
	}

	const employer = await Employer.create({
		name: name,
		cnpj: cnpj,
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
		manager: manager ? checkManager._id : dummyManager._id,
		handler: user._id
	})

	const result = await Employer.findById(employer._id)
		.populate('manager')
		.populate('handler')

	// response
	res.status(200).json(result)
})

//* -------------------------------------------------------------

// @desc    Delete single Employer
// @route   DELETE - /api/employers/:id
// @access  Private
// --------------------------------------------------------------

const deleteEmployer = asyncHandler(async (req, res) => {
	// get employer and it's contact with id
	const employer = await Employer.findById(req.params.id)
	const manager = await Contact.findById(employer.manager)

	// checks if employer exists
	if (!employer) {
		res.status(404)
		throw new Error('Employer not found!')
	}

	// checks of manager exists and deletes it
	if (manager) {
		await manager.delete()
	}

	// delete employer
	await employer.delete()

	// success message response
	res.status(200).json({ success: true })
})

//* -------------------------------------------------------------

// @desc    Update single Employer
// @route   PUT - /api/employers/:id
// @access  Private
// --------------------------------------------------------------

const updateEmployer = asyncHandler(async (req, res) => {
	// get employer
	const employer = await Employer.findById(req.params.id)

	// checks if employer exists
	if (!employer) {
		res.status(404)
		throw new Error('Employer not found!')
	}

	// edits employer
	const updatedEmployer = await Employer.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true
		}
	)

	const result = await Employer.findById(updatedEmployer._id)
		.populate('manager')
		.populate('handler')

	// response
	res.status(200).json(result)
})

//* -------------------------------------------------------------

export {
	getEmployers,
	getEmployer,
	createEmployer,
	deleteEmployer,
	updateEmployer
}
