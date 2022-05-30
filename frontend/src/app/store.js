//*  				STORE
//* ------------------------------------------
// @imports
import { configureStore } from '@reduxjs/toolkit'
// @reducers
import operatorReducer from '../features/operator/operatorSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		operator: operatorReducer
	}
})
