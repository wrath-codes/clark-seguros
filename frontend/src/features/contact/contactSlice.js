//* -----------------------------------------------------------------------
//*                           	Contact Slice
//* -----------------------------------------------------------------------
// @imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// @service
import contactService from './contactService'

// @initialState
const initialState = {
	contact: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

//* -----------------------------------------------------------------------
