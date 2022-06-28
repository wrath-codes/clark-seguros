//* -----------------------------------------------------------------------
//*                           	Contract Service
//* -----------------------------------------------------------------------
// @libraries
import axios from 'axios'

// @api
const API_URL = '/api/v1/contracts'

//* -----------------------------------------------------------------------

const getContract = async (contractId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.get(API_URL + '/' + contractId, config)
	return response.data
}

//*-----------------------------------------------------------------------

const getContracts = async (employerId, token) => {
	// config (token will enter here)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	// response
	const response = await axios.get(API_URL + '?employer=' + employerId, config)
	return response.data
}

//*-----------------------------------------------------------------------

// @export
const contractService = {
	getContract,
	getContracts
}

export default contractService
