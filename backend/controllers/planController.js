//* Plan Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
import Operator from '../models/operatorModel.js'
// @models
import Plan from '../models/planModel.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All Plans
// @route   GET - /api/plans
// @route 	GET - /api/operators/:operatorId/plans
// @access  Private
// --------------------------------------------------------------
const getPlans = asyncHandler(async (req, res, next) => {
	// get all plans
	let query

	if (req.params.operatorId) {
		query = Plan.find({ operator: req.params.operatorId }).populate({
			path: 'operator',
			select: 'name cnpj'
		})
	} else {
		query = Plan.find({}).populate({
			path: 'operator',
			select: 'name cnpj'
		})
	}

	const plans = await query

	// check if there are no plans in the database
	if (plans <= 0) {
		res.status(400)
		throw new Error(`There are ${plans.length} plans in the database!`)
	}

	// response
	res.status(200).json({
		success: true,
		msg: 'Show all plans',
		count: plans.length,
		data: plans
	})
})

//* -------------------------------------------------------------

// @desc    Fetch Single Plan
// @route   GET - /api/plans/:id
// @access  Private
// --------------------------------------------------------------
const getPlan = asyncHandler(async (req, res, next) => {
	// get all plans
	const plan = await Plan.findById(req.params.id).populate({
		path: 'operator',
		select: 'name cnpj'
	})
	// checks if there's a plan with that id
	if (plan) {
		// response
		res.status(200).json({
			success: true,
			msg: `Show plan ${plan._id}`,
			data: plan
		})
	} else {
		res.status(404)
		throw new Error(`No plan with id of !${plan._id}`)
	}
})

//* -------------------------------------------------------------

// @desc    Fetch Single Plan
// @route   POST - /api/plans/
// @route   POST - /api/operators/:operatorId/plans
// @access  Private
// --------------------------------------------------------------
const createPlan = asyncHandler(async (req, res, next) => {
	//get operator id from params
	req.body.operator = req.params.operatorId

	// gets operator drom database
	const operator = await Operator.findById(req.params.operatorId)

	if (!operator) {
		res.status(400)
		throw new Error(`No operator with the id of ${req.params.operatorId}!`)
	}

	// destructure plan
	const { name, ansRegister, kind, reach } = req.body

	if (!name || !ansRegister || !kind || !reach) {
		res.status(400)
		throw new Error('Please add all fields for the Plan!')
	}

	// creates plan
	const plan = await Plan.create(req.body)

	// response
	res.status(201).json({
		success: true,
		msg: `Plan | ${plan.name} - created wint id: ${plan._id} `,
		data: plan
	})
})

//* -------------------------------------------------------------

// @desc    Delete Single Plan
// @route   DELETE - /api/plans/:id
// @access  Private
// --------------------------------------------------------------
const deletePlan = asyncHandler(async (req, res, next) => {
	// get plan with id
	const plan = await Plan.findById(req.params.id)

	// check if plan exists
	if (!plan) {
		res.status(404)
		throw new Error('Plan not found!')
	}

	// delete plan
	await plan.delete()

	// success message response
	res.status(200).json({ success: true })
})

//* -------------------------------------------------------------

// @desc    Delete Single Plan
// @route   DELETE - /api/plans/:id
// @access  Private
// --------------------------------------------------------------
const updatePlan = asyncHandler(async (req, res, next) => {
	// get plan with id
	const plan = await Plan.findById(req.params.id)

	// check if plan exists
	if (!plan) {
		res.status(404)
		throw new Error('Plan not found!')
	}

	// update plan
	const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	})

	// response
	res.status(200).json(updatedPlan)
})

//* -------------------------------------------------------------

export { getPlans, getPlan, createPlan, deletePlan, updatePlan }
