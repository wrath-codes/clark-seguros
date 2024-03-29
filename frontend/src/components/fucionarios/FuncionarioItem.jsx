//*                  Item Funcionario
//* ----------------------------------------
// @imports
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'moment'
// @features
import { getEmployee } from '../../features/planCard/planCardSlice'
import { getPlansWithId } from '../../features/plan/planSlice'
// @flowbite
import { Accordion } from 'flowbite-react'

const FuncionarioItem = ({ funcionario }) => {
	const formatedDate = Moment(funcionario.employee?.dateOfBirth).format('DD/MM/YYYY')
	const inicioContrato = Moment(funcionario.contract?.startDate).format('DD/MM/YYYY')
	const fimContrato = Moment(funcionario.contract?.endDate).format('DD/MM/YYYY')

	const getColor = (kind) => {
		if (kind === 'Titular') {
			return 'success'
		} else if (kind === 'Conjuge') {
			return 'accent'
		} else if (kind === 'Filho/Filha') {
			return 'info'
		} else {
			return 'primary'
		}
	}

	const { plans } = useSelector((state) => state.plan)

	const dispatch = useDispatch()

	return (
		<>
			<Accordion.Panel>
				<Accordion.Title className='flex flex-wrap gap-2'>
					{funcionario.employee?.name?.firstName}{' '}
					{funcionario.employee?.name?.lastName}
					<span className={`mx-5 badge badge-${getColor(funcionario.kind)}`}>
						{funcionario.kind}
					</span>
				</Accordion.Title>
				<Accordion.Content>
					<Link
						to={`/health/employees/${funcionario._id}`}
						className={`btn btn-sm btn-secondary text-base-100 mb-5 `}
						onClick={() =>
							dispatch(getPlansWithId(funcionario.contract?.operator))
						}
					>
						ir para: {funcionario.employee?.name?.firstName}{' '}
						{funcionario.employee?.name?.lastName}
					</Link>
					<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-10'>
						<div className='mb-5 text-left mx-5'>
							<div className=' text-lg font-semibold text-base-content justify-between mb-5'>
								Informação Pessoal:
							</div>
							<div className='m-1'>
								<div className='card-actions justify-between mb-2'>
									<div className='text-base'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Idade
										</div>
										<div className='stat-desc'>
											{funcionario.employee?.age}
										</div>
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
										<div className='stat-desc'>
											{funcionario.employee?.sex}
										</div>
									</div>
								</div>
								<div className='card-actions justify-between mb-2'>
									<div className='text-base'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Estado Civil
										</div>
										<div className='stat-desc'>
											{funcionario.employee?.maritalStatus}
										</div>
									</div>
									<div className='text-base'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Nome da Mãe
										</div>
										<div className='stat-desc'>
											{funcionario.employee?.mothersName?.firstName}{' '}
											{funcionario.employee?.mothersName?.lastName}
										</div>
									</div>
									<div className='text-base'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											CPF
										</div>
										<div className='stat-desc'>
											{funcionario.employee?.cpf}
										</div>
									</div>
								</div>
								<div className='card-actions justify-between mb-2'>
									<div className='text-base'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Endereço
										</div>
										<div className='text-2xs text-gray-500'>
											{funcionario.employee?.address?.street},{' '}
											{funcionario.employee?.address?.streetNumber},{' '}
											{funcionario.employee?.address?.complement
												? funcionario.employee?.address?.complement +
												  ', '
												: ''}
											{funcionario.employee?.address?.neighborhood},{' '}
											{funcionario.employee?.address?.city} -{' '}
											{funcionario.employee?.address?.state},{' '}
											{funcionario.employee?.address?.cep},{' '}
											{funcionario.employee?.address?.country}
										</div>
									</div>
								</div>
								<div className='card-actions justify-between mb-2'>
									<div className='text-base'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Email
										</div>
										<div className='stat-desc'>
											{funcionario.employee?.email}
										</div>
									</div>
									<div className='text-base'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Celular
										</div>
										<div className='stat-desc'>
											{funcionario.employee?.cellphone}
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='mb-5 text-left mx-5'>
							<div className='text-lg  text-base-content font-semibold justify-around mb-5'>
								Plano:
							</div>
							<div className=' m-1'>
								<div className='card-actions justify-between mb-2'>
									<div className='text-base text-left'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Nome
										</div>
										<Link
											className='stat-desc hover:text-primary'
											to={`/health/operators/${funcionario.plan?.operator}/plans/${funcionario.plan?._id}`}
										>
											{funcionario.plan?.name}
										</Link>
									</div>
									<div className='text-base text-left'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Registro ANS
										</div>
										<div className='stat-desc'>
											{funcionario.plan?.ansRegister}
										</div>
									</div>
									<div className='text-base text-left'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Abrangência
										</div>
										<div className='stat-desc'>
											{funcionario.plan?.reach}
										</div>
									</div>
								</div>
								<div className='card-actions justify-between mb-2'>
									<div className='text-base text-left'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Valor
										</div>
										<div className='stat-desc text-left'>
											R$ {funcionario.planValue}
										</div>
									</div>
									<div className='text-base text-left'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Carteira
										</div>
										<div className='stat-desc'>
											{funcionario.identifier}
										</div>
									</div>
									<div className='text-base text-left'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Tipo
										</div>
										<div className='stat-desc'>{funcionario.kind}</div>
									</div>
									<div className='text-base text-left'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Vidas
										</div>
										<div className='stat-desc'>1</div>
									</div>
								</div>
							</div>
						</div>

						<div className='mb-5 text-left mx-5'>
							<div className=' text-lg text-base-content font-semibold justify-between mb-5'>
								Contrato
							</div>
							<div className='m-1'>
								<div className='card-actions justify-between mb-2'>
									<div className='text-base'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Nome
										</div>
										<div className='text-2xs text-gray-500'>
											{funcionario.contract?.name}
										</div>
									</div>
								</div>
								<div className='card-actions justify-between mb-2'>
									<div className='text-base'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Numero
										</div>
										<div className='stat-desc'>
											{funcionario.contract?.identifier}
										</div>
									</div>
									<div className='text-base'>
										<div className='stat-value text-sm text-base-content font-semibold'>
											Inicio
										</div>
										<div className='stat-desc'>{inicioContrato}</div>
									</div>
									{!funcionario.contract?.isValid && (
										<div className='text-base'>
											<div className='stat-value text-sm text-base-content font-semibold'>
												Fim
											</div>
											<div className='stat-desc'>{fimContrato}</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Panel>
		</>
	)
}

export default FuncionarioItem
