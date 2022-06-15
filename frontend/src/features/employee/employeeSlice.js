//* -----------------------------------------------------------------------
//*                           	Employee Slice
//* -----------------------------------------------------------------------
// @imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// @service
import employeeService from './employeeService'

// @initialState
const initialState = {
	employees: [],
	employee: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

//* -----------------------------------------------------------------------

// @desc get employee
// ------------------------------------------------------------------------
export const getEmployee = createAsyncThunk('employees/get', async (planCardId, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token

		// get operators
		return await employeeService.getEmployee(planCardId, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//* -----------------------------------------------------------------------

export const employeeSlice = createSlice({
	name: 'employee',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getEmployee.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getEmployee.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.employee = action.payload.data
			})
			.addCase(getEmployee.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

//* -----------------------------------------------------------------------

export const { reset } = employeeSlice.actions
export default employeeSlice.reducer
