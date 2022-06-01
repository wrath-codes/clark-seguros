//*                            Back Button
//* -----------------------------------------------------------------------
// @imports
import { Link } from 'react-router-dom'
// @icons
import { FaArrowCircleLeft } from 'react-icons/fa'

const BackButton = ({ url }) => {
	return (
		<div>
			<Link to={url} className='btn btn-secondary btn-md text-base-100 mb-10'>
				<FaArrowCircleLeft className='mr-2' /> Voltar
			</Link>
		</div>
	)
}

export default BackButton
