//*                  Navbar
//* ----------------------------------------
// @imports
import { useEffect, useState } from 'react'
import axios from 'axios'
// @components
import OperadoraItem from '../components/operadoras/OperadoraItem'
// @components

const Operadoras = () => {
	const [operators, setOperators] = useState([])

	useEffect(() => {
		const fetchOperators = async () => {
			const { data } = await axios.get('/api/operators')

			setOperators(data)
		}
		fetchOperators()
	}, [])

	return (
		<>
			<h1 className='text-5xl text-prim mb-5'>Operadoras</h1>
			<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3'>
				{operators.map((operadora) => (
					<OperadoraItem key={operadora._id} operadora={operadora} />
				))}
			</div>
		</>
	)
}

export default Operadoras
