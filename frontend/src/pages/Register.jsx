// //*                  Register
// //* ----------------------------------------
// // @imports
// import { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'
// import { useSelector, useDispatch } from 'react-redux'
// // @icons
// import { FaUser } from 'react-icons/fa'
// import { MdEmail } from 'react-icons/md'
// import { RiLockFill, RiCellphoneFill, RiUserAddFill } from 'react-icons/ri'
// // @components
// import Logo from '../components/layout/Logo'
// // @flowbite
// import { Select, TextInput } from 'flowbite-react'
// // @features
// import { registerUser, reset } from '../features/auth/authSlice'

// const Register = () => {
// 	const [formData, setFormData] = useState({
// 		firstName: '',
// 		lastName: '',
// 		email: '',
// 		password: '',
// 		password2: '',
// 		cellphone: '',
// 		role: ''
// 	})

// 	const { firstName, lastName, email, password, password2, cellphone, role } = formData

// 	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
// 	const dispatch = useDispatch()

// 	// dispatches
// 	useEffect(() => {
// 		if (isError) {
// 			toast.error(message)
// 		}

// 		dispatch(reset())
// 	}, [isError, dispatch])

// 	// on functinality
// 	const onChange = (e) => {
// 		setFormData((prevState) => ({
// 			...prevState,
// 			[e.target.name]: e.target.value
// 		}))
// 	}

// 	const onSubmit = (e) => {
// 		e.preventDefault()

// 		if (password !== password2) {
// 			toast.error(
// 				'Assegure-se de que os campos Senha e Confirmar senha coincidem exatamente'
// 			)
// 		} else {
// 			const userData = {
// 				name: {
// 					firstName: firstName,
// 					lastName: lastName
// 				},
// 				email,
// 				password,
// 				password2,
// 				cellphone,
// 				role
// 			}

// 			dispatch(registerUser(userData))
// 		}
// 	}
// 	return (
// 		<div className='w-full max-w-xs mx-auto flex flex-col gap-6'>
// 			<div className='flex mx-auto text-3xl text-neutral gap-2 items-center'>
// 				<RiUserAddFill className='text-2xl text-secondary' />{' '}
// 				<div className='nx-2'>Registrar Usuário</div>
// 			</div>
// 			<form onSubmit={onSubmit} className='flex flex-col gap-3'>
// 				<div>
// 					<TextInput
// 						id='firstName'
// 						type='name'
// 						placeholder='Nome'
// 						name='firstName'
// 						value={firstName}
// 						onChange={onChange}
// 						required={true}
// 						icon={FaUser}
// 					/>
// 				</div>
// 				<div>
// 					<TextInput
// 						id='lastName'
// 						type='name'
// 						placeholder='Sobrenome'
// 						name='lastName'
// 						value={lastName}
// 						onChange={onChange}
// 						required={true}
// 						icon={FaUser}
// 					/>
// 				</div>
// 				<div>
// 					<TextInput
// 						id='email'
// 						type='email'
// 						placeholder='exemplo@exemplo.com'
// 						name='email'
// 						value={email}
// 						onChange={onChange}
// 						required={true}
// 						icon={MdEmail}
// 					/>
// 				</div>
// 				<div>
// 					<TextInput
// 						id='cellphone'
// 						type='cellphone'
// 						placeholder='(21)9XXXX-XXXX'
// 						name='cellphone'
// 						value={cellphone}
// 						onChange={onChange}
// 						required={true}
// 						icon={RiCellphoneFill}
// 					/>
// 				</div>
// 				<div>
// 					<TextInput
// 						id='password'
// 						type='password'
// 						placeholder='Definir Senha'
// 						name='password'
// 						value={password}
// 						onChange={onChange}
// 						required={true}
// 						icon={RiLockFill}
// 					/>
// 				</div>
// 				<div>
// 					<TextInput
// 						id='password2'
// 						type='password'
// 						placeholder='Confirmar Senha'
// 						name='password2'
// 						value={password2}
// 						onChange={onChange}
// 						required={true}
// 						icon={RiLockFill}
// 					/>
// 				</div>
// 				<div id='select'>
// 					<Select
// 						id='role'
// 						name='role'
// 						onChange={onChange}
// 						addon='Cargo'
// 						required={true}
// 					>
// 						<option value='staff-health'>Saúde</option>
// 						<option value='staff-auto'>Auto</option>
// 						<option value='staff-others'>Outros</option>
// 						<option value='staff-all'>Todos</option>
// 						<option value='admin'>Admnistrador</option>
// 					</Select>
// 				</div>

// 				<button className='btn btn-secondary text-center' type='submit'>
// 					Registrar
// 				</button>
// 			</form>
// 		</div>
// 	)
// }

// export default Register
