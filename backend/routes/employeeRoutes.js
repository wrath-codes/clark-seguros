//* Employee Routes
//* -------------------------------
// imports
// @libraries
import express from 'express'
const router = express.Router({ mergeParams: true })
// @controller
import {
	getEmployees,
	getEmployee,
	createEmployee,
	deleteEmployee,
	updateEmployee
} from '../controllers/employeeController.js'
// @middleware
import { protect, authorize } from '../middleware/authProtectMiddleware.js'
// uses
router.use(protect)
router.use(authorize('admin', 'staff'))

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

export default router
