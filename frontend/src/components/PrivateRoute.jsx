//*           Private Route
//* ----------------------------------------
// @imports
import { Navigate, Outlet } from 'react-router-dom'
// @hooks
import { useAuthStatus } from '../hooks/useAuthStatus'
// @components
import Spinner from './layout/Spinner'

const PrivateRoute = () => {
	const { loggedIn, checkingStatus } = useAuthStatus()

	if (checkingStatus) {
		return <Spinner />
	}

	return loggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
