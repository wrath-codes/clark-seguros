//*                  Navbar
//* ----------------------------------------
// @imports
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
// @features
import { getOperators, reset } from '../features/operator/operatorSlice'
// @components
import OperadoraItem from '../components/operadoras/OperadoraItem'
import Spinner from '../components/layout/Spinner'

const Operadoras = () => {
	// states from operator reducer
	const { operators, isLoading, isError, message, isSuccess } = useSelector(
		(state) => state.operator
	)
	const dispatch = useDispatch()

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset())
			}
		}
	}, [dispatch, isSuccess])

	//onGetOperators
	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
		dispatch(getOperators())
	}, [dispatch, isError, message])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<h1 className='text-5xl text-prim mb-5'>Operadoras</h1>
			<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3'>
				{operators.map((operadora) => (
					<OperadoraItem key={operadora._id} operadora={operadora} />
				))}
			</div>
		</>
	)
}

export default Operadoras
