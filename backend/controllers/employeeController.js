//* Employee Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
// @models
import Employee from '../models/employeeModel.js'
import Contract from '../models/contractModel.js'
import Employer from '../models/employerModel.js'
import PlanCard from '../models/planCardModel.js'
import Plan from '../models/planModel.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All Employees
// @route   GET - /api/employees
// @access  Private
// --------------------------------------------------------------
const getEmployees = asyncHandler(async (req, res, next) => {
	// get all employees
	let query

	if (req.params.employerId) {
		query = Employee.find({ employer: req.params.employerId })
			.populate({
				path: 'planCard',
				select: 'employer plan contract',
				populate: {
					path: 'employer plan contract',
					select: 'name cnpj ansRegister identifier'
				}
			})
			.populate('age')
	} else {
		query = Employee.find({})
			.populate({
				path: 'planCard',
				select: 'employer plan contract',
				populate: {
					path: 'employer plan contract',
					select: 'name cnpj ansRegister identifier'
				}
			})
			.populate('age')
	}
	// get all employees
	const employees = await query

	// check if there are no employees in the database
	if (employees <= 0) {
		res.status(400)
		throw new Error(`There are ${employees.length} employees in the database!`)
	}

	//response
	res.status(200).json({
		success: true,
		msg: 'Show all employees',
		count: employees.length,
		data: employees
	})
})

//* -------------------------------------------------------------

// @desc    Fetch Single Employee
// @route   GET - /api/employees/:id
// @access  Private
// --------------------------------------------------------------
const getEmployee = asyncHandler(async (req, res, next) => {
	// get employee with id
	const employee = await Employee.findById(req.params.id)
		.populate({
			path: 'planCard',
			select: 'employer plan contract',
			populate: {
				path: 'employer plan contract',
				select: 'name cnpj ansRegister identifier'
			}
		})
		.populate('age')
		.populate({
			path: 'planCard',
			select: 'kind identifier planValue planHistory planValueHistory employmentHistory contractHistory',
			populate: {
				path: 'employmentHistory contractHistory planHistory',
				select: 'name cnpj ansRegister identifier plan employer operator',
				populate: {
					path: 'employer operator',
					select: 'name cnpj ansRegister identifier'
				}
			}
		})

	// check if there are no employees in the database
	if (employee) {
		res.status(200).json({
			success: true,
			msg: `Show employee ${employee._id}`,
			count: employee.length,
			data: employee
		})
	} else {
		res.status(400)
		throw new Error('Employee not found!')
	}
})

//* -------------------------------------------------------------

