//* Employer Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
// @models
import Employer from '../models/employerModel.js'
import Contact from '../models/contactModel.js'
import User from '../models/userModel.js'
import Plan from '../models/planModel.js'
import Employee from '../models/employeeModel.js'
import PlanCard from '../models/planCardModel.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All Employers
// @route   GET - /api/employers
// @access  Private
// --------------------------------------------------------------

const getEmployers = asyncHandler(async (req, res) => {
	// create query
	// get employers and populate manager and handler fields
	const employers = await Employer.find({})
		.populate({
			path: 'contact',
			select: 'name cellphone'
		})
		.populate({
			path: 'contact',
			select: 'name cellphone'
		})
		.populate({
			path: 'employees',
			select: 'employee plan',
			populate: {
				path: 'employee plan  identifier planValue kind',
				select: 'name cpf ansRegister employer identifier  '
			}
		})
		.populate({
			path: 'contracts',
			select: 'operator identifier isValid',
			populate: {
				path: 'operator',
				select: 'name cnpj'
			}
		})

	// checks if there are no employers
	if (employers <= 0) {
		res.status(400)
		throw new Error(`There are ${employers.length} employers in the database!`)
	}

	// response
	res.status(200).json({
		success: true,
		msg: 'Show all employers',
		count: employers.length,
		data: employers
	})
})

//* -------------------------------------------------------------

// @desc    Fetch Single Employer
// @route   GET - /api/employers/:id
// @access  Private
// --------------------------------------------------------------

const getEmployer = asyncHandler(async (req, res) => {
	// get employer with id and populate manager and handler fields
	const employer = await Employer.findById(req.params.id)
		.populate({
			path: 'contact',
			select: 'name cellphone'
		})
		.populate({
			path: 'employees',
			select: 'employee plan contract',
			populate: {
				path: 'employee plan contract identifier planValue kind',
				select: 'name cpf ansRegister employer identifier operator '
			}
		})
		.populate({
			path: 'contracts',
			select: 'operator identifier isValid',
			populate: {
				path: 'operator',
				select: 'name cnpj'
			}
		})
	// check if there's an employer with that id
	if (employer) {
		// response
		res.status(200).json({
			success: true,
			msg: `Show employer ${employer._id}`,
			data: employer
		})
	} else {
		res.status(404)
		throw new Error('Employer not found!')
	}
})

//* -------------------------------------------------------------

// @desc    Fetch Single Employer
// @route   GET - /api/employers/:id
// @access  Private
// --------------------------------------------------------------

const getEmployerStats = asyncHandler(async (req, res) => {
	// get employer with id and populate manager and handler fields
	const employer = await Employer.findById(req.params.id)
	// plans used distict
	const plansUsed = await PlanCard.find({ employer: employer._id }).distinct('plan')

	// check if there's an employer with that id
	if (employer) {
		res.status(200).json({
			success: true,
			msg: `Stats for employer ${employer._id}`,
			plans: plansUsed,
			plansCount: plansUsed.length
		})
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
		country
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
		}
	})

	// response
	res.status(201).json({
		success: true,
		msg: `Show employer ${employer._id}`,
		data: employer
	})
})

//* -------------------------------------------------------------

// @desc    Delete single Employer
// @route   DELETE - /api/employers/:id
// @access  Private
// --------------------------------------------------------------

const deleteEmployer = asyncHandler(async (req, res) => {
	// get employer and it's contact with id
	const employer = await Employer.findById(req.params.id)

	// checks if employer exists
	if (!employer) {
		res.status(404)
		throw new Error('Employer not found!')
	}

	// delete employer
	await employer.delete()

	// success message response
	res.status(200).json({
		success: true,
		msg: `Employer ${employer.name} deleted`,
		count: employer.length
	})
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
	const updatedEmployer = await Employer.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	})

	const result = await Employer.findById(updatedEmployer._id).populate({
		path: 'contact',
		select: 'name cellphone'
	})

	// response
	res.status(200).json({
		success: true,
		msg: `Employer ${employer.name} updated`,
		count: updatedEmployer.length,
		data: updatedEmployer
	})
})

//* -------------------------------------------------------------

export {
	getEmployers,
	getEmployer,
	createEmployer,
	deleteEmployer,
	updateEmployer,
	getEmployerStats
}
