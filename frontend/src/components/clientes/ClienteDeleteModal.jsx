//*                  Add Funcionario Modal
//* ----------------------------------------
// @imports
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// @features
import { deleteEmployer, getEmployers, reset } from '../../features/employer/employerSlice'
// @flowbite
import { TextInput, Select, Label, Modal, Checkbox } from 'flowbite-react'
// @icons
import { HiTrash } from 'react-icons/hi'

const ClienteDeleteModal = ({}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onDelete = (e) => {
		dispatch(deleteEmployer())
		navigate('/health/employers')
		dispatch(getEmployers())
		dispatch(reset())
	}

	return (
		<>
			<label
				className='btn btn-error btn-md mb-10 transform transition duration-200 hover:scale-105'
				htmlFor='deleteModal'
			>
				<HiTrash />
			</label>

			{/* modal delete */}

			<input type='checkbox' id='deleteModal' className='modal-toggle' />
			<label htmlFor='deleteModal' className='modal cursor-pointer'>
				<label className='modal-box relative' htmlFor=''>
					<h3 className='text-lg font-bold card-title text-base-content'>
						Tem certeza que quer deletar este Cliente?
					</h3>
					<div className='mt-5 items-center text-center'>
						<label
							htmlFor='deleteModal'
							className='btn btn-outline btn-success btn-md mb-5 mr-2 '
						>
							no
						</label>
						<button
							onClick={onDelete}
							className='btn btn-outline btn-error btn-md mb-5 '
						>
							yes
						</button>
					</div>
				</label>
			</label>
		</>
	)
}

export default ClienteDeleteModal
