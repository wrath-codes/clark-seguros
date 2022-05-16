//* Plan Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
// @models
import Plan from '../models/planModel.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All Plans
// @route   GET - /api/plans
// @access  Private
// --------------------------------------------------------------
const getPlans = asyncHandler(async (req, res) => {
	// get all plans
	const plans = await Plan.find({}).populate('operator')

	// check if there are no plans in the database
	if (plans <= 0) {
		res.status(400)
		throw new Error(`There are ${plans.length} plans in the database!`)
	}

	// response
	res.json(plans)
})

//* -------------------------------------------------------------

// @desc    Fetch Single Plan
// @route   GET - /api/plans/:id
// @access  Private
// --------------------------------------------------------------
const getPlan = asyncHandler(async (req, res) => {
	// get all plans
	const plan = await Plan.findById(req.params.id).populate('operator')

	// checks if there's a plan with that id
	if (plan) {
		res.json(plan)
	} else {
		res.status(404)
		throw new Error('Plan not found!')
	}
})

//* -------------------------------------------------------------

// @desc    Fetch Single Plan
// @route   GET - /api/plans/:id
// @access  Private
// --------------------------------------------------------------
const createPlan = asyncHandler(async (req, res) => {
	// destructure plan
	const { name, ansRegister, kind, reach, operator } = req.body

	if (!name || !ansRegister || !kind || !reach) {
		res.status(400)
		throw new Error('Please add all fields for the Plan!')
	}
	if (!operator) {
		res.status(400)
		throw new Error('Make sure the Operator exists!')
	}

	// creates plan
	const plan = await Plan.create({
		name: name,
		ansRegister: ansRegister,
		kind: kind,
		reach: reach,
		operator: operator
	})

	// response
	res.status(200).json(plan)
})

//* -------------------------------------------------------------

// @desc    Delete Single Plan
// @route   DELETE - /api/plans/:id
// @access  Private
// --------------------------------------------------------------
const deletePlan = asyncHandler(async (req, res) => {
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
const updatePlan = asyncHandler(async (req, res) => {
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
