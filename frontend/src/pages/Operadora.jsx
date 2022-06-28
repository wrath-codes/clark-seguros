//*                  Operadora
//* ----------------------------------------
// @imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// @features
import {
	getOperator,
	getOperators,
	deleteOperator,
	addContactToOperator,
	updateContactToOperator,
	reset
} from '../features/operator/operatorSlice'
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
// @flowbite
import { TextInput, Select } from 'flowbite-react'
// @icons
import { MdEdit, MdEmail } from 'react-icons/md'
import { HiTrash } from 'react-icons/hi'
import { GrTextAlignLeft } from 'react-icons/gr'
import { BsTelephoneFill } from 'react-icons/bs'

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

	const onDelete = (e) => {
		dispatch(deleteOperator(operatorId))
		navigate('/health/operators')
		dispatch(getOperators())
		dispatch(reset())
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<div className='card-title text-secondary text-left justify-between'>
				<BackButton url='/health/operators' />
				<div>
					<EditButton url={`/health/operators/${operator._id}/edit`} />
					<label
						className='btn btn-error btn-md mb-10 transform transition duration-200 hover:scale-105'
						htmlFor='deleteModal'
					>
						<HiTrash />
					</label>
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

				{/* modal delete */}

				<input type='checkbox' id='deleteModal' className='modal-toggle' />
				<label htmlFor='deleteModal' className='modal cursor-pointer'>
					<label className='modal-box relative' htmlFor=''>
						<h3 className='text-lg font-bold'>
							Tem certeza que quer deletar esta Operadora?
						</h3>
						<div className='mt-5 items-center'>
							<label
								htmlFor='deleteModal'
								className='btn btn-outline btn-success btn-md mb-5 mr-2 '
							>
								no
							</label>
							<button
								onClick={onDelete}
								className='btn btn-outline btn-error btn-md mb-5 '
							>
								yes
							</button>
						</div>
					</label>
				</label>
			</div>
		</>
	)
}

export default Operadora
