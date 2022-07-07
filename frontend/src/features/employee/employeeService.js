//* -----------------------------------------------------------------------
//*                           	Employee Service
//* -----------------------------------------------------------------------
// @libraries
import axios from 'axios'

// @api
const API_URL_EMPLOYEES = '/api/v1/employees/'

//* ----------------------------------------------------------------------

// @desc update employee
// ------------------------------------------------------------------------
const updateEmployee = async (employeeData, employeeId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	}

	// response
	const response = await axios.put(API_URL_EMPLOYEES + employeeId, employeeData, config)
	return response.data
}

//* ----------------------------------------------------------------------

// @export
const employeeService = {
	updateEmployee
}

export default employeeService
