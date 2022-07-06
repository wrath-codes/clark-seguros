//*         Delete Operadora Modal
//* ----------------------------------------
// @imports
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// @features
import { getOperators, deleteOperator, reset } from '../../features/operator/operatorSlice'
// @icons
import { HiTrash } from 'react-icons/hi'

const OperadoraDeleteModal = ({ operatorId }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onDelete = (e) => {
		dispatch(deleteOperator(operatorId))
		navigate('/health/operators')
		dispatch(getOperators())
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
						Tem certeza que quer deletar esta Operadora?
					</h3>
					<div className='mt-5 items-center text-center'>
						<label
							htmlFor='deleteModal'
							className='btn btn-outline btn-success btn-md mb-5 mr-2'
						>
							Não
						</label>
						<button
							onClick={onDelete}
							className='btn btn-outline btn-error btn-md mb-5 '
						>
							Sim
						</button>
					</div>
				</label>
			</label>
		</>
	)
}

export default OperadoraDeleteModal
