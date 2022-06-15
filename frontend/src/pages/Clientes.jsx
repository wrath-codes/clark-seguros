//*                 Clientes
//* ----------------------------------------
// @imports
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
// @features
import { getEmployers, reset } from '../features/employer/employerSlice'
// @components
import Spinner from '../components/layout/Spinner'
import ClienteItem from '../components/clientes/ClienteItem'

const Clientes = () => {
	// reducers
	const { employers, isLoading, isSuccess } = useSelector((state) => state.employer)

	const dispatch = useDispatch()

	//onGetOperators
	useEffect(() => {
		dispatch(getEmployers())
	}, [dispatch])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<div className='mb-10 '>
				<Link
					to='/health/employers/add-employer'
					className='btn btn-secondary btn-md text-base-100'
					onClick={() => dispatch(reset())}
				>
					Adicionar Cliente
				</Link>
			</div>
			<h1 className='text-5xl text-prim mb-5'>Clientes</h1>
			<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3'>
				{employers.map((cliente) => (
					<ClienteItem key={cliente._id} employer={cliente} />
				))}
			</div>
		</>
	)
}

export default Clientes
