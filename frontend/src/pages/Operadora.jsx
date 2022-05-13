//*                  Operadora
//* ----------------------------------------

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import PlanoItem from '../components/planos/PlanoItem'

import planosA from '../planos'

const Operadora = () => {
	const params = useParams()
	const [loading, setLoading] = useState(false)

	const [operator, setOperator] = useState({})
	const [contact, setContact] = useState({})
	const planos = planosA.filter((p) => p.operator_id === params.id)

	const { name, cnpj, address, website } = operator

	// fetch operators
	useEffect(() => {
		const fetchOperator = async () => {
			const { data } = await axios.get(`/api/operators/${params.id}`)

			setOperator(data)
			setContact(data.contact)
		}
		fetchOperator()
	}, [params.id])

	if (loading) {
		return <p>Data is loading...</p>
	}

	return (
		<>
			<Link
				to='/health/operators'
				className='btn btn-outline btn-secondary'
			>
				voltar
			</Link>
			<div className=' text-4xl mt-10'>{name}</div>
			<div className='divider'></div>
			<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
				<div className='col-span-4 lg:col-span-8 md:col-span-12'>
					<div className='mb-6'>
						{/* info */}
						<div className='card-actions justify-evenly'>
							<h1 className='text-2xl card-title inline'>
								{name}
							</h1>
							<div className='ml-2 mr-1 badge badge-success mt-2'>
								<strong>CNPJ: &nbsp;</strong>
								{cnpj}
							</div>
							<div className='ml-2 mr-1 px-3 card bg-info rounded-2xl text-sm mt-2 inline'>
								<strong>Endereço: &nbsp;</strong>
								{address}
							</div>
						</div>

						{/* contato */}
						<div className='mt-5 text-xl font-semibold contact'>
							Contato
							<div className=' w-full rounded-lg shadow-lg border-2 bg-base-100 mt-3 stats stats-vertical lg:stats-horizontal md:stats-vertical sm:stats-vertical '>
								<div className='stat'>
									<div className='stat-title text-md'>
										Nome
									</div>
									<div className='text-lg stat-value'>
										{contact.name}
									</div>
								</div>
								<div className='stat'>
									<div className='stat-title text-md'>
										Telephone
									</div>
									<div className='text-lg stat-value'>
										{contact.telephone}
									</div>
								</div>
								<div className='stat'>
									<div className='stat-title text-md'>
										email
									</div>
									<div className='text-lg stat-value'>
										{contact.email}
									</div>
								</div>
							</div>
						</div>
						{/* Website */}
						<div className='mt-4 mb-4 card-actions justify-around'>
							<a
								href={website}
								target='_blank'
								rel='noreferrer'
								className='btn btn-outline btn-secondary btn-lg btn-block'
							>
								visitar o website
							</a>
						</div>
						{/* Planos  */}
						<h1 className='text-xl  font-semibold mb-5'>Planos</h1>
						<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3'>
							{planos.map((plano) => (
								<PlanoItem key={plano._id} plano={plano} />
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Operadora
