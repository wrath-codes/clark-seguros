//*                  Operadora
//* ----------------------------------------
// @imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
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

	// set contact data
	const [contactData, setContactData] = useState({
		firstName: '',
		lastName: '',
		telephone: '',
		cellphone: '',
		email: ''
	})

	// set planData
	const [planData, setPlanData] = useState({
		name: '',
		ansRegister: '',
		kind: 'health',
		reach: ''
	})

	const { name, ansRegister, reach } = planData

	const { firstName, lastName, telephone, cellphone, email } = contactData
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

	const getContactData = (e) => {
		if (!operator.contact) {
			setContactData({
				firstName: '',
				lastName: '',
				telephone: '',
				cellphone: '',
				email: ''
			})
		} else {
			setContactData({
				firstName: operator.contact.name?.firstName,
				lastName: operator.contact.name?.lastName,
				telephone: operator.contact.telephone,
				cellphone: operator.contact.cellphone,
				email: operator.contact.email
			})
		}
	}

	const onChange = (e) => {
		setContactData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const onPlanChange = (e) => {
		setPlanData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const onPlanAdd = (e) => {
		e.preventDefault()
		dispatch(createPlan(planData))
		window.location.reload()
	}

	const onContactEdit = (e) => {
		e.preventDefault()
		const sendData = {
			name: { firstName: firstName, lastName: lastName },
			telephone: telephone,
			cellphone: cellphone,
			email: email
		}
		dispatch(updateContactToOperator(sendData))
		dispatch(getOperator(operatorId))
	}
	const onContactAdd = (e) => {
		e.preventDefault()
		const sendData = {
			firstName: firstName,
			lastName: lastName,
			telephone: telephone,
			cellphone: cellphone,
			email: email,
			kind: 'Operadora',
			cnpj: operator.cnpj
		}
		dispatch(addContactToOperator(sendData))
		window.location.reload()
	}

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
					<Link
						className='btn btn-warning btn-md mb-10 mr-2 transform transition duration-200 hover:scale-105'
						to={`/health/operators/${operator._id}/edit`}
					>
						<MdEdit />
					</Link>
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
						<div className='card-actions justify-evenly mb-5'>
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
						{operator.contact ? (
							<div className='mt-5 text-xl font-semibold contact mb-2'>
								Contato{' '}
								<label
									className='btn btn-warning btn-outline btn-xs transform transition duration-200 hover:scale-110'
									htmlFor='editContactModal'
									onClick={getContactData}
								>
									<MdEdit />
								</label>
								{/* Contact Info */}
								<div className=' w-full rounded-lg shadow-lg border-2 bg-base-100 mt-3 stats stats-vertical lg:stats-horizontal md:stats-vertical sm:stats-vertical '>
									<div className='stat'>
										<div className='stat-title text-md'>Nome</div>
										<div className='text-lg stat-value'>
											{operator.contact?.name?.firstName}{' '}
											{operator.contact?.name?.lastName}
										</div>
									</div>
									{operator.telephone && (
										<div className='stat'>
											<div className='stat-title text-md'>Telephone</div>
											<div className='text-lg stat-value'>
												{operator.contact?.telephone}
											</div>
										</div>
									)}
									<div className='stat'>
										<div className='stat-title text-md'>Celular</div>
										<div className='text-lg stat-value'>
											{operator.contact?.cellphone}
										</div>
									</div>
									<div className='stat'>
										<div className='stat-title text-md'>email</div>
										<div className='text-lg stat-value'>
											{operator.contact?.email}
										</div>
									</div>
								</div>
							</div>
						) : (
							<>
								<label
									className='btn btn-secondary text-base-100 btn-lg justify-around btn-block mb-2'
									htmlFor='addContactModal'
									onClick={getContactData}
								>
									Adicionar Contato
								</label>
								<input
									type='checkbox'
									id='addContactModal'
									className='modal-toggle'
								/>
								<label
									htmlFor='addContactModal'
									className='modal cursor-pointer'
								>
									<label className='modal-box relative' htmlFor=''>
										<h3 className='text-lg font-bold'>Contato</h3>
										<div className='mt-5 items-center'>
											<form
												onSubmit={onContactAdd}
												className='flex flex-col gap-3'
											>
												<div>
													<TextInput
														id='firstName'
														type='firstName'
														placeholder='Nome do Contato'
														name='firstName'
														value={firstName}
														onChange={onChange}
														required={true}
														icon={GrTextAlignLeft}
														addon='Nome'
													/>
												</div>
												<div>
													<TextInput
														id='lastName'
														type='lastName'
														placeholder='Sobrenome do Contato'
														name='lastName'
														value={lastName}
														onChange={onChange}
														required={true}
														icon={GrTextAlignLeft}
														addon='Sobrenome'
													/>
												</div>
												<div>
													<TextInput
														id='telephone'
														type='telephone'
														placeholder='Telefone do Contato'
														name='telephone'
														value={telephone}
														onChange={onChange}
														required={false}
														icon={BsTelephoneFill}
														addon='Telefone'
													/>
												</div>
												<div>
													<TextInput
														id='cellphone'
														type='cellphone'
														placeholder='Celular do Contato'
														name='cellphone'
														value={cellphone}
														onChange={onChange}
														required={true}
														icon={BsTelephoneFill}
														addon='Celular'
													/>
												</div>
												<div>
													<TextInput
														id='email'
														type='email'
														placeholder='Email do Contato'
														name='email'
														value={email}
														onChange={onChange}
														required={true}
														icon={MdEmail}
														addon='Email'
													/>
												</div>
												<button
													type='submit'
													className='btn btn-outline btn-success btn-sm mb-5 '
												>
													Adicionar
												</button>
											</form>
										</div>
									</label>
								</label>
							</>
						)}
						{/* login */}
						{!(operator.login?.username === 'username') ? (
							<div className='mt-5 text-xl font-semibold contact mb-10'>
								Login do Site
								<div className=' w-full rounded-lg shadow-lg border-2 bg-base-100 mt-3 stats stats-vertical lg:stats-horizontal md:stats-vertical sm:stats-vertical '>
									<div className='stat'>
										<div className='stat-title text-md'>Username</div>
										<div className='text-lg stat-value'>
											{operator.login?.username}
										</div>
									</div>
									<div className='stat'>
										<div className='stat-title text-md'>Senha</div>
										<div className='text-lg stat-value'>
											{operator.login?.password}
										</div>
									</div>
								</div>
							</div>
						) : (
							<Link
								to={`/health/operators/${operator._id}/edit`}
								className='btn btn-secondary text-base-100 btn-lg justify-around btn-block'
							>
								Adicionar login
							</Link>
						)}

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
						<label
							htmlFor='addPlanModal'
							className='btn btn-outline btn-secondary btn-md mb-2 justify-around transform transition duration-200 hover:scale-105'
						>
							adicionar plano
						</label>

						<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-0.5'>
							{operator.plans?.map((plano) => (
								<PlanoItem key={plano._id} plano={plano} />
							))}
						</div>
					</div>
				</div>
				{/* add plan modal */}
				<input type='checkbox' id='addPlanModal' className='modal-toggle' />
				<label htmlFor='addPlanModal' className='modal cursor-pointer'>
					<label className='modal-box relative' htmlFor=''>
						<h3 className='text-lg font-bold'>Contato</h3>
						<div className='mt-5 items-center'>
							<form onSubmit={onPlanAdd} className='flex flex-col gap-3'>
								<div>
									<TextInput
										id='name'
										type='name'
										placeholder='Nome do Plano'
										name='name'
										value={name}
										onChange={onPlanChange}
										required={true}
										icon={GrTextAlignLeft}
										addon='Nome'
									/>
								</div>
								<div>
									<TextInput
										id='ansRegister'
										type='ansRegister'
										placeholder='Registro ANS XXXXXXXXX'
										name='ansRegister'
										value={ansRegister}
										onChange={onPlanChange}
										required={true}
										icon={GrTextAlignLeft}
										addon='ANS'
									/>
								</div>
								<div id='select'>
									<Select
										id='reach'
										name='reach'
										onChange={onPlanChange}
										addon='Abrangência'
										required={true}
									>
										<option disabled value='Grupo de Municipios'>
											Grupo de Municipios
										</option>
										<option value='Grupo de Municipios'>
											Grupo de Municipios
										</option>
										<option value='Estadual'>Estadual</option>
										<option value='Grupo de Estados'>
											Grupo de Estados
										</option>
										<option value='Nacional'>Nacional</option>
									</Select>
								</div>

								<button
									type='submit'
									className='btn btn-outline btn-success btn-sm mb-5 '
								>
									Adicionar
								</button>
							</form>
						</div>
					</label>
				</label>

				{/* modal contacts edit */}
				<input type='checkbox' id='editContactModal' className='modal-toggle' />
				<label htmlFor='editContactModal' className='modal cursor-pointer'>
					<label className='modal-box relative' htmlFor=''>
						<h3 className='text-lg font-bold'>Contato</h3>
						<div className='mt-5 items-center'>
							<form onSubmit={onContactEdit} className='flex flex-col gap-3'>
								<div>
									<TextInput
										id='firstName'
										type='firstName'
										placeholder='Nome do Contato'
										name='firstName'
										value={firstName ?? ''}
										onChange={onChange}
										required={true}
										icon={GrTextAlignLeft}
										addon='Nome'
									/>
								</div>
								<div>
									<TextInput
										id='lastName'
										type='lastName'
										placeholder='Sobrenome do Contato'
										name='lastName'
										value={lastName ?? ''}
										onChange={onChange}
										required={true}
										icon={GrTextAlignLeft}
										addon='Sobrenome'
									/>
								</div>
								<div>
									<TextInput
										id='telephone'
										type='telephone'
										placeholder='Telefone do Contato'
										name='telephone'
										value={telephone ?? ''}
										onChange={onChange}
										required={false}
										icon={BsTelephoneFill}
										addon='Telefone'
									/>
								</div>
								<div>
									<TextInput
										id='cellphone'
										type='cellphone'
										placeholder='Celular do Contato'
										name='cellphone'
										value={cellphone ?? ''}
										onChange={onChange}
										required={true}
										icon={BsTelephoneFill}
										addon='Celular'
									/>
								</div>
								<div>
									<TextInput
										id='email'
										type='email'
										placeholder='Email do Contato'
										name='email'
										value={email ?? ''}
										onChange={onChange}
										required={true}
										icon={MdEmail}
										addon='Email'
									/>
								</div>
								<button
									type='submit'
									className='btn btn-outline btn-success btn-sm mb-2 '
								>
									Editar
								</button>
							</form>
						</div>
					</label>
				</label>

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
