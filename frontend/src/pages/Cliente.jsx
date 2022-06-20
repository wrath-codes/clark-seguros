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
import { getPlansWithId } from '../features/plan/planSlice'
import { getContract } from '../features/contract/contractSlice'
// @components
import Spinner from '../components/layout/Spinner'
import BackButton from '../components/layout/BackButton'
import FuncionarioItem from '../components/layout/fucionarios/FuncionarioItem'
// @flowbite
import { TextInput, Select, Accordion, Label } from 'flowbite-react'
// @icons
import { FaRoad } from 'react-icons/fa'
import { MdEdit, MdEmail, MdOutlineExpandMore } from 'react-icons/md'
import { HiTrash, HiIdentification, HiLocationMarker } from 'react-icons/hi'
import { GrTextAlignLeft } from 'react-icons/gr'
import { BsTelephoneFill, BsCalendar3 } from 'react-icons/bs'
import { AiOutlineNumber } from 'react-icons/ai'
import { IoIosAdd } from 'react-icons/io'

const Cliente = () => {
	// @reducers
	const { employer, isSuccess, isError, isLoading, message } = useSelector(
		(state) => state.employer
	)
	const { plans } = useSelector((state) => state.plan)
	const { contract } = useSelector((state) => state.contract)

	const [contratoSelect, setContratoSelect] = useState('')

	// set contact data
	const [contactData, setContactData] = useState({
		firstName: '',
		lastName: '',
		telephone: '',
		cellphone: '',
		email: ''
	})
	const { firstName, lastName, telephone, cellphone, email } = contactData

	// set employee data
	const [employeeData, setEmployeeData] = useState({
		nome: '',
		sobrenome: '',
		cpf: '',
		ddn: '',
		sexo: '',
		estadoCivil: '',
		nomeDaMae: '',
		sobrenomeDaMae: '',
		eMail: '',
		celular: '',
		street: '',
		streetNumber: '',
		complement: '',
		neighborhood: '',
		city: '',
		cep: '',
		state: '',
		country: '',
		cliente: '',
		contrato: '',
		plano: '',
		cardIdentifier: '',
		titular: '',
		kind: '',
		lives: 1
	})
	const {
		nome,
		sobrenome,
		cpf,
		ddn,
		sexo,
		estadoCivil,
		nomeDaMae,
		sobrenomeDaMae,
		eMail,
		celular,
		street,
		streetNumber,
		complement,
		neighborhood,
		city,
		cep,
		state,
		country,
		cliente,
		contrato,
		plano,
		cardIdentifier,
		titular,
		kind,
		lives
	} = employeeData

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

	const onEmployeeAdd = (e) => {
		e.preventDefault()
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
		window.location.reload()
	}

	const onChange = (e) => {
		setContactData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const onEmployeeChange = (e) => {
		setEmployeeData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const getContractPlans = (e) => {
		setContratoSelect(e.target.value)
		console.log(contratoSelect)
		dispatch(getContract(contratoSelect))
		console.log(contract)
		dispatch(getPlansWithId(contract.operator?._id))
		console.log(plans)
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
							htmlFor='addEmployeeModal'
							className='btn btn-outline btn-secondary btn-md mb-2 justify-around transform transition duration-200 hover:scale-105'
						>
							adicionar Funcionário
						</label>

						<Accordion
							flush={true}
							className='grid grid-cols-1 gap-0.5 mx-10'
							arrowIcon={MdOutlineExpandMore}
						>
							{employer.employees?.map((employee) => (
								<FuncionarioItem key={employee.id} funcionario={employee} />
							))}
						</Accordion>
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

				{/* Add Employee Modal */}
				<input type='checkbox' id='addEmployeeModal' className='modal-toggle' />
				<label htmlFor='addEmployeeModal' className='modal cursor-pointer'>
					<label className='modal-box relative' htmlFor=''>
						<h3 className='text-lg font-bold'>Funcionário</h3>
						<div className='mt-5 items-center'>
							<form onSubmit={onEmployeeAdd} className='flex flex-col gap-3'>
								<div>
									<TextInput
										id='nome'
										type='nome'
										placeholder='Nome do Funcionário'
										name='nome'
										value={nome}
										onChange={onEmployeeChange}
										required={true}
										icon={GrTextAlignLeft}
										addon='Nome'
									/>
								</div>
								<div>
									<TextInput
										id='sobrenome'
										type='sobrenome'
										placeholder='Sobrenome do Funcionário'
										name='sobrenome'
										value={sobrenome}
										onChange={onEmployeeChange}
										required={true}
										icon={GrTextAlignLeft}
										addon='Sobrenome'
									/>
								</div>

								<div>
									<TextInput
										id='cpf'
										type='cpf'
										placeholder='XXX.XXX.XXX-XX'
										name='cpf'
										value={cpf}
										onChange={onEmployeeChange}
										required={true}
										icon={HiIdentification}
										addon='CPF'
									/>
								</div>

								<div>
									<Select
										id='sexo'
										name='sexo'
										onChange={onEmployeeChange}
										addon='Sexo'
										required={true}
									>
										<option disabled value='Sexo'>
											Sexo
										</option>
										<option value='Masculino'>Masculino</option>
										<option value='Feminino'>Feminino</option>
									</Select>
								</div>

								<div>
									<TextInput
										id='ddn'
										type='ddn'
										placeholder='AAAA-MM-DD'
										name='ddn'
										value={ddn}
										onChange={onEmployeeChange}
										required={true}
										icon={BsCalendar3}
										addon='DDN'
									/>
								</div>

								<div>
									<TextInput
										id='nomeDaMae'
										type='nomeDaMae'
										placeholder='Nome da Mãe'
										name='nomeDaMae'
										value={nomeDaMae}
										onChange={onEmployeeChange}
										required={true}
										icon={GrTextAlignLeft}
										addon='Nome da Mãe'
									/>
								</div>

								<div>
									<TextInput
										id='sobrenomeDaMae'
										type='sobrenomeDaMae'
										placeholder='Sobrenome da Mãe'
										name='sobrenomeDaMae'
										value={sobrenomeDaMae}
										onChange={onEmployeeChange}
										required={true}
										icon={GrTextAlignLeft}
										addon='Sobrenome da Mãe'
									/>
								</div>

								<div>
									<TextInput
										id='eMail'
										type='eMail'
										placeholder='Email do Funcionário'
										name='eMail'
										value={email}
										onChange={onEmployeeChange}
										required={true}
										icon={MdEmail}
										addon='Email'
									/>
								</div>

								<div>
									<TextInput
										id='celular'
										type='celular'
										placeholder='(XX)XXXXX-XXXX'
										name='celular'
										value={celular}
										onChange={onEmployeeChange}
										required={true}
										icon={BsTelephoneFill}
										addon='Celular'
									/>
								</div>

								<div>
									<Label
										className='mb-2 block text-left text-xs'
										htmlFor='street'
									>
										Rua
									</Label>
									<TextInput
										id='street'
										type='street'
										placeholder='Rua'
										name='street'
										value={street}
										onChange={onEmployeeChange}
										required={true}
										icon={FaRoad}
									/>
								</div>
								<div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-5 md:gap-2'>
									<div className='col-span-1'>
										<Label
											className='mb-2 block text-left text-xs'
											htmlFor='streetNumber'
										>
											Numero
										</Label>
										<TextInput
											id='streetNumber'
											type='streetNumber'
											placeholder='Nº'
											name='streetNumber'
											value={streetNumber}
											onChange={onEmployeeChange}
											required={true}
											icon={AiOutlineNumber}
											width={10}
										/>
									</div>
									<div className='xl:col-span-3 lg:col-span-3 md:col-span-4'>
										<Label
											className='mb-2 block text-left text-xs'
											htmlFor='complement'
										>
											Complemento
										</Label>
										<TextInput
											id='complement'
											type='complement'
											placeholder='Complemento'
											name='complement'
											value={complement}
											onChange={onEmployeeChange}
											required={false}
											icon={IoIosAdd}
											width={10}
										/>
									</div>
								</div>
								<div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 md:gap-2'>
									<div className=''>
										<Label
											className='mb-2 block text-left text-xs'
											htmlFor='neighborhood'
										>
											Bairro
										</Label>
										<TextInput
											id='neighborhood'
											type='neighborhood'
											placeholder='Bairro'
											name='neighborhood'
											value={neighborhood}
											onChange={onEmployeeChange}
											required={true}
											icon={AiOutlineNumber}
											width={10}
										/>
									</div>
									<div className=''>
										<Label
											className='mb-2 block text-left text-xs'
											htmlFor='city'
										>
											Cidade
										</Label>
										<TextInput
											id='city'
											type='city'
											placeholder='Cidade'
											name='city'
											value={city}
											onChange={onEmployeeChange}
											required={true}
											icon={HiLocationMarker}
											width={10}
										/>
									</div>
								</div>
								<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 md:gap-2 mb-5'>
									<div className=''>
										<Label
											className='mb-2 block text-left text-xs'
											htmlFor='cep'
										>
											CEP
										</Label>
										<TextInput
											id='cep'
											type='cep'
											placeholder='XXXXX-XXX'
											name='cep'
											value={cep}
											onChange={onEmployeeChange}
											required={true}
											icon={AiOutlineNumber}
											width={10}
										/>
									</div>
									<div className=''>
										<Label
											className='mb-2 block text-left text-xs'
											htmlFor='state'
										>
											Estado
										</Label>
										<TextInput
											id='state'
											type='state'
											placeholder='Estado'
											name='state'
											value={state}
											onChange={onEmployeeChange}
											required={true}
											icon={HiLocationMarker}
											width={10}
										/>
									</div>
									<div className=''>
										<Label
											className='mb-2 block text-left text-xs'
											htmlFor='country'
										>
											País
										</Label>
										<TextInput
											id='country'
											type='country'
											placeholder='País'
											name='country'
											value={country}
											onChange={onEmployeeChange}
											required={true}
											icon={HiLocationMarker}
											width={10}
										/>
									</div>
								</div>

								<div>
									<Select
										id='contrato'
										name='contrato'
										onChange={onEmployeeChange}
										addon='Contrato'
										required={true}
										onClick={getContractPlans}
									>
										<option disabled value='Contrato'>
											Contrato
										</option>
										{employer.contracts?.map((contract) => (
											<option
												onChange={onEmployeeChange}
												value={contract._id}
												key={contract._id}
											>
												{contract.name}
											</option>
										))}
									</Select>
								</div>

								<div>
									<Select
										id='cliente'
										name='cliente'
										onChange={onEmployeeChange}
										addon='Cliente'
										required={true}
									>
										<option disabled value={employer._id}>
											{employer.name}
										</option>
										<option value={employer._id}>{employer.name}</option>
									</Select>
								</div>

								<div>
									<Select
										id='plano'
										name='plano'
										onChange={onEmployeeChange}
										addon='Plano'
										required={true}
									>
										<option disabled>Plano</option>
										{plans.map((plan) => (
											<option
												onChange={onEmployeeChange}
												value={plan._id}
												key={plan._id}
											>
												{plan.name}
											</option>
										))}
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
			</div>
		</>
	)
}

export default Cliente
