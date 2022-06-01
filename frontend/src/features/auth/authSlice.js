// * Auth Slice
//* ------------------------------------------
// @imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// @features
import authService from './authService'

//@get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

// @initial state
const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

//* @actions
// @login user
export const loginUser = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.loginUser(user)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

// @logout user
export const logoutUser = createAsyncThunk('auth/logout', async (user, thunkAPI) => {
	try {
		return await authService.logoutUser(user)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//* create slice
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false
			state.isSuccess = false
			state.isLoading = false
			state.message = ''
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null
			})
	}
})

//* ------------------------------------------
// @exports
export const { reset } = authSlice.actions
export default authSlice.reducer
