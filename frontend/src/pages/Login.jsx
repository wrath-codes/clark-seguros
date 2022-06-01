//*                  Login
//* ----------------------------------------
// @imports
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// @icons
import { FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { RiLockFill } from 'react-icons/ri'
// @components
import Spinner from '../components/layout/Spinner'
// @flowbite
import { TextInput } from 'flowbite-react'
// @features
import { loginUser, reset } from '../features/auth/authSlice'

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	const { email, password } = formData
	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	// dispatches
	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		if (isSuccess || user) {
			navigate('/health')
		}

		dispatch(reset())
	}, [isError, isSuccess, user, message, navigate, dispatch])

	// on functinality
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const onSubmit = (e) => {
		e.preventDefault()

		const userData = {
			email,
			password
		}

		dispatch(loginUser(userData))
	}

	// loading
	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className='w-full max-w-xs mx-auto flex flex-col gap-6'>
			<div className='flex mx-auto text-3xl text-neutral gap-2 items-center'>
				<FaUser className='text-2xl text-secondary' />
				<div className='nx-2'>Login</div>
			</div>
			<form onSubmit={onSubmit} className='flex flex-col gap-4'>
				<div>
					<TextInput
						id='email'
						type='email'
						placeholder='Email'
						name='email'
						value={email}
						onChange={onChange}
						required={true}
						icon={MdEmail}
					/>
				</div>
				<div>
					<TextInput
						id='password'
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={onChange}
						required={true}
						icon={RiLockFill}
					/>
				</div>
				<button className='btn btn-secondary text-center' type='submit'>
					Entrar
				</button>
			</form>
		</div>
	)
}

export default Login
