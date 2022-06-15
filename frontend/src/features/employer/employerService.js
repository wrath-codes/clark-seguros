//* -----------------------------------------------------------------------
//*                           	Employer Service
//* -----------------------------------------------------------------------
// @libraries
import axios from 'axios'

// @api
const API_URL = '/api/v1/employers/'

//* -----------------------------------------------------------------------

// @desc get employers
// ------------------------------------------------------------------------
const getEmployers = async (token) => {
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

//*-----------------------------------------------------------------------

// @desc get employer
// ------------------------------------------------------------------------
const getEmployer = async (employerId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.get(API_URL + employerId, config)
	return response.data
}

//*-----------------------------------------------------------------------

const createEmployer = async (employerData, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.post(API_URL, employerData, config)
	return response.data
}

//*-----------------------------------------------------------------------

// @desc delete employer
// ------------------------------------------------------------------------
const deleteEmployer = async (employerId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.delete(API_URL + employerId, config)
	return response.data
}

//*-----------------------------------------------------------------------

// @desc update employer
// ------------------------------------------------------------------------
const updateEmployer = async (employerId, employerData, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.put(API_URL + employerId, employerData, config)
	return response.data
}

//*-----------------------------------------------------------------------

// @desc adds contact to the employer
// ------------------------------------------------------------------------
const addContactToEmployer = async (contactData, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.post('/api/v1/contacts/', contactData, config)
	return response.data
}

//*-----------------------------------------------------------------------

// @desc adds contact to the employer
// ------------------------------------------------------------------------
const updateContactToEmployer = async (contactData, contactId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.put('/api/v1/contacts/' + contactId, contactData, config)
	return response.data
}

//*-----------------------------------------------------------------------

// @export
const employerService = {
	getEmployers,
	getEmployer,
	createEmployer,
	deleteEmployer,
	updateEmployer,
	addContactToEmployer,
	updateContactToEmployer
}

export default employerService
