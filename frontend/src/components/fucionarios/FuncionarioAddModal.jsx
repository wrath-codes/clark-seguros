//*                  Add Funcionario Modal
//* ----------------------------------------
// @imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// @features
import { createPlanCard } from '../../features/planCard/planCardSlice'
import { getEmployer } from '../../features/employer/employerSlice'
import { getPlansWithId } from '../../features/plan/planSlice'
// @flowbite
import { TextInput, Select, Label, Modal, Checkbox } from 'flowbite-react'
// @icons
import { FaRoad, FaPercentage } from 'react-icons/fa'
import { MdEdit, MdEmail } from 'react-icons/md'
import { HiIdentification, HiLocationMarker } from 'react-icons/hi'
import { GrTextAlignLeft } from 'react-icons/gr'
import { BsTelephoneFill, BsCalendar3 } from 'react-icons/bs'
import { AiOutlineNumber } from 'react-icons/ai'
import { IoIosAdd } from 'react-icons/io'

const FuncionarioAddModal = ({ cliente, contrato }) => {
	// reducers
	const { plans } = useSelector((state) => state.plan)

	// dispatch and navigate
	const dispatch = useDispatch()

	// modal open state
	const [showModal, setShowModal] = useState(false)

	const [planCardData, setPlanCardData] = useState({
		firstName: '',
		lastName: '',
		cpf: '',
		dateOfBirth: '',
		sex: '',
		maritalStatus: '',
		mothersFirstName: '',
		mothersLastName: '',
		street: '',
		streetNumber: '',
		complement: '',
		neighborhood: '',
		city: '',
		cep: '',
		state: '',
		country: '',
		email: '',
		cellphone: '',
		employer: '',
		contract: '',
		plan: '',
		cardIdentifier: '',
		titular: '',
		kind: '',
		lives: 1,
		isCoop: false,
		coopPercentage: 10
	})

	const {
		firstName,
		lastName,
		cpf,
		dateOfBirth,
		sex,
		maritalStatus,
		mothersFirstName,
		mothersLastName,
		street,
		streetNumber,
		complement,
		neighborhood,
		city,
		cep,
		state,
		country,
		email,
		cellphone,
		employer,
		contract,
		plan,
		cardIdentifier,
		titular,
		kind,
		lives,
		isCoop,
		coopPercentage
	} = planCardData

	//setup Open and Close of Modal
	const onClick = (e) => {
		setShowModal(!showModal)

		setPlanCardData((prevState) => ({
			...prevState,
			contract: contrato._id,
			employer: cliente._id
		}))
		dispatch(getPlansWithId(contrato.operator._id))
	}

	const onClose = (e) => {
		setShowModal(!showModal)
	}

	// handle employee input change
	const onPlanCardChange = (e) => {
		setPlanCardData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
		if (e.target.name === 'cpf') {
			setPlanCardData((prevState) => ({
				...prevState,
				titular: e.target.value
			}))
		}
		if (e.target.name === 'isCoop') {
			setPlanCardData((prevState) => ({
				...prevState,
				isCoop: isCoop === false ? true : false
			}))
		}
	}

	const onPlanCardAdd = (e) => {
		e.preventDefault()
		setPlanCardData((prevState) => ({
			...prevState,
			isCoop: !isCoop,
			coopPercentage: Number(coopPercentage)
		}))
		console.log(planCardData)
		dispatch(createPlanCard(planCardData))
		dispatch(getEmployer(cliente._id))
		window.location.reload()
	}

	return (
		<>
			<label
				className='btn btn-outline btn-secondary btn-md mb-4 mx-2 justify-around transform transition duration-200 hover:scale-105'
				onClick={onClick}
				htmlFor='planCardAddModal'
			>
				Adicionar Funcionário
			</label>

			<input type='checkbox' id='planCardAddModal' className='modal-toggle' />
			<label htmlFor='planCardAddModal' className='modal cursor-pointer'>
				<label className='modal-box w-11/12 max-w-5xl relative' htmlFor=''>
					<h3 className='text-xl font-bold text-center'>Adicionar Funcionário</h3>
					<div>
						<form
							onSubmit={onPlanCardAdd}
							className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5'
						>
							<div className='mt-5 mb-5 text-left mx-5'>
								<div className=' text-lg font-semibold text-base-content justify-between mb-5'>
									Informação Pessoal:
								</div>

								<div className='mb-1'>
									<TextInput
										id='cardIdentifier'
										type='cardIdentifier'
										placeholder='Número da Carteira'
										name='cardIdentifier'
										value={cardIdentifier}
										onChange={onPlanCardChange}
										required={true}
										icon={HiIdentification}
										addon='Carteira'
									/>
								</div>

								<div className='mb-1'>
									<TextInput
										id='firstName'
										type='firstName'
										placeholder='Nome do Funcionário'
										name='firstName'
										value={firstName}
										onChange={onPlanCardChange}
										required={true}
										icon={GrTextAlignLeft}
										addon='Nome'
									/>
								</div>
								<div className='mb-1'>
									<TextInput
										id='lastName'
										type='lastName'
										placeholder='Sobrenome do Funcionário'
										name='lastName'
										value={lastName}
										onChange={onPlanCardChange}
										required={true}
										icon={GrTextAlignLeft}
										addon='Sobrenome'
									/>
								</div>

								<div className='mb-1'>
									<TextInput
										id='cpf'
										type='cpf'
										placeholder='XXX.XXX.XXX-XX'
										name='cpf'
										value={cpf}
										onChange={onPlanCardChange}
										required={true}
										icon={HiIdentification}
										addon='CPF'
									/>
								</div>

								<div className='mb-1'>
									<Select
										id='sex'
										name='sex'
										addon='Sexo'
										required={true}
										onChange={onPlanCardChange}
										defaultValue='Sexo'
									>
										<option disabled value='Sexo'>
											Sexo
										</option>
										<option onClick={onPlanCardChange} value='Masculino'>
											Masculino
										</option>
										<option onClick={onPlanCardChange} value='Feminino'>
											Feminino
										</option>
									</Select>
								</div>

								<div className='mb-1'>
									<Select
										id='maritalStatus'
										name='maritalStatus'
										addon='Estado Civil'
										required={true}
										onChange={onPlanCardChange}
										defaultValue='Estado Civil'
									>
										<option disabled value='Estado Civil'>
											Estado Civil
										</option>
										<option onClick={onPlanCardChange} value='Solteiro(a)'>
											Solteiro(a)
										</option>
										<option onClick={onPlanCardChange} value='Casado(a)'>
											Casado(a)
										</option>
										<option
											onClick={onPlanCardChange}
											value='Divorciado(a)'
										>
											Divorciado(a)
										</option>
										<option onClick={onPlanCardChange} value='Viuvo(a)'>
											Viuvo(a)
										</option>
									</Select>
								</div>

								<div className='mb-1'>
									<Select
										id='kind'
										name='kind'
										addon='Tipo'
										required={true}
										onChange={onPlanCardChange}
										defaultValue='Tipo'
									>
										<option disabled value='Tipo'>
											Tipo
										</option>
										<option onClick={onPlanCardChange} value='Titular'>
											Titular
										</option>
										<option onClick={onPlanCardChange} value='Conjuge'>
											Conjuge
										</option>
										<option onClick={onPlanCardChange} value='Filho/Filha'>
											Filho/Filha
										</option>
										<option onClick={onPlanCardChange} value='Mãe/Pai'>
											Mãe/Pai
										</option>
									</Select>
								</div>

								{kind !== 'Titular' && (
									<div className='mb-1'>
										<TextInput
											id='titular'
											type='titular'
											placeholder='XXX.XXX.XXX-XX'
											name='titular'
											value={titular}
											onChange={onPlanCardChange}
											required={true}
											icon={HiIdentification}
											addon='Titular'
										/>
									</div>
								)}

								<div className='mb-1'>
									<TextInput
										id='dateOfBirth'
										type='dateOfBirth'
										placeholder='AAAA-MM-DD'
										name='dateOfBirth'
										value={dateOfBirth}
										onChange={onPlanCardChange}
										required={true}
										icon={BsCalendar3}
										addon='DDN'
									/>
								</div>

								<div className='mb-1'>
									<TextInput
										id='mothersFirstName'
										type='mothersFirstName'
										placeholder='Nome da Mãe'
										name='mothersFirstName'
										value={mothersFirstName}
										onChange={onPlanCardChange}
										required={true}
										icon={GrTextAlignLeft}
										addon='Nome da Mãe'
									/>
								</div>

								<div className='mb-1'>
									<TextInput
										id='mothersLastName'
										type='mothersLastName'
										placeholder='Sobrenome da Mãe'
										name='mothersLastName'
										value={mothersLastName}
										onChange={onPlanCardChange}
										required={true}
										icon={GrTextAlignLeft}
										addon='Sobrenome da Mãe'
									/>
								</div>

								<div className='mb-1'>
									<TextInput
										id='email'
										type='email'
										placeholder='Email do Funcionário'
										name='email'
										value={email}
										onChange={onPlanCardChange}
										required={true}
										icon={MdEmail}
										addon='Email'
									/>
								</div>

								<div className='mb-1'>
									<TextInput
										id='cellphone'
										type='cellphone'
										placeholder='(XX)XXXXX-XXXX'
										name='cellphone'
										value={cellphone}
										onChange={onPlanCardChange}
										required={true}
										icon={BsTelephoneFill}
										addon='Celular'
									/>
								</div>
							</div>
							<div className='mt-5 mb-5 text-left mx-5'>
								<div className=' text-lg font-semibold text-base-content justify-between mb-3'>
									Endereço:
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
										onChange={onPlanCardChange}
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
											onChange={onPlanCardChange}
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
											onChange={onPlanCardChange}
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
											onChange={onPlanCardChange}
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
											onChange={onPlanCardChange}
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
											onChange={onPlanCardChange}
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
											onChange={onPlanCardChange}
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
											onChange={onPlanCardChange}
											required={true}
											icon={HiLocationMarker}
											width={10}
										/>
									</div>
								</div>
								<div className=' text-lg font-semibold text-base-content justify-between mb-3'>
									Plano:
								</div>
								<div className='mb-1'>
									<Select
										id='plan'
										name='plan'
										onChange={onPlanCardChange}
										addon='Plano'
										required={true}
										defaultValue='Plano'
									>
										<option disabled>Plano</option>
										{plans.map((plan) => (
											<option
												onClick={onPlanCardChange}
												value={plan._id}
												key={plan._id}
											>
												{plan.name}
											</option>
										))}
									</Select>
								</div>

								<div className='mb-1 mt-2'>
									<div>
										<Checkbox
											name='isCoop'
											id='isCoop'
											onChange={onPlanCardChange}
										/>
										<Label
											className='ml-2 col-span-1 inline'
											htmlFor='isCoop'
										>
											Coparticipação
										</Label>

										{isCoop && (
											<TextInput
												id='coopPercentage'
												type='number'
												placeholder='% Coparticipação'
												name='coopPercentage'
												value={coopPercentage}
												onChange={onPlanCardChange}
												required={true}
												icon={FaPercentage}
												width={10}
												className='mt-2 col-span-1'
											/>
										)}
									</div>
								</div>
							</div>
							<div className='mt-5 text-center  xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-1'>
								<button
									type='submit'
									className='btn btn-outline btn-success btn-xltransform transition duration-200 hover:scale-105'
								>
									Adicionar
								</button>
							</div>
						</form>
					</div>
				</label>
			</label>
		</>
	)
}

export default FuncionarioAddModal
