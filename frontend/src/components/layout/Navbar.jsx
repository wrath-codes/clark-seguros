//*                  Navbar
//* ----------------------------------------
// @imports
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// @icons
import { FaUser } from 'react-icons/fa'

import Logo from './Logo'

function Navbar({ title }) {
	return (
		<nav className='navbar shadow-lg bg-base text-gray-500 justify-around'>
			<div className='container 2xl'>
				<div className='flex-none px-2 mx-2'>
					<Logo className='inline mr-3' />
					<Link to='/' className='text-lg font-bold align-middle'>
						{title}
					</Link>
				</div>
				<div className='flex-1 px-2 mx-2 just'>
					<div className='flex justify-end'>
						<Link
							to='/'
							className='btn btn-ghost btn-sm rounded-btn'
						>
							Home
						</Link>
						<Link
							to='/about'
							className='btn btn-ghost btn-sm rounded-btn'
						>
							Quem Somos?
						</Link>
						<Link
							to='/products'
							className='btn btn-ghost btn-sm rounded-btn'
						>
							Produtos
						</Link>
						<Link
							to='/contact'
							className='btn btn-ghost btn-sm rounded-btn'
						>
							Contato
						</Link>
						<Link
							to='/resolution'
							className='btn btn-ghost btn-sm rounded-btn'
						>
							Resolução 382/2020
						</Link>

						{/* <Link to='/health' className='dropdown dropdown-end'>
							<label
								tabindex='0'
								class='btn btn-ghost btn-sm rounded-btn'
							>
								Saude
							</label>
							<ul
								tabindex='0'
								class='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
							>
								<li>
									<Link to='/health/operators'>
										Operadoras
									</Link>
								</li>
								<li>
									<Link to='/health/plans'>Planos</Link>
								</li>
								<li>
									<Link to='/health/clients'>Clientes</Link>
								</li>
								<li>
									<Link to='/health/beneficiaries'>
										Beneficiarios
									</Link>
								</li>
							</ul>
						</Link> */}
					</div>
				</div>
				{/* <div className='flex justify-end '>
					<div className='form-control'>
						<input
							type='text'
							name='search'
							className='input input-bordered'
							placeholder='Buscar...'
						/>
					</div>
				</div> */}
				<div className='flex px-2 mx-2'>
					<div className='flex btn btn-ghost btn-sm justify-end text-secondary align-bottom'>
						<FaUser />
						<Link to='/login' className='mx-2'>
							Login
						</Link>
					</div>
				</div>
			</div>
		</nav>
	)
}

Navbar.defaultProps = {
	title: 'Clark Seguros'
}

Navbar.propTypes = {
	title: PropTypes.string
}

export default Navbar
