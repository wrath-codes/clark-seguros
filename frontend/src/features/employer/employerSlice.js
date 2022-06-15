//* -----------------------------------------------------------------------
//*                           	Employer Slice
//* -----------------------------------------------------------------------
// @imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// @service
import employerService from './employerService'

// @initialState
const initialState = {
	employers: [],
	employer: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

//* -----------------------------------------------------------------------

// @desc get employers
// ------------------------------------------------------------------------
export const getEmployers = createAsyncThunk('employers/getAll', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		// get operators
		return await employerService.getEmployers(token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//* -----------------------------------------------------------------------

// @desc get employer
// ------------------------------------------------------------------------
export const getEmployer = createAsyncThunk('employers/get', async (employerId, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		// get operators
		return await employerService.getEmployer(employerId, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//* -----------------------------------------------------------------------

// @desc add employer
// ------------------------------------------------------------------------
export const createEmployer = createAsyncThunk(
	'employers/create',
	async (employerData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			// get operators
			return await employerService.createEmployer(employerData, token)
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

// @desc add employer
// ------------------------------------------------------------------------
export const deleteEmployer = createAsyncThunk('employers/delete', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token
		const employerId = thunkAPI.getState().employer.employer._id
		// get operators
		return await employerService.deleteEmployer(employerId, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//* -----------------------------------------------------------------------

// @desc update employer
// ------------------------------------------------------------------------
export const updateEmployer = createAsyncThunk(
	'employers/update',
	async (employerData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			const employerId = thunkAPI.getState().employer.employer._id
			// get operators
			return await employerService.updateEmployer(employerId, employerData, token)
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

// @desc add contact to employer
// ------------------------------------------------------------------------
export const addContactToEmployer = createAsyncThunk(
	'employers/addContact',
	async (contactData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			// get operators
			return await employerService.addContactToEmployer(contactData, token)
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

// @desc update contact of employer
// ------------------------------------------------------------------------
export const updateContactToEmployer = createAsyncThunk(
	'employers/updateContact',
	async (contactData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			const contactId = thunkAPI.getState().employer.employer?.contact?._id
			// get operators
			return await employerService.updateContactToEmployer(contactData, contactId, token)
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

// @employer slice
export const employerSlice = createSlice({
	name: 'employer',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getEmployers.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getEmployers.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.employers = action.payload.data
			})
			.addCase(getEmployers.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getEmployer.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getEmployer.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.employer = action.payload.data
			})
			.addCase(getEmployer.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(createEmployer.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createEmployer.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(createEmployer.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(deleteEmployer.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deleteEmployer.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(deleteEmployer.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(updateEmployer.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updateEmployer.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(updateEmployer.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(addContactToEmployer.pending, (state) => {
				state.isLoading = true
			})
			.addCase(addContactToEmployer.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(addContactToEmployer.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(updateContactToEmployer.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updateContactToEmployer.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(updateContactToEmployer.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

//* -----------------------------------------------------------------------
export const { reset } = employerSlice.actions
export default employerSlice.reducer
