//*                  Item Operadora
//* ----------------------------------------
// @imports
import { useState } from 'react'
import { Link } from 'react-router-dom'
// @icons
import { RiContactsLine } from 'react-icons/ri'

const OperadoraItem = ({ operadora }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='card card-compact card-bordered bg-base-100 shadow-2xl m-2'>
			<div className='card-body'>
				{/* info */}
				<Link to={`/health/operators/${operadora._id}`}>
					<div className='card-title text-secondary text-left'>{operadora.name}</div>
				</Link>
				<h3 className='text-md text-left'>
					<strong>CNPJ:</strong> {operadora.cnpj}
				</h3>
				<h3 className='text-md text-left'>
					<strong>Endereço:</strong> {operadora.address.street},{' '}
					{operadora.address.streetNumber},{' '}
					{operadora.address.complement ? operadora.address.complement + ', ' : ''}
					{operadora.address.neighborhood}, {operadora.address.city} -{' '}
					{operadora.address.state}, {operadora.address.cep},{' '}
					{operadora.address.country}
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
								{operadora.contact.name?.firstName}{' '}
								{operadora.contact.name?.lastName}
							</h4>
							<h4 className='text-md text-gray-600'>
								<strong>Telephone: </strong>
								{operadora.contact.cellphone}
							</h4>
							<h4 className='text-md text-gray-600'>
								<strong>Email: </strong>
								{operadora.contact.email}
							</h4>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default OperadoraItem