// @desc    Create Single Employee
// @route   POST - /api/employees/:id
// @access  Private
// --------------------------------------------------------------
const createEmployee = asyncHandler(async (req, res, next) => {
	// destructure employee
	const {
		firstName,
		lastName,
		cpf,
		dateOfBirth,
		sex,
		maritalStatus,
		mothersFirstName,
		mothersLastName,
		street,
		streetNumber,
		complement,
		neighborhood,
		city,
		cep,
		state,
		country,
		email,
		cellphone,
		employer,
		contract,
		plan,
		cardIdentifier,
		planValue,
		kind,
		lives
	} = req.body

	// check if all fields are filled
	if (
		!firstName ||
		!lastName ||
		!cpf ||
		!dateOfBirth ||
		!sex ||
		!maritalStatus ||
		!mothersFirstName ||
		!mothersLastName ||
		!street ||
		!streetNumber ||
		!neighborhood ||
		!city ||
		!cep ||
		!state ||
		!country ||
		!email ||
		!cellphone
	) {
		res.status(400)
		throw new Error('Please add all the Employee required fields!')
	}

	// check if employer exists
	const checkEmployer = await Employer.findById(employer)
	if (!employer || !checkEmployer) {
		res.status(400)
		throw new Error('Employer not found!')
	}

	// check if contract exists
	const checkContract = await Contract.findById(contract)
	if (!contract || !checkContract) {
		res.status(400)
		throw new Error('Contract not found!')
	}

	// check if plan information is entered
	const checkPlan = await Plan.findById(plan)
	if (!checkPlan || !plan || !planValue || !kind || !lives) {
		res.status(400)
		throw new Error('Please add all the Plan required fields!')
	}

	// check if the card already exists
	const checkCardIdentifier = await PlanCard.findOne({ identifier: cardIdentifier })
	if (!cardIdentifier || checkCardIdentifier) {
		res.status(400)
		throw new Error(
			'Plan Card found! Please check if the user is not already in the database!'
		)
	}

	// creates employee
	const employee = await Employee.create({
		name: {
			firstName: firstName,
			lastName: lastName
		},
		cpf: cpf,
		dateOfBirth: dateOfBirth,
		sex: sex,
		maritalStatus: maritalStatus,
		mothersName: {
			firstName: mothersFirstName,
			lastName: mothersLastName
		},
		email: email,
		cellphone: cellphone,
		address: {
			street: street,
			streetNumber: streetNumber,
			complement: complement ? complement : '',
			neighborhood: neighborhood,
			city: city,
			cep: cep,
			state: state,
			country: country
		}
	})

	if (employee) {
		const planCard = await PlanCard.create({
			employee: employee._id,
			plan: plan,
			planValue: planValue,
			kind: kind,
			lives: lives,
			identifier: cardIdentifier,
			contract: contract,
			employer: employer
		})

		//adds current plan value to planHistory
		await PlanCard.findByIdAndUpdate(
			{ _id: planCard._id },
			{
				$push: {
					planValueHistory: {
						change: new Date(),
						value: planCard.planValue
					}
				}
			},
			{ new: true }
		)
		// add current plan to planHistory
		await PlanCard.findByIdAndUpdate(
			{ _id: planCard._id },
			{
				$push: {
					planHistory: {
						plan: plan,
						change: new Date()
					}
				}
			},
			{ new: true }
		)
		// add employment history to employee plancard
		await PlanCard.findByIdAndUpdate(
			{ _id: planCard._id },
			{
				$push: {
					employmentHistory: {
						employer: plan,
						startDate: new Date()
					}
				}
			},
			{ new: true }
		)
		// add contract history to employee plancard
		await PlanCard.findByIdAndUpdate(
			{ _id: planCard._id },
			{
				$push: {
					contractHistory: {
						contract: plan,
						startDate: new Date()
					}
				}
			},
			{ new: true }
		)
	}

	// prepare response
	const employeeResult = await Employee.findById(employee._id)
		.populate({
			path: 'planCard',
			select: 'employer plan contract',
			populate: {
				path: 'employer plan contract',
				select: 'name cnpj ansRegister identifier'
			}
		})
		.populate('age')

	// response
	res.status(200).json({
		success: true,
		msg: `Employee ${employeeResult._id} created`,
		data: employeeResult
	})
})

//* -------------------------------------------------------------

// @desc    Fetch Single Employee
// @route   GET - /api/employees/:id
// @access  Private
// --------------------------------------------------------------
const deleteEmployee = asyncHandler(async (req, res, next) => {
	// get employee with id
	const employee = await Employee.findById(req.params.id)

	// checks if employee exists
	if (!employee) {
		res.status(400)
		throw new Error('Employee not found!')
	}

	// delete employee from database
	await employee.delete()

	res.status(200).json({
		success: true,
		msg: `Employee ${employee._id} deleted`
	})
})

//* -------------------------------------------------------------

// @desc    Fetch Single Employee
// @route   GET - /api/employees/:id
// @access  Private
// --------------------------------------------------------------
const updateEmployee = asyncHandler(async (req, res, next) => {
	// get employee with id
	const employee = await Employee.findById(req.params.id)

	// checks if employee exists
	if (!employee) {
		res.status(400)
		throw new Error('Employee not found!')
	}

	const dob = employee.dateOfBirth

	const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	})
	console.log(updatedEmployee.dateOfBirth)
	if (dob !== updatedEmployee.dateOfBirth) {
		await Employee.findByIdAndUpdate(
			updatedEmployee._id,
			{
				age: Math.floor(
					(Date.now() - updatedEmployee.dateOfBirth.getTime()) /
						(1000 * 3600 * 24 * 365)
				)
			},
			{
				new: true
			}
		)
	}

	const result = await Employee.findById(updatedEmployee._id)
		.populate({
			path: 'planCard',
			select: 'employer plan contract',
			populate: {
				path: 'employer plan contract',
				select: 'name cnpj ansRegister identifier'
			}
		})
		.populate('age')

	res.status(200).json({
		success: true,
		msg: `Employee ${result._id} updated`,
		data: result
	})
})

//* -------------------------------------------------------------

export { getEmployees, getEmployee, createEmployee, deleteEmployee, updateEmployee }
