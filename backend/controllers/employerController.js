//* Employer Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
import path from 'path'
// @utils
import { uploadFile } from '../utils/uploadFile.js'
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

const getEmployers = asyncHandler(async (req, res, next) => {
	// get employers and populate manager and handler fields
	const employers = await Employer.find({})

		.populate({
			path: 'contact',
			select: 'name cellphone'
		})
		.populate({
			path: 'employees',
			select: 'employee plan',
			populate: {
				path: 'employee plan identifier planValue kind',
				select: 'name cpf ansRegister employer identifier'
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

const getEmployer = asyncHandler(async (req, res, next) => {
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

// @desc    Create single Employer
// @route   POST - /api/employers
// @access  Private
// --------------------------------------------------------------

const createEmployer = asyncHandler(async (req, res, next) => {
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

const deleteEmployer = asyncHandler(async (req, res, next) => {
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

const updateEmployer = asyncHandler(async (req, res, next) => {
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

// @desc    Upload Photo for Employer
// @route   PUT - /api/employers/:id/photo
// @access  Private
// --------------------------------------------------------------

const photoUploadEmployer = asyncHandler(async (req, res, next) => {
	// get employer and it's contact with id
	const employer = await Employer.findById(req.params.id)

	// checks if employer exists
	if (!employer) {
		res.status(404)
		throw new Error('Employer not found!')
	}

	// check if file was uploaded
	if (!req.files) {
		res.status(400)
		throw new Error('Please upload a file!')
	}

	const file = req.files.file

	// make sure the image is a photo
	if (!file.mimetype.startsWith('image')) {
		res.status(400)
		throw new Error('Only images are accepted!')
	}

	// check file size
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		res.status(400)
		throw new Error(`Please upload a image with less than ${process.env.MAX_FILE_UPLOAD}!`)
	}

	// create custom file name
	file.name = `photo_employer_${employer._id}${path.parse(file.name).ext}`

	// upload to aws
	await uploadFile(file)

	await Employer.findByIdAndUpdate(req.params.id, {
		photo: process.env.AWS_URL + file.name
	})

	const updatedEmployer = await Employer.findById(req.params.id)

	// success message response
	res.status(200).json({
		success: true,
		msg: `Employer ${updatedEmployer.name} photo updated`,
		data: updatedEmployer
	})
	// })
})

//* -------------------------------------------------------------

export {
	getEmployers,
	getEmployer,
	createEmployer,
	deleteEmployer,
	updateEmployer,
	photoUploadEmployer
}
