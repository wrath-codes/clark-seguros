//* -----------------------------------------------------------------------
//*                           	PlanService
//* -----------------------------------------------------------------------
// @libraries
import axios from 'axios'

// @api
const API_URL = '/api/v1/plans/'

//*-----------------------------------------------------------------------

// @desc get plans
// ------------------------------------------------------------------------
const getPlans = async (operatorId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.get('/api/v1/operators/' + operatorId + '/plans', config)
	return response.data
}

//*-----------------------------------------------------------------------

// @desc get plans with operator id
// ------------------------------------------------------------------------
const getPlansWithId = async (operatorId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.get('/api/v1/operators/' + operatorId + '/plans', config)
	return response.data
}

//*-----------------------------------------------------------------------

// @desc get plan
// ------------------------------------------------------------------------
const createPlan = async (planData, operatorId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.post(
		'/api/v1/operators/' + operatorId + '/plans/',
		planData,
		config
	)
	return response.data
}

//*-----------------------------------------------------------------------

// @desc get plan
// ------------------------------------------------------------------------
const getPlan = async (planId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.get(API_URL + planId, config)
	return response.data
}

//*-----------------------------------------------------------------------

// @desc delete plan
// ------------------------------------------------------------------------
const deletePlan = async (planId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.delete(API_URL + planId, config)
	return response.data
}

//*-----------------------------------------------------------------------

// @desc update plan
// ------------------------------------------------------------------------
const updatePlan = async (planData, planId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.put(API_URL + planId, planData, config)
	return response.data
}

//*-----------------------------------------------------------------------

// @export
const planService = { getPlan, getPlans, createPlan, deletePlan, updatePlan, getPlansWithId }

export default planService
