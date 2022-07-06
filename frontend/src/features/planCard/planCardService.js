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
const getPlanCard = async (planCardId, token) => {
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
// @desc get employee
// ------------------------------------------------------------------------
const getPlanCards = async (employerId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	}
	// response
	const response = await axios.get(
		'/api/v1/employers/' + employerId + '/plan-cards/',
		config
	)
	return response.data
}

//*-----------------------------------------------------------------------

// @desc create employee
// ------------------------------------------------------------------------
const createPlanCard = async (employeeData, token) => {
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

// @desc create employee
// ------------------------------------------------------------------------
const updatePlanCard = async (planCardData, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	console.log(planCardData)
	// response
	const response = await axios.put(API_URL_EMPLOYEES, planCardData, config)
	return response.data
}

//*-----------------------------------------------------------------------

// @export
const planCardService = {
	getPlanCard,
	getPlanCards,
	createPlanCard
}

export default planCardService
