//*                  Item Plano
//* ----------------------------------------

import { useState } from 'react'
import { FaInfo } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const PlanoItem = ({ plano }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='card card-compact card-bordered bg-base-100 shadow-lg m-2'>
			<div className='card-body'>
				{/* info */}

				<div className=' card-actions text-base-content text-lg align-text-top'>
					<Link
						className='mr-5 mt-1'
						to={`/health/plans/${plano._id}`}
					>
						<div className='card-title text-secondary'>
							<FaInfo className='text-md' />
						</div>
					</Link>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='font-medium'
					>
						{plano.name}
					</button>
				</div>

				{isOpen && (
					<div className='stats'>
						<div className='stat'>
							<div className='stat-title text-md'>
								Registro ANS
							</div>
							<div className='text-sm stat-value'>
								{plano.ansRegister}
							</div>
						</div>
						<div className='stat'>
							<div className='stat-title text-md'>
								Abrangência
							</div>
							<div className='text-sm stat-value'>
								{plano.reach}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default PlanoItem
