//*                  Item Plano
//* ----------------------------------------
// @imports
import { useState } from 'react'
import { FaInfo } from 'react-icons/fa'
import { Link } from 'react-router-dom'
// @flowbite
import { TextInput, Select } from 'flowbite-react'
// @icons
import { MdEdit } from 'react-icons/md'
import { HiTrash } from 'react-icons/hi'

const PlanoItem = ({ plano }) => {
	const [isOpen, setIsOpen] = useState(false)

	const onPlanEdit = (e) => {}

	return (
		<div className='card card-compact card-bordered bg-base-100 shadow-lg m-2 transform transition duration-200 hover:scale-105'>
			<div className='card-body'>
				{/* info */}

				<div className=' card-actions text-base-content text-lg align-text-top justify-between'>
					<Link
						className='mr-5 mt-1'
						to={`/health/operators/${plano.operator}/plans/${plano._id}`}
					>
						<div className='card-title text-secondary'>
							<FaInfo className='text-md' />
						</div>
					</Link>
					<button onClick={() => setIsOpen(!isOpen)} className='font-medium mr-3'>
						{plano.name}
					</button>
				</div>

				{isOpen && (
					<div className='stats'>
						<div className='stat'>
							<div className='stat-title text-md'>Registro ANS</div>
							<div className='text-sm stat-value'>{plano.ansRegister}</div>
						</div>
						<div className='stat'>
							<div className='stat-title text-md'>Abrangência</div>
							<div className='text-sm stat-value'>{plano.reach}</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default PlanoItem
