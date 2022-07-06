//*                  Operadora
//* ----------------------------------------
// @imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// @features
import { getOperator, reset } from '../features/operator/operatorSlice'
import { createPlan } from '../features/plan/planSlice'
// @components
import PlanoItem from '../components/planos/PlanoItem'
import Spinner from '../components/layout/Spinner'
import BackButton from '../components/layout/BackButton'
import EditButton from '../components/layout/EditButton'
import Info from '../components/layout/Info'
import OperadoraContact from '../components/operadoras/OperadoraContact'
import PlanoAddModal from '../components/planos/PlanoAddModal'
import OperadoraLogin from '../components/operadoras/OperadoraLogin'
import OperadoraDeleteModal from '../components/operadoras/OperadoraDeleteModal'

const Operadora = () => {
	// modal state
	const [modalStatus, setModalStatus] = useState(false)
	// @reducers
	const { operator, isSuccess, isError, isLoading, message } = useSelector(
		(state) => state.operator
	)
	const { plans } = useSelector((state) => state.plan)

	const dispatch = useDispatch()
	const { operatorId } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset())
			}
		}
	}, [dispatch, isSuccess])

	// get operator data
	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
		dispatch(getOperator(operatorId))
	}, [dispatch, operatorId, isError, message])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<div className='card-title text-secondary text-left justify-between'>
				<BackButton url='/health/operators' />
				<div>
					<EditButton url={`/health/operators/${operator._id}/edit`} />
					<OperadoraDeleteModal operatorId={operatorId} />
				</div>
			</div>

			<div className=' text-4xl font-bold mt-10'>{operator.name}</div>
			<div className='divider'></div>
			<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
				<div className='col-span-4 lg:col-span-8 md:col-span-12'>
					<div className='mb-6'>
						{/* info */}
						<Info infoTarget={operator} />
						{/* contact */}
						<OperadoraContact operator={operator} />

						{/* login */}
						<OperadoraLogin
							login={operator.login}
							url={`/health/operators/${operator._id}/edit`}
						/>

						{/* Website */}
						<div className='mt-4 mb-4 card-actions justify-around'>
							<a
								href={operator.website}
								target='_blank'
								rel='noreferrer'
								className='btn btn-outline btn-secondary btn-lg btn-block transform transition duration-200 hover:scale-y-110'
							>
								visitar o website
							</a>
						</div>

						{/* Planos  */}

						<h1 className='text-3xl font-semibold mb-5'>Planos</h1>

						<PlanoAddModal operatorId={operator._id} />

						<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-0.5'>
							{operator.plans?.map((plano) => (
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
