//* Plan Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
import slugify from 'slugify'
// @models
import Plan from '../models/planModel.js'
import Operator from '../models/operatorModel.js'
import PlanCard from '../models/planCardModel.js'
import Employee from '../models/employeeModel.js'

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
		select: 'name cnpj address'
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
	const {
		name,
		ansRegister,
		kind,
		reach,
		from0To18,
		from19To23,
		from24To28,
		from29To33,
		from34To38,
		from39To43,
		from44To48,
		from49To53,
		from54To58,
		from59AndAbove
	} = req.body

	if (
		!name ||
		!ansRegister ||
		!reach ||
		!from0To18 ||
		!from19To23 ||
		!from24To28 ||
		!from29To33 ||
		!from34To38 ||
		!from39To43 ||
		!from44To48 ||
		!from49To53 ||
		!from54To58 ||
		!from59AndAbove
	) {
		res.status(400)
		throw new Error('Please add all fields for the Plan!')
	}

	// creates plan
	const plan = await Plan.create({
		name,
		ansRegister,
		reach,
		ageRangeValue: {
			from0To18,
			from19To23,
			from24To28,
			from29To33,
			from34To38,
			from39To43,
			from44To48,
			from49To53,
			from54To58,
			from59AndAbove
		},

		operator: operator._id
	})

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

	// get age value ranges
	const planValueFrom0To18 = plan.ageRangeValue.from0To18
	const planValueFrom19To23 = plan.ageRangeValue.from19To23
	const planValueFrom24To28 = plan.ageRangeValue.from24To28
	const planValueFrom29To33 = plan.ageRangeValue.from29To33
	const planValueFrom34To38 = plan.ageRangeValue.from34To38
	const planValueFrom39To43 = plan.ageRangeValue.from39To43
	const planValueFrom44To48 = plan.ageRangeValue.from44To48
	const planValueFrom49To53 = plan.ageRangeValue.from49To53
	const planValueFrom54To58 = plan.ageRangeValue.from54To58
	const planValueFrom59AndAbove = plan.ageRangeValue.from59AndAbove

	// update plan
	const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	}).populate({
		path: 'operator',
		select: 'name cnpj'
	})
	// change planValue
	if (
		planValueFrom0To18 !== updatedPlan.ageRangeValue.from0To18 ||
		planValueFrom19To23 !== updatedPlan.ageRangeValue.from19To23 ||
		planValueFrom24To28 !== updatedPlan.ageRangeValue.from24To28 ||
		planValueFrom29To33 !== updatedPlan.ageRangeValue.from29To33 ||
		planValueFrom34To38 !== updatedPlan.ageRangeValue.from34To38 ||
		planValueFrom39To43 !== updatedPlan.ageRangeValue.from39To43 ||
		planValueFrom44To48 !== updatedPlan.ageRangeValue.from44To48 ||
		planValueFrom49To53 !== updatedPlan.ageRangeValue.from49To53 ||
		planValueFrom54To58 !== updatedPlan.ageRangeValue.from54To58 ||
		planValueFrom59AndAbove !== updatedPlan.ageRangeValue.from59AndAbove
	) {
		const planCards = await PlanCard.find({ plan: updatedPlan._id })
		for (let i = 0; i < planCards.length; i++) {
			const employee = await Employee.findById(planCards[i].employee)
			let currentPlanCard
			if (employee.age >= 0 && employee.age <= 18) {
				currentPlanCard = await PlanCard.findOneAndUpdate(
					{ employee: employee._id },
					{
						planValue: updatedPlan.ageRangeValue.from0To18
					},
					{
						new: true
					}
				)
			}
			if (employee.age >= 19 && employee.age <= 23) {
				currentPlanCard = await PlanCard.findOneAndUpdate(
					{ employee: employee._id },
					{
						planValue: updatedPlan.ageRangeValue.from19To23
					},
					{
						new: true
					}
				)
			}
			if (employee.age >= 24 && employee.age <= 28) {
				currentPlanCard = await PlanCard.findOneAndUpdate(
					{ employee: employee._id },
					{
						planValue: updatedPlan.ageRangeValue.from24To28
					},
					{
						new: true
					}
				)
			}
			if (employee.age >= 29 && employee.age <= 33) {
				currentPlanCard = await PlanCard.findOneAndUpdate(
					{ employee: employee._id },
					{
						planValue: updatedPlan.ageRangeValue.from29To33
					},
					{
						new: true
					}
				)
			}
			if (employee.age >= 34 && employee.age <= 38) {
				currentPlanCard = await PlanCard.findOneAndUpdate(
					{ employee: employee._id },
					{
						planValue: updatedPlan.ageRangeValue.from34To38
					},
					{
						new: true
					}
				)
			}
			if (employee.age >= 39 && employee.age <= 43) {
				currentPlanCard = await PlanCard.findOneAndUpdate(
					{ employee: employee._id },
					{
						planValue: updatedPlan.ageRangeValue.from39To43
					},
					{
						new: true
					}
				)
			}
			if (employee.age >= 44 && employee.age <= 48) {
				currentPlanCard = await PlanCard.findOneAndUpdate(
					{ employee: employee._id },
					{
						planValue: updatedPlan.ageRangeValue.from44To48
					},
					{
						new: true
					}
				)
			}
			if (employee.age >= 49 && employee.age <= 53) {
				currentPlanCard = await PlanCard.findOneAndUpdate(
					{ employee: employee._id },
					{
						planValue: updatedPlan.ageRangeValue.from49To53
					},
					{
						new: true
					}
				)
			}
			if (employee.age >= 54 && employee.age <= 58) {
				currentPlanCard = await PlanCard.findOneAndUpdate(
					{ employee: employee._id },
					{
						planValue: updatedPlan.ageRangeValue.from54To58
					},
					{
						new: true
					}
				)
			}
			if (employee.age >= 59) {
				currentPlanCard = await PlanCard.findOneAndUpdate(
					{ employee: employee._id },
					{
						planValue: updatedPlan.ageRangeValue.from59AndAbove
					},
					{
						new: true
					}
				)
			}
			// recalculate cost for employer
			await currentPlanCard.recalculateCosts()
		}
	}

	// changes slugs
	updatedPlan.slug = slugify(updatedPlan.name, { lower: true })
	// saves updated slug
	updatedPlan.save({ validateBeforeSave: false })

	// response
	res.status(200).json({
		success: true,
		msg: `Plan ${updatedPlan.name} updated`,
		data: updatedPlan
	})
})

//* -------------------------------------------------------------

export { getPlans, getPlan, createPlan, deletePlan, updatePlan }
