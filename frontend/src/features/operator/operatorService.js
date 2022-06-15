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

// @desc creates an operator
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

// @desc updates an operator
// ------------------------------------------------------------------------
const updateOperator = async (operatorData, operatorId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.put(API_URL + operatorId, operatorData, config)
	return response.data
}

//* -----------------------------------------------------------------------

// @desc deletes an operator
// ------------------------------------------------------------------------
const deleteOperator = async (operatorId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.delete(API_URL + operatorId, config)
	return response.data
}

//* -----------------------------------------------------------------------

// @desc adds contact to the operator
// ------------------------------------------------------------------------
const addContactToOperator = async (contactData, operatorId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.post(API_URL + operatorId + '/contacts', contactData, config)
	return response.data
}

//* -----------------------------------------------------------------------

// @desc adds contact to the operator
// ------------------------------------------------------------------------
const updateContactToOperator = async (contactData, operatorId, contactId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.put(
		API_URL + operatorId + '/contacts/' + contactId,
		contactData,
		config
	)
	return response.data
}

//* -----------------------------------------------------------------------

// @export
const operatorService = {
	getOperators,
	getOperator,
	createOperator,
	updateOperator,
	deleteOperator,
	addContactToOperator,
	updateContactToOperator
}

export default operatorService
