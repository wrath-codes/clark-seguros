//*             Editar Operadora
//* ----------------------------------------
// @imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
// @features
import { updateEmployer, getEmployer, reset } from '../features/employer/employerSlice'
// @components
import BackButton from '../components/layout/BackButton'
import Spinner from '../components/layout/Spinner'
// @flowbite
import { TextInput, Label } from 'flowbite-react'
// @icons
import { FaRoad, FaLock } from 'react-icons/fa'
import { RiBuilding2Fill, RiBuildingFill } from 'react-icons/ri'
import { HiIdentification, HiLocationMarker } from 'react-icons/hi'
import { AiOutlineNumber } from 'react-icons/ai'
import { IoIosAdd } from 'react-icons/io'

const EditarCliente = () => {
	// navigatge and dispatch
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { employerId } = useParams()

	// reducers
	const { employer, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.employer
	)

	// get employer
	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
		dispatch(getEmployer(employerId))
	}, [dispatch, employerId, isError, message])

	// employer to be created
	const [employerData, setEmployerData] = useState({
		name: employer.name,
		cnpj: employer.cnpj,

		street: employer.address?.street,
		streetNumber: employer.address?.streetNumber,
		complement: employer.address?.complement ? employer.address?.complement : '',
		neighborhood: employer.address?.neighborhood,
		city: employer.address?.city,
		cep: employer.address?.cep,
		state: employer.address?.state,
		country: employer.address?.country
	})
	// destructure employer data
	const {
		name,
		cnpj,

		street,
		streetNumber,
		complement,
		neighborhood,
		city,
		cep,
		state,
		country
	} = employerData

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
	}, [isError, isSuccess, message])

	const onSubmit = (e) => {
		// prevents default form action
		e.preventDefault()
		// prepare update data
		const sendData = {
			name: name,
			cnpj: cnpj,

			address: {
				street: street,
				streetNumber: streetNumber,
				complement: complement,
				neighborhood: neighborhood,
				city: city,
				cep: cep,
				state: state,
				country: country
			}
		}
		// calls create employer
		dispatch(updateEmployer(sendData))
		navigate(`/health/employers/${employerId}`)
		dispatch(reset())
	}

	const onChange = (e) => {
		setEmployerData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<BackButton url={`/health/employers/${employer._id}`} />
			<div className='flex flex-row mx-auto text-3xl text-neutral gap-2 items-center justify-center mb-5'>
				<RiBuilding2Fill size={40} className=' text-secondary' />
				<div className=''>Editar Cliente</div>
			</div>
			<div className='w-full max-w-md mx-auto flex flex-col gap-6'>
				<form onSubmit={onSubmit} className='flex flex-col gap-3'>
					<div>
						<TextInput
							id='name'
							type='name'
							placeholder='Nome da Cliente'
							name='name'
							value={name}
							onChange={onChange}
							required={true}
							icon={RiBuildingFill}
							addon='Cliente'
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

					<button
						className='btn btn-secondary text-base-100 text-center'
						type='submit'
					>
						Editar
					</button>
				</form>
			</div>
		</>
	)
}

export default EditarCliente
