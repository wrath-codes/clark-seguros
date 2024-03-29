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

// @desc updates an operator from data
// ------------------------------------------------------------------------
export const updateOperator = createAsyncThunk(
	'operators/update',
	async (operatorData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			const operatorId = thunkAPI.getState().operator.operator._id
			// get operators
			return await operatorService.updateOperator(operatorData, operatorId, token)
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

// @desc updates an operator from data
// ------------------------------------------------------------------------
export const deleteOperator = createAsyncThunk('operators/delete', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		const operatorId = thunkAPI.getState().operator.operator._id
		// get operators
		return await operatorService.deleteOperator(operatorId, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//* -----------------------------------------------------------------------

// @desc add contact to operator
// ------------------------------------------------------------------------
export const addContactToOperator = createAsyncThunk(
	'operators/addContact',
	async (contactData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			const operatorId = thunkAPI.getState().operator.operator._id
			// get operators
			return await operatorService.addContactToOperator(contactData, operatorId, token)
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

// @desc updated contact of operator
// ------------------------------------------------------------------------
export const updateContactToOperator = createAsyncThunk(
	'operators/updateContact',
	async (contactData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			const operatorId = thunkAPI.getState().operator.operator._id
			const contactId = thunkAPI.getState().operator.operator?.contact?._id

			// get operators
			return await operatorService.updateContactToOperator(
				contactData,
				operatorId,
				contactId,
				token
			)
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
			.addCase(updateOperator.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updateOperator.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(updateOperator.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(deleteOperator.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deleteOperator.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(deleteOperator.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(addContactToOperator.pending, (state) => {
				state.isLoading = true
			})
			.addCase(addContactToOperator.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(addContactToOperator.rejected, (state, action) => {
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
