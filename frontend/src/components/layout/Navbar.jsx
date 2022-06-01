//*                  Navbar
//* ----------------------------------------
// @imports
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
// @icons
import { FaUser } from 'react-icons/fa'
// @components
import Logo from './Logo'
// @flowbite
import { Navbar } from 'flowbite-react'
// @features
import { logoutUser, reset } from '../../features/auth/authSlice'

function NavbarClark({ title }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { user } = useSelector((state) => state.auth)

	// @on functions
	const onLogout = () => {
		dispatch(logoutUser())
		dispatch(reset())
		navigate('/')
	}

	return (
		<Navbar
			fluid={true}
			rounded={true}
			className='shadow-lg text-gray-500  bg-base-100 top-0 z-50 align-middle sticky'
		>
			<Link to='/' className='inline-flex'>
				<Logo className='mr-5' />
				<span className=' text-xl font-semibold dark:text-white'>{title}</span>
			</Link>
			<div className='flex md:order-2'>
				<Navbar.Toggle />
			</div>
			{user ? (
				<Navbar.Collapse>
					<Link to='/health/operators' className='btn btn-ghost btn-sm rounded-btn'>
						Operadoras
					</Link>
					<Link to='/health/clients' className='btn btn-ghost btn-sm rounded-btn'>
						Clientes
					</Link>
					<Link to='/health/contracts' className='btn btn-ghost btn-sm rounded-btn'>
						Contratos
					</Link>
					<Link to='/health/fileupload' className='btn btn-ghost btn-sm rounded-btn'>
						Importar Arquivo
					</Link>

					<div className='btn btn-ghost btn-sm rounded-btn text-secondary align-middle'>
						<FaUser />
						<Link onClick={onLogout} to='/' className='mx-2'>
							Logout
						</Link>
					</div>
				</Navbar.Collapse>
			) : (
				<Navbar.Collapse>
					<Link to='/' className='btn btn-ghost btn-sm rounded-btn'>
						Home
					</Link>
					<Link to='/about' className='btn btn-ghost btn-sm rounded-btn'>
						Quem Somos?
					</Link>
					<Link to='/products' className='btn btn-ghost btn-sm rounded-btn'>
						Produtos
					</Link>
					<Link to='/contact' className='btn btn-ghost btn-sm rounded-btn'>
						Contato
					</Link>
					<Link to='/resolution' className='btn btn-ghost btn-sm rounded-btn'>
						Resolução 382/2020
					</Link>
					<div className='btn btn-ghost btn-sm rounded-btn text-secondary align-middle'>
						<FaUser />
						<Link to='/login' className='mx-2'>
							Login
						</Link>
					</div>
				</Navbar.Collapse>
			)}
		</Navbar>
	)
}

NavbarClark.defaultProps = {
	title: 'Clark Seguros'
}

NavbarClark.propTypes = {
	title: PropTypes.string
}

export default NavbarClark
