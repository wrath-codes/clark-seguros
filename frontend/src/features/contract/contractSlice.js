//* -----------------------------------------------------------------------
//*                           	Contract Slice
//* -----------------------------------------------------------------------
// @imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// @service
import contractService from './contractService'

// @initialState
const initialState = {
	contracts: [],
	contract: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

//* -----------------------------------------------------------------------

// @desc get contracts
// ------------------------------------------------------------------------
export const getContract = createAsyncThunk('contracts/get', async (contractId, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		// get operators
		return await contractService.getContract(contractId, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//* -----------------------------------------------------------------------

// @contract slice
export const contractSlice = createSlice({
	name: 'contract',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getContract.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getContract.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.contract = action.payload.data
			})
			.addCase(getContract.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

//* -----------------------------------------------------------------------
// @exports
export const { reset } = contractSlice.actions
export default contractSlice.reducer
