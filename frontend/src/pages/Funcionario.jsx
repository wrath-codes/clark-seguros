//*                  Cliente
//* ----------------------------------------
// @imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Moment from 'moment'
// @features
import {
	deleteEmployer,
	getEmployer,
	getEmployers,
	addContactToEmployer,
	reset,
	updateContactToEmployer
} from '../features/employer/employerSlice'
import { getPlansWithId } from '../features/plan/planSlice'
import { getContract, getContracts } from '../features/contract/contractSlice'
import { getPlanCard, getPlanCards } from '../features/planCard/planCardSlice'
// @components
import Spinner from '../components/layout/Spinner'
import BackButton from '../components/layout/BackButton'
import EditButton from '../components/layout/EditButton'
import FuncionarioItem from '../components/fucionarios/FuncionarioItem'
import FuncionarioAddModal from '../components/fucionarios/FuncionarioAddModal'
import ClienteDeleteModal from '../components/clientes/ClienteDeleteModal'
import ClienteContact from '../components/clientes/ClienteContact'
import PlanoInfo from '../components/planos/PlanoInfo'
import FuncionarioInfoEditModal from '../components/fucionarios/FuncionarioInfoEditModal'

const Funcionario = () => {
	const { planCardId } = useParams()

	const { planCard, isSuccess, isError, isLoading, message } = useSelector(
		(state) => state.planCard
	)
	const { plans } = useSelector((state) => state.plan)

	const dispatch = useDispatch()
	const navigate = useNavigate()

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
		dispatch(getPlanCard(planCardId))
		console.log(planCard)
	}, [dispatch, isError, message, planCardId])

	const formatedDate = Moment(planCard.employee?.dateOfBirth).format('DD/MM/YYYY')
	const inicioContrato = Moment(planCard.contract?.startDate).format('DD/MM/YYYY')
	const fimContrato = Moment(planCard.contract?.endDate).format('DD/MM/YYYY')

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<div className='card-title text-secondary text-left justify-between'>
				<BackButton url={`/health/employers/${planCard.employer?._id}`} />
				<div>
					<FuncionarioInfoEditModal />
				</div>
			</div>

			<div className=' text-4xl font-bold mt-10'>
				{planCard.employee?.name?.firstName} {planCard.employee?.name?.lastName}
			</div>
			<div className='divider'></div>
			<div className='card-actions justify-between mb-2'>
				<div className='mb-5 text-left mx-5'>
					<div className='text-base'>
						<div className='stat-value text-sm text-base-content font-semibold'>
							Idade
						</div>
						<div className='stat-desc'>{planCard.employee?.age}</div>
					</div>
					<div className='text-base'>
						<div className='stat-value text-sm text-base-content font-semibold'>
							DDN
						</div>
						<div className='stat-desc'>{formatedDate}</div>
					</div>
					<div className='text-base'>
						<div className='stat-value text-sm text-base-content font-semibold'>
							Sexo
						</div>
						<div className='stat-desc'>{planCard.employee?.sex}</div>
					</div>
				</div>
				<div className='mb-5 text-left mx-5'>
					<div className='text-base'>
						<div className='stat-value text-sm text-base-content font-semibold'>
							Estado Civil
						</div>
						<div className='stat-desc'>{planCard.employee?.maritalStatus}</div>
					</div>
					<div className='text-base'>
						<div className='stat-value text-sm text-base-content font-semibold'>
							Nome da Mãe
						</div>
						<div className='stat-desc'>
							{planCard.employee?.mothersName?.firstName}{' '}
							{planCard.employee?.mothersName?.lastName}
						</div>
					</div>
					<div className='text-base'>
						<div className='stat-value text-sm text-base-content font-semibold'>
							CPF
						</div>
						<div className='stat-desc'>{planCard.employee?.cpf}</div>
					</div>
				</div>
				<div className='mb-5 text-left mx-5'>
					<div className='card-actions justify-between mb-2'>
						<div className='text-base'>
							<div className='stat-value text-sm text-base-content font-semibold'>
								Endereço
							</div>
							<div className='text-2xs text-gray-500'>
								{planCard.employee?.address?.street},{' '}
								{planCard.employee?.address?.streetNumber},{' '}
								{planCard.employee?.address?.complement
									? planCard.employee?.address?.complement + ', '
									: ''}
								{planCard.employee?.address?.neighborhood},{' '}
								{planCard.employee?.address?.city} -{' '}
								{planCard.employee?.address?.state},{' '}
								{planCard.employee?.address?.cep},{' '}
								{planCard.employee?.address?.country}
							</div>
						</div>
					</div>
					<div className='card-actions justify-between mb-2'>
						<div className='text-base'>
							<div className='stat-value text-sm text-base-content font-semibold'>
								Email
							</div>
							<div className='stat-desc'>{planCard.employee?.email}</div>
						</div>
						<div className='text-base'>
							<div className='stat-value text-sm text-base-content font-semibold'>
								Celular
							</div>
							<div className='stat-desc'>{planCard.employee?.cellphone}</div>
						</div>
					</div>
				</div>
			</div>

			{/* info */}
			<div className=' text-3xl font-bold my-5'>Cliente</div>
			<div className='card-actions justify-evenly mb-5 align'>
				<h1 className='text-base card-title inline m-1'>
					<strong>Employer:</strong> {planCard.employer?.name}
				</h1>
				<div className='ml-2 mr-1 badge badge-success mt-2'>
					<strong>CNPJ: &nbsp;</strong>
					{planCard.employer?.cnpj}
				</div>
				<div className='ml-2 mr-1 px-3 card bg-info rounded-2xl text-sm mt-2 inline'>
					<strong>Endereço: &nbsp;</strong>
					{planCard.employer?.address?.street},{' '}
					{planCard.employer?.address?.streetNumber},{' '}
					{planCard.employer?.address?.complement
						? planCard.employer?.address?.complement + ', '
						: ''}
					{planCard.employer?.address?.neighborhood},{' '}
					{planCard.employer?.address?.city} - {planCard.employer?.address?.state},{' '}
					{planCard.employer?.address?.cep}, {planCard.employer?.address?.country}
				</div>
			</div>
			{/* Plano */}
			<div className=' text-3xl font-bold my-5'>Plano</div>
			<div className=' w-full rounded-lg shadow-lg border-2 bg-base-100 mt-3 stats stats-vertical lg:stats-horizontal md:stats-vertical sm:stats-vertical '>
				<div className='stat'>
					<div className='stat-title text-md'>Nome</div>
					<div className='text-lg stat-value'>{planCard.plan?.name}</div>
				</div>

				<div className='stat'>
					<div className='stat-title text-md'>Registro ANS</div>
					<div className='text-lg stat-value'>{planCard.plan?.ansRegister}</div>
				</div>

				<div className='stat'>
					<div className='stat-title text-md'>Abrangência</div>
					<div className='text-lg stat-value'>{planCard.plan?.reach}</div>
				</div>
			</div>
			<div className=' w-full rounded-lg shadow-lg border-2 bg-base-100  stats stats-vertical lg:stats-horizontal md:stats-vertical sm:stats-vertical '>
				<div className='stat'>
					<div className='stat-title text-md'>Valor</div>
					<div className='text-lg stat-value'>{planCard.planValue}</div>
				</div>

				<div className='stat'>
					<div className='stat-title text-md'>Carteira</div>
					<div className='text-lg stat-value'>{planCard.identifier}</div>
				</div>

				<div className='stat'>
					<div className='stat-title text-md'>Tipo</div>
					<div className='text-lg stat-value'>{planCard.kind}</div>
				</div>
			</div>
			{/* Contrato */}
			<div className=' text-3xl font-bold my-5'>Contrato</div>
			<div className=' w-full rounded-lg shadow-lg border-2 bg-base-100 mt-3 stats stats-vertical lg:stats-horizontal md:stats-vertical sm:stats-vertical '>
				<div className='stat'>
					<div className='stat-title text-md'>Nome</div>
					<div className='text-lg stat-value'>{planCard.contract?.name}</div>
				</div>

				<div className='stat'>
					<div className='stat-title text-md'>Numero</div>
					<div className='text-lg stat-value'>{planCard.contract?.identifier}</div>
				</div>

				<div className='stat'>
					<div className='stat-title text-md'>Inicio</div>
					<div className='text-lg stat-value'>{inicioContrato}</div>
				</div>
				{!planCard.contract?.isValid && (
					<div className='stat'>
						<div className='stat-title text-md'>Fim</div>
						<div className='text-lg stat-value'>{fimContrato}</div>
					</div>
				)}
			</div>
		</>
	)
}

export default Funcionario
