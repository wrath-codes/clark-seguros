//* -----------------------------------------------------------------------
//*                           	Operator Service
//* -----------------------------------------------------------------------
// @libraries
import axios from 'axios'

// @api
const API_URL = '/api/v1/operators/'

// @desc get operators
// ------------------------------------------------------------------------
const getOperators = async (token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	// response
	const response = await axios.get(API_URL, config)
	return response.data
}

//* -----------------------------------------------------------------------

// @desc get operator
// ------------------------------------------------------------------------
const getOperator = async (operatorId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.get(API_URL + operatorId, config)
	return response.data
}

//*-----------------------------------------------------------------------

// @desc get operator
// ------------------------------------------------------------------------
const createOperator = async (operatorData, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.post(API_URL, operatorData, config)
	return response.data
}

//* -----------------------------------------------------------------------

// @export
const operatorService = {
	getOperators,
	getOperator,
	createOperator
}

export default operatorService
