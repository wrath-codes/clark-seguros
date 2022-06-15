//*                  Item Cliente
//* ----------------------------------------
// @imports
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// @icons
import { RiContactsLine } from 'react-icons/ri'
// @features
import { reset } from '../../features/employer/employerSlice'

const ClienteItem = ({ employer }) => {
	const [isOpen, setIsOpen] = useState(false)
	const dispatch = useDispatch()

	return (
		<div className='card card-compact card-bordered bg-base-100 shadow-2xl m-2'>
			<div className='card-body'>
				{/* info */}
				<Link
					className='card-title text-secondary text-left justify-between'
					to={`/health/employers/${employer._id}`}
					onClick={() => dispatch(reset())}
				>
					{employer.name}
				</Link>

				<h3 className='text-md text-left'>
					<strong>CNPJ:</strong> {employer.cnpj}
				</h3>
				<h3 className='text-md text-left'>
					<strong>Endereço:</strong> {employer.address.street},{' '}
					{employer.address.streetNumber},{' '}
					{employer.address.complement ? employer.address.complement + ', ' : ''}
					{employer.address.neighborhood}, {employer.address.city} -{' '}
					{employer.address.state}, {employer.address.cep},{' '}
					{employer.address.country}
				</h3>
				{/* contact */}
				<button
					className='grid grid-cols-12 text-secondary mt-2'
					onClick={() => setIsOpen(!isOpen)}
				>
					<RiContactsLine className='col-span-1 inline pr-2 text-3xl' />
					<p className='text-lg align-middle col-span-1'>Contact</p>
				</button>
				{isOpen && (
					<>
						<div className='text-left'>
							<h4 className='text-md text-gray-600'>
								<strong>Nome: </strong>
								{employer.contact.name?.firstName}{' '}
								{employer.contact.name?.lastName}
							</h4>
							<h4 className='text-md text-gray-600'>
								<strong>Telephone: </strong>
								{employer.contact.cellphone}
							</h4>
							<h4 className='text-md text-gray-600'>
								<strong>Email: </strong>
								{employer.contact.email}
							</h4>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default ClienteItem
