//*                  Cliente
//* ----------------------------------------
// @imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// @features
import {
	deleteEmployer,
	getEmployer,
	getEmployers,
	addContactToEmployer,
	reset,
	updateContactToEmployer
} from '../features/employer/employerSlice'
// @components
import PlanoItem from '../components/planos/PlanoItem'
import Spinner from '../components/layout/Spinner'
import BackButton from '../components/layout/BackButton'
// @flowbite
import { TextInput, Select } from 'flowbite-react'
// @icons
import { MdEdit, MdEmail, MdOutlineExpandMore } from 'react-icons/md'
import { HiTrash } from 'react-icons/hi'
import { GrTextAlignLeft } from 'react-icons/gr'
import { BsTelephoneFill } from 'react-icons/bs'
import FuncionarioItem from '../components/layout/fucionarios/FuncionarioItem'

const Cliente = () => {
	// @reducers
	const { employer, isSuccess, isError, isLoading, message } = useSelector(
		(state) => state.employer
	)

	// set contact data
	const [contactData, setContactData] = useState({
		firstName: '',
		lastName: '',
		telephone: '',
		cellphone: '',
		email: ''
	})
	const { firstName, lastName, telephone, cellphone, email } = contactData

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { employerId } = useParams()

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
		dispatch(getEmployer(employerId))
	}, [dispatch, employerId, isError, message])

	const getContactData = (e) => {
		if (!employer.contact) {
			setContactData({
				firstName: '',
				lastName: '',
				telephone: '',
				cellphone: '',
				email: ''
			})
		} else {
			setContactData({
				firstName: employer.contact.name?.firstName,
				lastName: employer.contact.name?.lastName,
				telephone: employer.contact.telephone,
				cellphone: employer.contact.cellphone,
				email: employer.contact.email
			})
		}
	}

	const onContactAdd = (e) => {
		e.preventDefault()
		const sendData = {
			firstName: firstName,
			lastName: lastName,
			telephone: telephone,
			cellphone: cellphone,
			email: email,
			kind: 'Cliente',
			cnpj: employer.cnpj
		}
		dispatch(addContactToEmployer(sendData))
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
		dispatch(updateContactToEmployer(sendData))
		dispatch(getEmployer(employerId))
	}

	const onChange = (e) => {
		setContactData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const onDelete = (e) => {
		dispatch(deleteEmployer())
		navigate('/health/employers')
		dispatch(getEmployers())
		dispatch(reset())
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<div className='card-title text-secondary text-left justify-between'>
				<BackButton url='/health/employers' />
				<div>
					<Link
						className='btn btn-warning btn-md mb-10 mr-2 transform transition duration-200 hover:scale-105'
						to={`/health/employers/${employer._id}/edit`}
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

			<div className=' text-4xl font-bold mt-10'>{employer.name}</div>
			<div className='divider'></div>
			<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
				<div className='col-span-4 lg:col-span-8 md:col-span-12'>
					<div className='mb-6'>
						{/* info */}
						<div className='card-actions justify-evenly mb-5'>
							<h1 className='text-2xl card-title inline'>{employer.name}</h1>
							<div className='ml-2 mr-1 badge badge-success mt-2'>
								<strong>CNPJ: &nbsp;</strong>
								{employer.cnpj}
							</div>
							<div className='ml-2 mr-1 px-3 card bg-info rounded-2xl text-sm mt-2 inline'>
								<strong>Endereço: &nbsp;</strong>
								{employer.address?.street}, {employer.address?.streetNumber},{' '}
								{employer.address?.complement
									? employer.address?.complement + ', '
									: ''}
								{employer.address?.neighborhood}, {employer.address?.city} -{' '}
								{employer.address?.state}, {employer.address?.cep},{' '}
								{employer.address?.country}
							</div>
						</div>

						{/* contato */}
						{employer.contact ? (
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
											{employer.contact?.name?.firstName}{' '}
											{employer.contact?.name?.lastName}
										</div>
									</div>
									{employer.telephone && (
										<div className='stat'>
											<div className='stat-title text-md'>Telephone</div>
											<div className='text-lg stat-value'>
												{employer.contact?.telephone}
											</div>
										</div>
									)}
									<div className='stat'>
										<div className='stat-title text-md'>Celular</div>
										<div className='text-lg stat-value'>
											{employer.contact?.cellphone}
										</div>
									</div>
									<div className='stat'>
										<div className='stat-title text-md'>email</div>
										<div className='text-lg stat-value'>
											{employer.contact?.email}
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

						{/* Funcionários */}
						<h1 className='text-3xl font-semibold my-5'>Funcionários</h1>
						<label
							htmlFor='addPlanModal'
							className='btn btn-outline btn-secondary btn-md mb-2 justify-around transform transition duration-200 hover:scale-105'
						>
							adicionar Funcionário
						</label>
						<div className='grid grid-cols-1 gap-0.5'>
							{employer.employees?.map((employee) => (
								<FuncionarioItem key={employee.id} funcionario={employee} />
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
			</div>
		</>
	)
}

export default Cliente
