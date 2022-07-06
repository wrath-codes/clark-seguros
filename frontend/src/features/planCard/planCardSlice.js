//* -----------------------------------------------------------------------
//*                           	Employee Slice
//* -----------------------------------------------------------------------
// @imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// @service
import planCardService from './planCardService'

// @initialState
const initialState = {
	planCards: [],
	planCard: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

//* -----------------------------------------------------------------------

// @desc get employee
// ------------------------------------------------------------------------
export const getPlanCard = createAsyncThunk('planCards/get', async (planCardId, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token

		// get operators
		return await planCardService.getPlanCard(planCardId, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//* -----------------------------------------------------------------------
// @desc get employee
// ------------------------------------------------------------------------
export const getPlanCards = createAsyncThunk(
	'planCards/getAll',
	async (employerId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token

			// get operators
			return await planCardService.getPlanCards(employerId, token)
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

// @desc add employee
// ------------------------------------------------------------------------
export const createPlanCard = createAsyncThunk(
	'planCards/create',
	async (planCardData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			// get operators
			return await planCardService.createPlanCard(planCardData, token)
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

// @desc add employee
// ------------------------------------------------------------------------
export const updatePlanCard = createAsyncThunk(
	'planCards/update',
	async (planCardData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			// get operators
			return await planCardService.updatePlanCard(planCardData, token)
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

export const planCardSlice = createSlice({
	name: 'planCard',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPlanCard.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getPlanCard.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.planCard = action.payload.data
			})
			.addCase(getPlanCard.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getPlanCards.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getPlanCards.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.planCards = action.payload.data
			})
			.addCase(getPlanCards.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(createPlanCard.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createPlanCard.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(createPlanCard.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(updatePlanCard.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updatePlanCard.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(updatePlanCard.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

//* -----------------------------------------------------------------------

export const { reset } = planCardSlice.actions
export default planCardSlice.reducer
