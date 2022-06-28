//* -----------------------------------------------------------------------
//*                           	Employee Service
//* -----------------------------------------------------------------------
// @libraries
import axios from 'axios'

// @api
const API_URL_PLANCARDS = '/api/v1/plan-cards/'
const API_URL_EMPLOYEES = '/api/v1/employees/'

//* -----------------------------------------------------------------------

// @desc get employee
// ------------------------------------------------------------------------
const getEmployee = async (planCardId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	}

	// response
	const response = await axios.get(API_URL_PLANCARDS + planCardId, config)
	return response.data
}

//*-----------------------------------------------------------------------

const createEmployee = async (employeeData, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	console.log(employeeData)
	// response
	const response = await axios.post(API_URL_EMPLOYEES, employeeData, config)
	return response.data
}

//*-----------------------------------------------------------------------

// @export
const employeeService = {
	getEmployee,
	createEmployee
}

export default employeeService
