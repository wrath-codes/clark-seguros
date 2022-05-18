//* -----------------------------------------------------------------------
//*                           	Operator Service
//* -----------------------------------------------------------------------
// @libraries
import axios from 'axios'

// @api
const API_URL = '/api/operators/'

// @desc get operators
// --------------------------------------
const getOperators = async () => {
	// config (token will enter here)

	// response
	const response = await axios.get(API_URL)
	return response.data
}

//* --------------------------------------

// @desc get operator
// --------------------------------------
const getOperator = async (operatorId) => {
	// config (token will enter here)

	// response
	const response = await axios.get(API_URL + operatorId)
	return response.data
}

//* --------------------------------------

// @desc get operator plans
// --------------------------------------
const getOperatorPlans = async (operatorId) => {
	// config (token will enter here)

	// response
	const response = await axios.get(API_URL + operatorId + '/plans')
	return response.data
}

//* --------------------------------------

// @desc get operator contact
// --------------------------------------
const getOperatorContact = async (operatorId) => {
	// config (token will enter here)

	// response
	const response = await axios.get(API_URL + operatorId + '/contact')
	return response.data
}

//* --------------------------------------

// @export
const operatorService = {
	getOperators,
	getOperator,
	getOperatorPlans,
	getOperatorContact
}

export default operatorService
