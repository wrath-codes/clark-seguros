// * Auth Slice
//* ------------------------------------------
// @imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// @initial state
const initialState = {
	user: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

//* @actions
// @register user
export const registerUser = createAsyncThunk('auth/register', async (user, thunkAPI) => {})

//* create slice
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {}
})

//* ------------------------------------------
// @exports
export default authSlice.reducer
