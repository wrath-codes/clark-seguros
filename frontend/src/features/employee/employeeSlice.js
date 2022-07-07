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

// @desc update employee
// ------------------------------------------------------------------------
export const updateEmployee = createAsyncThunk(
	'employees/update',
	async (employeeData, employeeId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token

			// update employee
			return await employeeService.updateEmployee(employeeData, employeeId, token)
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

//* -----------------------------------------------------------------------

export const employeeSlice = createSlice({
	name: 'employee',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateEmployee.pending, (state, action) => {
				state.isLoading = true
			})
			.addCase(updateEmployee.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(updateEmployee.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

//* -----------------------------------------------------------------------

export const { reset } = employeeSlice.actions
export default employeeSlice.reducer
