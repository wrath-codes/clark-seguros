//*                  Operadora
//* ----------------------------------------
// @imports
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
// @features
import {
	getOperator,
	getOperatorPlans,
	getOperatorContact,
	reset
} from '../features/operator/operatorSlice'
// @components
import PlanoItem from '../components/planos/PlanoItem'
import Spinner from '../components/layout/Spinner'

const Operadora = () => {
	// @reducers
	const { operator, contact, plans, isSuccess, isError, isLoading, message } = useSelector(
		(state) => state.operator
	)
	const dispatch = useDispatch()
	const { operatorId } = useParams()

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset())
			}
		}
	}, [dispatch, isSuccess])

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
		dispatch(getOperator(operatorId))
		dispatch(getOperatorPlans(operatorId))
		dispatch(getOperatorContact(operatorId))
	}, [dispatch, operatorId, isError, message])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<Link to='/health/operators' className='btn btn-outline btn-secondary'>
				voltar
			</Link>
			<div className=' text-4xl mt-10'>{operator.name}</div>
			<div className='divider'></div>
			<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
				<div className='col-span-4 lg:col-span-8 md:col-span-12'>
					<div className='mb-6'>
						{/* info */}
						<div className='card-actions justify-evenly'>
							<h1 className='text-2xl card-title inline'>{operator.name}</h1>
							<div className='ml-2 mr-1 badge badge-success mt-2'>
								<strong>CNPJ: &nbsp;</strong>
								{operator.cnpj}
							</div>
							<div className='ml-2 mr-1 px-3 card bg-info rounded-2xl text-sm mt-2 inline'>
								<strong>Endereço: &nbsp;</strong>
								{operator.address?.street}, {operator.address?.streetNumber},{' '}
								{operator.address?.complement
									? operator.address?.complement + ', '
									: ''}
								{operator.address?.neighborhood}, {operator.address?.city} -{' '}
								{operator.address?.state}, {operator.address?.cep},{' '}
								{operator.address?.country}
							</div>
						</div>

						{/* contato */}
						<div className='mt-5 text-xl font-semibold contact'>
							Contato
							<div className=' w-full rounded-lg shadow-lg border-2 bg-base-100 mt-3 stats stats-vertical lg:stats-horizontal md:stats-vertical sm:stats-vertical '>
								<div className='stat'>
									<div className='stat-title text-md'>Nome</div>
									<div className='text-lg stat-value'>
										{contact.name?.firstName} {contact.name?.lastName}
									</div>
								</div>
								<div className='stat'>
									<div className='stat-title text-md'>Telephone</div>
									<div className='text-lg stat-value'>
										{contact.cellphone}
									</div>
								</div>
								<div className='stat'>
									<div className='stat-title text-md'>email</div>
									<div className='text-lg stat-value'>{contact.email}</div>
								</div>
							</div>
						</div>
						{/* Website */}
						<div className='mt-4 mb-4 card-actions justify-around'>
							<a
								href={operator.website}
								target='_blank'
								rel='noreferrer'
								className='btn btn-outline btn-secondary btn-lg btn-block'
							>
								visitar o website
							</a>
						</div>
						{/* Planos  */}
						<h1 className='text-xl  font-semibold mb-5'>Planos</h1>
						<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3'>
							{plans.map((plano) => (
								<PlanoItem key={plano._id} plano={plano} />
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Operadora
