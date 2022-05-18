//* Employee Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
const router = express.Router()
// @controller
import {
	getEmployees,
	getEmployee,
	createEmployee,
	deleteEmployee,
	updateEmployee,
	updateEmployeeContract,
	updateEmployeeEmployer
} from '../controllers/employeeController.js'

//* @routes
//* -------------------------------------------------------------

// @desc    Fetch All Employees
// @route   GET - /api/employees
// @access  Private
// --------------------------------------------------------------
router.route('/').get(getEmployees).post(createEmployee)

//* -------------------------------------------------------------

// @desc    Fetch Single Employee | delete Single Employee
// @route   GET - /api/employees/:id
// @access  Private
// --------------------------------------------------------------
router.route('/:id').get(getEmployee).delete(deleteEmployee).put(updateEmployee)

//* ------------------------------------------------------------

// @desc   Updates Employer
// @route   PUT - /api/employees/:id/:employerId
// @access  Private
// --------------------------------------------------------------
router.route('/:id/change/employer/:employerId').put(updateEmployeeEmployer)

//* ------------------------------------------------------------

// @desc   Updates Contract
// @route   PUT - /api/employees/:id/:contractId
// @access  Private
// --------------------------------------------------------------
router.route('/:id/change/contract/:contractId').put(updateEmployeeContract)

//* ------------------------------------------------------------

export default router
