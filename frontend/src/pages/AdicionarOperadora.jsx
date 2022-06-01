//*                  Navbar
//* ----------------------------------------
// @imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// @features
import { createOperator, reset } from '../features/operator/operatorSlice'
// @components
import BackButton from '../components/layout/BackButton'
import Spinner from '../components/layout/Spinner'
// @flowbite
import { TextInput, Label } from 'flowbite-react'
// @icons
import { FaRoad, FaUser, FaLock } from 'react-icons/fa'
import { RiBuilding2Fill, RiBuildingFill } from 'react-icons/ri'
import { HiIdentification, HiLocationMarker } from 'react-icons/hi'
import { MdOutlineWebAsset } from 'react-icons/md'
import { AiOutlineNumber } from 'react-icons/ai'
import { IoIosAdd } from 'react-icons/io'

const AdicionarOperadora = () => {
	// navigatge and dispatch
	const dispatch = useDispatch()
	const navigate = useNavigate()

	// reducers
	const { isLoading, isError, isSuccess, message } = useSelector((state) => state.operator)
	// operator to be created
	const [operatorData, setOperatorData] = useState({
		name: '',
		cnpj: '',
		website: '',
		street: '',
		streetNumber: '',
		complement: '',
		neighborhood: '',
		city: '',
		cep: '',
		state: '',
		country: '',
		username: '',
		password: ''
	})
	// destructure operator data
	const {
		name,
		cnpj,
		website,
		street,
		streetNumber,
		complement,
		neighborhood,
		city,
		cep,
		state,
		country,
		username,
		password
	} = operatorData

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		// if (isSuccess) {
		// 	dispatch(reset())
		// 	navigate('/health/operators')
		// }

		dispatch(reset())
	}, [dispatch, isError, isSuccess, navigate, message])

	const onSubmit = (e) => {
		// prevents default form action
		e.preventDefault()

		console.log(operatorData)

		const sendData = {
			name: name,
			cnpj: cnpj,
			website: website,
			address: {
				street: street,
				streetNumber: streetNumber,
				complement: complement,
				neighborhood: neighborhood,
				city: city,
				cep: cep,
				state: state,
				country: country
			},
			login: {
				username: username ? username : 'username',
				password: password ? password : 'password'
			}
		}

		// calls create operator
		dispatch(createOperator(sendData))
	}

	const onChange = (e) => {
		setOperatorData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	return (
		<>
			<BackButton url='/health/operators' />
			<div className='flex flex-row mx-auto text-3xl text-neutral gap-2 items-center justify-center mb-5'>
				<RiBuilding2Fill size={40} className=' text-secondary' />
				<div className=''>Adicionar Operadora</div>
			</div>
			<div className='w-full max-w-md mx-auto flex flex-col gap-6'>
				<form onSubmit={onSubmit} className='flex flex-col gap-3'>
					<div>
						<TextInput
							id='name'
							type='name'
							placeholder='Nome da Operadora'
							name='name'
							value={name}
							onChange={onChange}
							required={true}
							icon={RiBuildingFill}
							addon='Operadora'
						/>
					</div>
					<div>
						<TextInput
							id='cnpj'
							type='cnpj'
							placeholder='XX.XXX.XXX/XXXX-XX'
							name='cnpj'
							value={cnpj}
							onChange={onChange}
							required={true}
							icon={HiIdentification}
							addon='CNPJ'
						/>
					</div>
					<div>
						<TextInput
							id='website'
							type='website'
							placeholder='https://clarkseguros.com.br/'
							name='website'
							value={website}
							onChange={onChange}
							required={true}
							icon={MdOutlineWebAsset}
							addon='Website'
						/>
					</div>
					<div>
						<Label className='mb-2 block text-left text-xs' htmlFor='street'>
							Rua
						</Label>
						<TextInput
							id='street'
							type='street'
							placeholder='Rua'
							name='street'
							value={street}
							onChange={onChange}
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
								onChange={onChange}
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
								onChange={onChange}
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
								onChange={onChange}
								required={true}
								icon={AiOutlineNumber}
								width={10}
							/>
						</div>
						<div className=''>
							<Label className='mb-2 block text-left text-xs' htmlFor='city'>
								Cidade
							</Label>
							<TextInput
								id='city'
								type='city'
								placeholder='Cidade'
								name='city'
								value={city}
								onChange={onChange}
								required={true}
								icon={HiLocationMarker}
								width={10}
							/>
						</div>
					</div>
					<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 md:gap-2 mb-5'>
						<div className=''>
							<Label className='mb-2 block text-left text-xs' htmlFor='cep'>
								CEP
							</Label>
							<TextInput
								id='cep'
								type='cep'
								placeholder='XXXXX-XXX'
								name='cep'
								value={cep}
								onChange={onChange}
								required={true}
								icon={AiOutlineNumber}
								width={10}
							/>
						</div>
						<div className=''>
							<Label className='mb-2 block text-left text-xs' htmlFor='state'>
								Estado
							</Label>
							<TextInput
								id='state'
								type='state'
								placeholder='Estado'
								name='state'
								value={state}
								onChange={onChange}
								required={true}
								icon={HiLocationMarker}
								width={10}
							/>
						</div>
						<div className=''>
							<Label className='mb-2 block text-left text-xs' htmlFor='country'>
								País
							</Label>
							<TextInput
								id='country'
								type='country'
								placeholder='País'
								name='country'
								value={country}
								onChange={onChange}
								required={true}
								icon={HiLocationMarker}
								width={10}
							/>
						</div>
					</div>
					<div className=''>
						<Label className='mb-2 block text-left text-md' htmlFor='username'>
							Login Info
						</Label>
						<TextInput
							className='mb-2'
							id='username'
							type='username'
							placeholder='Usuário'
							name='username'
							value={username}
							onChange={onChange}
							required={false}
							icon={FaUser}
							width={10}
						/>
						<TextInput
							id='password'
							type='password'
							placeholder='Senha'
							name='password'
							value={password}
							onChange={onChange}
							required={false}
							icon={FaLock}
							width={10}
						/>
					</div>
					<button
						className='btn btn-secondary text-base-100 text-center'
						type='submit'
					>
						Adicionar
					</button>
				</form>
			</div>
		</>
	)
}

export default AdicionarOperadora
