//* Operator Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
// @models
import PlanCard from '../models/planCardModel.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All PlanCards
// @route   GET - /api/plancards
// @access  Private
// --------------------------------------------------------------
const getPlanCards = asyncHandler(async (req, res, next) => {
	// get all plans
	let query

	if (req.params.employerId) {
		query = PlanCard.find({ employer: req.params.employerId }).populate({
			path: 'employer plan contract employee titular',
			select: 'name cnpj ansRegister identifier cpf dateOfBirth mothersName sex age maritalStatus address email cellphone reach slug startDate endDate isValid contractFile operator'
		})
	} else {
		query = PlanCard.find({}).populate({
			path: 'employer plan contract employee titular',
			select: 'name cnpj ansRegister identifier cpf dateOfBirth mothersName sex age maritalStatus address email cellphone reach slug startDate endDate isValid contractFile operator'
		})
	}

	const planCards = await query

	// check if there are no plans in the database
	if (planCards <= 0) {
		res.status(400)
		throw new Error(`There are ${planCards.length} plan cards in the database!`)
	}

	// response
	res.status(200).json({
		success: true,
		msg: 'Show all planCards',
		count: planCards.length,
		data: planCards
	})
})

//* -------------------------------------------------------------

// @desc    Fetch Single planCard
// @route   GET - /api/plancards/:id
// @access  Private
// --------------------------------------------------------------
const getPlanCard = asyncHandler(async (req, res, next) => {
	// get planCard with id
	const planCard = await PlanCard.findById(req.params.id).populate({
		path: 'employer plan contract employee titular',
		select: 'name cnpj ansRegister identifier cpf dateOfBirth mothersName sex age maritalStatus address email cellphone reach slug startDate endDate isValid contractFile operator'
	})

	if (planCard) {
		// response
		res.status(200).json({
			success: true,
			msg: `Show Plan Card ${planCard._id}`,
			data: planCard
		})
	} else {
		res.status(400)
		throw new Error('Plan Card not found!')
	}
})

//* -------------------------------------------------------------

// @desc    Update Single Plan Card
// @route   GET - /api/plancards/:id
// @access  Private
// --------------------------------------------------------------
const updatePlanCard = asyncHandler(async (req, res, next) => {
	// get planCard with id
	const planCard = await PlanCard.findById(req.params.id)
	const employer = planCard.employer
	const plan = planCard.plan
	const contract = planCard.contract
	const planValue = planCard.planValue
	console.log(employer)
	// checks if plan card exists
	if (!planCard) {
		res.status(400)
		throw new Error('Plan Card not found!')
	}

	// checks if employer changed and add changes to employment history
	if (req.body.employer && req.body.employer != employer) {
		// updates employmentHistory
		await PlanCard.findOneAndUpdate(
			{
				_id: planCard._id,
				employmentHistory: { $elemMatch: { employer: employer } }
			},
			{
				$set: {
					'employmentHistory.$.exitDate': new Date(),
					'employmentHistory.$.isCurrent': false
				}
			}
		)
		// adds new employer to employment history
		await PlanCard.findByIdAndUpdate(
			{ _id: planCard._id },
			{
				$push: {
					employmentHistory: {
						employer: req.body.employer,
						startDate: new Date()
					}
				}
			}
		)
	}

	// checks if contract changed and add changes to contract history
	if (req.body.contract && req.body.contract != contract) {
		// updates contractHistory
		await PlanCard.findOneAndUpdate(
			{
				_id: planCard._id,
				contractHistory: { $elemMatch: { contract: contract } }
			},
			{
				$set: {
					'contractHistory.$.exitDate': new Date(),
					'contractHistory.$.isCurrent': false
				}
			}
		)
		// adds new contract to contract history
		await PlanCard.findByIdAndUpdate(
			{ _id: planCard._id },
			{
				$push: {
					contractHistory: {
						contract: req.body.contract,
						startDate: new Date()
					}
				}
			}
		)
	}

	// checks if plan changed and add changes to plan history
	if (req.body.plan && req.body.plan != plan) {
		// updates planHistory
		await PlanCard.findOneAndUpdate(
			{
				_id: planCard._id,
				planHistory: { $elemMatch: { plan: plan } }
			},
			{
				$set: {
					'planHistory.$.exitDate': new Date(),
					'planHistory.$.isCurrent': false
				}
			}
		)
		// adds new plan to plan history
		await PlanCard.findByIdAndUpdate(
			{ _id: planCard._id },
			{
				$push: {
					planHistory: {
						plan: req.body.plan,
						startDate: new Date()
					}
				}
			}
		)
	}

	// checks if planValue changed and add changes to planValue history
	if (req.body.planValue && req.body.planValue != planValue) {
		// adds planValue to planValueHistory
		await PlanCard.findByIdAndUpdate(
			{ _id: planCard._id },
			{
				$push: {
					planValueHistory: {
						value: req.body.planValue,
						change: new Date()
					}
				}
			}
		)
	}

	const updatedPlanCard = await PlanCard.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	})

	// get full planCard
	const result = await PlanCard.findById(req.params.id).populate({
		path: 'employer plan contract employee',
		select: 'name cnpj ansRegister identifier cpf dateOfBirth, mothersName sex age maritalStatus address email cellphone'
	})

	// response
	res.status(200).json({
		success: true,
		msg: ` Plan Card ${result._id} updated`,
		data: result
	})
})

//* -------------------------------------------------------------

export { getPlanCards, getPlanCard, updatePlanCard }
