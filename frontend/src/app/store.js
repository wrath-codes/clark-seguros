//*  				STORE
//* ------------------------------------------
// @imports
import { configureStore } from '@reduxjs/toolkit'
// @reducers
import operatorReducer from '../features/operator/operatorSlice'
import planReducer from '../features/plan/planSlice'
import employeeReducer from '../features/employee/employeeSlice'
import employerReducer from '../features/employer/employerSlice'
import planCardReducer from '../features/planCard/planCardSlice'
import contractReducer from '../features/contract/contractSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		operator: operatorReducer,
		employer: employerReducer,
		planCard: planCardReducer,
		plan: planReducer,
		employee: employeeReducer,
		contract: contractReducer
	}
})
