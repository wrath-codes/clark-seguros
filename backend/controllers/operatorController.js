//* Operator Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
import path from 'path'
import slugify from 'slugify'
// @utils
import { uploadFile } from '../utils/uploadFile.js'
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
	// checks if there are no operators
	if (res.advancedResults.length <= 0) {
		res.status(400)
		throw new Error(`There are ${res.advancedResults.length} employers in the database!`)
	}
	// response
	res.status(200).json(res.advancedResults)
})

//* -------------------------------------------------------------

// @desc    Fetch a single Operator
// @route   GET - /api/operators/:id
// @access  Private
// --------------------------------------------------------------
const getOperator = asyncHandler(async (req, res, next) => {
	//get operator with id and populate contact field
	const operator = await Operator.findById(req.params.operatorId)
		.populate({
			path: 'plans contact',
			select: 'name cnpj cellphone ansRegister'
		})
		.populate({
			path: 'contracts',
			select: 'employer identifier employees',
			populate: {
				path: 'employer',
				select: 'name cnpj '
			}
		})

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
		.populate({
			path: 'plans contact',
			select: 'name cnpj cellphone ansRegister'
		})
		.populate({
			path: 'contracts',
			select: 'employer identifier employees',
			populate: {
				path: 'employer',
				select: 'name cnpj '
			}
		})

	// changes slugs
	updatedOperator.slug = slugify(updatedOperator.name, { lower: true })
	// saves updated slug
	updatedOperator.save({ validateBeforeSave: false })

	// response
	res.status(200).json({
		success: true,
		msg: `Operator ${updatedOperator.name} updated`,
		count: updatedOperator.length,
		data: updatedOperator
	})
})

//* -------------------------------------------------------------

// @desc    Photo Upload Operator
// @route   PUT - /api/operators/:id
// @access  Private
// -------------------------------------------------------------
const photoUploadOperator = asyncHandler(async (req, res, next) => {
	// get operator, contact and plans with id
	const operator = await Operator.findById(req.params.operatorId)

	// checks if operator exists
	if (!operator) {
		res.status(404)
		throw new Error('Operator not found!')
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
	file.name = `photo_operator_${operator._id}${path.parse(file.name).ext}`

	// upload to aws
	await uploadFile(file)

	// creates path to image
	const updatedOperator = await Operator.findByIdAndUpdate(
		req.params.operatorId,
		{
			photo: process.env.AWS_URL + file.name
		},
		{
			new: true
		}
	)

	// success message response
	res.status(200).json({
		success: true,
		msg: `Operator ${updatedOperator.name} photo updated`,
		data: updatedOperator
	})
})

//* -------------------------------------------------------------

export {
	getOperators,
	getOperator,
	createOperator,
	deleteOperator,
	updateOperator,
	photoUploadOperator
}
