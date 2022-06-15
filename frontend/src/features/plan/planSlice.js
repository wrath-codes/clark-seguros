//* -----------------------------------------------------------------------
//*                             Plan Slice
//* -----------------------------------------------------------------------
// @imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// @service
import planService from './planService'

// @initialState
const initialState = {
	plans: [],
	plan: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

//* -----------------------------------------------------------------------

// @desc get operator
// ------------------------------------------------------------------------
export const createPlan = createAsyncThunk('plans/create', async (planData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		const operatorId = thunkAPI.getState().operator.operator._id
		// get plan
		return await planService.createPlan(planData, operatorId, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//* -----------------------------------------------------------------------

// @desc get operator
// ------------------------------------------------------------------------
export const getPlans = createAsyncThunk('plans/getAll', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		const operatorId = thunkAPI.getState().operator.operator._id
		// get plan
		return await planService.getPlans(operatorId, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//* -----------------------------------------------------------------------

// @desc get operator
// ------------------------------------------------------------------------
export const getPlan = createAsyncThunk('plans/get', async (planId, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		// get plan
		return await planService.getPlan(planId, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//* -----------------------------------------------------------------------

// @desc delete operator
// ------------------------------------------------------------------------
export const deletePlan = createAsyncThunk('plans/delete', async (planId, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		// delete plan
		return await planService.deletePlan(planId, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//* -----------------------------------------------------------------------

// @desc delete operator
// ------------------------------------------------------------------------
export const updatePlan = createAsyncThunk('plans/update', async (planData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		const planId = thunkAPI.getState().plan.plan._id
		// update plan
		return await planService.updatePlan(planData, planId, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//* -----------------------------------------------------------------------

// @plan slice
export const planSlice = createSlice({
	name: 'plan',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPlan.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getPlan.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.plan = action.payload.data
			})
			.addCase(getPlan.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getPlans.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getPlans.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.plans = action.payload.data
			})
			.addCase(getPlans.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(createPlan.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createPlan.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(createPlan.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(deletePlan.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deletePlan.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(deletePlan.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(updatePlan.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updatePlan.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(updatePlan.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

//* -----------------------------------------------------------------------

//@exports
export const { reset } = planSlice.actions
export default planSlice.reducer
