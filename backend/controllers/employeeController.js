//* Employee Controller
//* -------------------------------------------------------------
// imports
// @libraries
import asyncHandler from 'express-async-handler'
// @models
import Employee from '../models/employeeModel.js'
import Contract from '../models/contractModel.js'
import Employer from '../models/employerModel.js'
import Employment from '../models/employmentModel.js'
import PlanCard from '../models/planCardModel.js'
import Plan from '../models/planModel.js'

//* @controller
//* -------------------------------------------------------------

// @desc    Fetch All Employees
// @route   GET - /api/employees
// @access  Private
// --------------------------------------------------------------
const getEmployees = asyncHandler(async (req, res) => {
	// get all employees
	const employees = await Employee.find({}).populate('employer').populate('contract')

	// check if there are no employees in the database
	if (employees <= 0) {
		res.status(400)
		throw new Error(`There are ${employees.length} employees in the database!`)
	}

	//response
	res.json(employees)
})

//* -------------------------------------------------------------

// @desc    Fetch Single Employee
// @route   GET - /api/employees/:id
// @access  Private
// --------------------------------------------------------------
const getEmployee = asyncHandler(async (req, res) => {
	// get employee with id
	const employee = await Employee.findById(req.params.id)
		.populate('employer')
		.populate('contract')

	// check if there are no employees in the database
	if (employee) {
		res.json(employee)
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
const createEmployee = asyncHandler(async (req, res) => {
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
	if (!checkPlan || !plan || !cardIdentifier || !planValue || !kind || !lives) {
		res.status(400)
		throw new Error('Please add all the Plan required fields!')
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
		contract: contract,
		employer: employer,
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
			employee: employee,
			plan: plan,
			planValue: planValue,
			kind: kind,
			lives: lives,
			identifier: cardIdentifier
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
	}

	// prepare response
	const employeeResult = await Employee.findById(employee._id)
		.populate('employer')
		.populate('contract')

	// response
	res.status(200).json({
		employee: employeeResult
	})
})

//* -------------------------------------------------------------

// @desc    Fetch Single Employee
// @route   GET - /api/employees/:id
// @access  Private
// --------------------------------------------------------------
const deleteEmployee = asyncHandler(async (req, res) => {
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
		success: true
	})
})

//* -------------------------------------------------------------

// @desc    Fetch Single Employee
// @route   GET - /api/employees/:id
// @access  Private
// --------------------------------------------------------------
const updateEmployee = asyncHandler(async (req, res) => {
	// get employee with id
	const employee = await Employee.findById(req.params.id)

	// checks if employee exists
	if (!employee) {
		res.status(400)
		throw new Error('Employee not found!')
	}

	const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	})

	const result = await Employee.findById(updatedEmployee._id)
		.populate('employer')
		.populate('contract')

	res.status(200).json(result)
})

//* -------------------------------------------------------------

// @desc    Fetch Single Employee
// @route   GET - /api/employees/:id
// @access  Private
// --------------------------------------------------------------
const updateEmployeeEmployer = asyncHandler(async (req, res) => {
	// get employee with id
	const employee = await Employee.findById(req.params.id)

	// checks if employee exists
	if (!employee) {
		res.status(400)
		throw new Error('Employee not found!')
	}

	// checks if the employer is valid
	const employer = await Employer.findById(req.params.employerId)

	if (!employer) {
		res.status(400)
		throw new Error('Employer not found!')
	}

	// get employer and updates number of employees
	await Employer.findByIdAndUpdate(
		{ _id: employee.employer },
		{
			$inc: { numEmployees: -1 }
		}
	)
	// gets employer and removes employee from employee list
	await Employer.findByIdAndUpdate(
		{ _id: employee.employer },
		{
			$pull: {
				employees: employee._id
			}
		}
	)

	// increase number of employees on employer with id = employerId
	await Employer.findByIdAndUpdate(
		{ _id: req.params.employerId },
		{
			$inc: { numEmployees: 1 }
		},
		{ new: true }
	)
	// add employee to employees list with id = employerId
	await Employer.findByIdAndUpdate(
		{ _id: req.params.employerId },
		{
			$push: {
				employees: employee._id
			}
		},
		{ new: true }
	)

	// updates employmentHistory
	await Employee.findOneAndUpdate(
		{
			_id: employee._id,
			employmentHistory: { $elemMatch: { employer: employee.employer } }
		},
		{
			$set: {
				'employmentHistory.$.exitDate': new Date()
			}
		},
		{ new: true }
	)

	// updates employee employer
	const updatedEmployee = await Employee.findByIdAndUpdate(
		{ _id: req.params.id },
		{
			$set: { employer: req.params.employerId }
		}
	)

	// adds new employer to employment history
	await Employee.findByIdAndUpdate(
		{ _id: employee._id },
		{
			$push: {
				employmentHistory: {
					employer: updatedEmployee.employer,
					startDate: new Date()
				}
			}
		},
		{ new: true }
	)

	const result = await Employee.findById(req.params.id)
		.populate('employer')
		.populate('contract')

	res.status(200).json(result)
})

//* -------------------------------------------------------------

// @desc    Fetch Single Employee
// @route   GET - /api/employees/:id
// @access  Private
// --------------------------------------------------------------
const updateEmployeeContract = asyncHandler(async (req, res) => {
	// get employee with id
	const employee = await Employee.findById(req.params.id)

	// checks if employee exists
	if (!employee) {
		res.status(400)
		throw new Error('Employee not found!')
	}

	//check if the contract is valid
	const contract = await Contract.findById(req.params.contractId)
	if (!contract) {
		res.status(400)
		throw new Error('Contract not found!')
	}

	// increase number of employees on contract
	await Contract.findByIdAndUpdate(
		{ _id: employee.contract },
		{
			$inc: { numEmployees: -1 }
		},
		{ new: true }
	)
	// remove employee from employee list
	await Contract.findByIdAndUpdate(
		{ _id: employee.contract },
		{
			$pull: {
				employees: employee._id
			}
		},
		{ new: true }
	)

	// increase number of employees on contract with id = contractId
	await Contract.findByIdAndUpdate(
		{ _id: req.params.contractId },
		{
			$inc: { numEmployees: 1 }
		},
		{ new: true }
	)
	// add employee to employee list on contract with id = contractId
	await Contract.findByIdAndUpdate(
		{ _id: req.params.contractId },
		{
			$push: {
				employees: employee._id
			}
		},
		{ new: true }
	)

	// updates employee contract
	const updatedEmployee = await Employee.findByIdAndUpdate(
		{ _id: req.params.id },
		{
			$set: { contract: req.params.contractId }
		}
	)

	const result = await Employee.findById(updatedEmployee._id)
		.populate('employer')
		.populate('contract')

	res.status(200).json(result)
})

//* -------------------------------------------------------------

export {
	getEmployees,
	getEmployee,
	createEmployee,
	deleteEmployee,
	updateEmployee,
	updateEmployeeEmployer,
	updateEmployeeContract
}
