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
	plans: [],
	contact: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

//* --------------------------------------

// @desc get operators
// --------------------------------------
export const getOperators = createAsyncThunk('operators/getAll', async (_, thunkAPI) => {
	try {
		// get operators
		return await operatorService.getOperators()
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

// @desc get operator
// --------------------------------------
export const getOperator = createAsyncThunk('operators/get', async (operatorId, thunkAPI) => {
	try {
		// get operators
		return await operatorService.getOperator(operatorId)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//* --------------------------------------

// @desc get operator plans
// --------------------------------------
export const getOperatorPlans = createAsyncThunk(
	'operators/getPlans',
	async (operatorId, thunkAPI) => {
		try {
			// get operators
			return await operatorService.getOperatorPlans(operatorId)
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

//* --------------------------------------

// @desc get operator plans
// --------------------------------------
export const getOperatorContact = createAsyncThunk(
	'operators/getContact',
	async (operatorId, thunkAPI) => {
		try {
			// get operators
			return await operatorService.getOperatorContact(operatorId)
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

//* --------------------------------------

// @operator slice
export const operatorSlice = createSlice({
	name: 'operator',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOperators.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getOperators.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.operators = action.payload
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
				state.operator = action.payload
			})
			.addCase(getOperator.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getOperatorPlans.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getOperatorPlans.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.plans = action.payload
			})
			.addCase(getOperatorPlans.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getOperatorContact.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getOperatorContact.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.contact = action.payload
			})
			.addCase(getOperatorContact.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

//* --------------------------------------

//@exports
export const { reset } = operatorSlice.actions
export default operatorSlice.reducer
