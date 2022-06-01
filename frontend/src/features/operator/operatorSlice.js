//* -----------------------------------------------------------------------
//*                           	Operator Slice
//* -----------------------------------------------------------------------
// @imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// @service
import operatorService from './operatorService'

// @initialState
const initialState = {
	operators: [],
	operator: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

//* -----------------------------------------------------------------------

// @desc get operators
// ------------------------------------------------------------------------
export const getOperators = createAsyncThunk('operators/getAll', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		// get operators
		return await operatorService.getOperators(token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

// @desc get operator
// ------------------------------------------------------------------------
export const getOperator = createAsyncThunk('operators/get', async (operatorId, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		// get operators
		return await operatorService.getOperator(operatorId, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

// @desc creates an operator from data
// ------------------------------------------------------------------------
export const createOperator = createAsyncThunk(
	'operators/create',
	async (operatorData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			// get operators
			return await operatorService.createOperator(operatorData, token)
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

// @operator slice
export const operatorSlice = createSlice({
	name: 'operator',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOperator.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createOperator.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(createOperator.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload.data
			})
			.addCase(getOperators.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getOperators.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.operators = action.payload.data
			})
			.addCase(getOperators.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getOperator.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getOperator.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.operator = action.payload.data
			})
			.addCase(getOperator.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

//* -----------------------------------------------------------------------

//@exports
export const { reset } = operatorSlice.actions
export default operatorSlice.reducer
