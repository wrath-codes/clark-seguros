//*             Edit Button
//* ----------------------------------------
import { MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'

const EditButton = ({ url }) => {
	return (
		<Link
			className='btn btn-warning btn-md mb-10 mr-2 transform transition duration-200 hover:scale-105'
			to={url}
		>
			<MdEdit />
		</Link>
	)
}

export default EditButton
