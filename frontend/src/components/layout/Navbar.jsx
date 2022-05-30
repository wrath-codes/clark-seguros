//*                  Navbar
//* ----------------------------------------
// @imports
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useState } from 'react'
// @icons
import { FaUser } from 'react-icons/fa'
// @components
import Logo from './Logo'
// @flowbite
import { Dropdown, Navbar, Avatar, Label, TextInput, Checkbox, Button } from 'flowbite-react'

function NavbarClark({ title }) {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	const { email, password } = formData

	return (
		<Navbar
			fluid={true}
			rounded={true}
			className='shadow-lg text-gray-500  bg-base-100 top-0 z-50 alig'
		>
			<Link to='/' className='inline-flex'>
				<Logo className='mr-5' />
				<span className=' text-xl font-semibold dark:text-white'>{title}</span>
			</Link>

			<div className='flex md:order-2'>
				<Navbar.Toggle />
			</div>
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

				{/* <Dropdown
					arrowIcon={false}
					inline={true}
					placement='bottom'
					label={
						<div className='btn btn-ghost btn-sm rounded-btn text-secondary align-middle'>
							<FaUser />
							<Link to='/login' className='mx-2'>
								Login
							</Link>
						</div>
					}
				>
					<Dropdown.Header>
						<span className='block text-sm'>Bonnie Green</span>
						<span className='block truncate text-sm font-medium'>
							name@flowbite.com
						</span>
					</Dropdown.Header>
					<Dropdown.Item>Dashboard</Dropdown.Item>
					<Dropdown.Item>Settings</Dropdown.Item>
					<Dropdown.Item>Earnings</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item>Sign out</Dropdown.Item>
				</Dropdown>
				 */}
				<Dropdown
					arrowIcon={false}
					inline={true}
					placement='bottom'
					label={
						<div className='btn btn-ghost btn-sm rounded-btn text-secondary align-middle'>
							<FaUser />
							<Link to='/login' className='mx-2'>
								Login
							</Link>
						</div>
					}
				>
					<Dropdown.Item>
						<form className='flex flex-col gap-4'>
							<div>
								<TextInput
									id='email'
									type='email'
									placeholder='Email'
									required={true}
								/>
							</div>
							<div>
								<TextInput
									id='password'
									type='password'
									placeholder='Password'
									required={true}
								/>
							</div>
							<div className='flex items-center gap-2'>
								<Checkbox id='remember' />
								<Label htmlFor='remember'>Remember me</Label>
							</div>
							<button className='btn btn-secondary text-center' type='submit'>
								Entrar
							</button>
						</form>
					</Dropdown.Item>
				</Dropdown>
			</Navbar.Collapse>
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
