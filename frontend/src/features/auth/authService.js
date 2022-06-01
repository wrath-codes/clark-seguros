// * Auth Service
//* ------------------------------------------
import axios from 'axios'

const API_URL = '/api/v1/auth/'

// login a user
const loginUser = async (userData) => {
	const response = await axios.post(API_URL + 'login', userData)

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}
	return response.data
}

// logout a user
const logoutUser = () => {
	localStorage.removeItem('user')
}

//* exports
const authService = {
	loginUser,
	logoutUser
}

export default authService
