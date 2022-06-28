//*                  Cliente
//* ----------------------------------------
// @imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// @features
import {
	deleteEmployer,
	getEmployer,
	getEmployers,
	addContactToEmployer,
	reset,
	updateContactToEmployer
} from '../features/employer/employerSlice'
import { getPlansWithId } from '../features/plan/planSlice'
import { getContract, getContracts } from '../features/contract/contractSlice'
import { createEmployee } from '../features/employee/employeeSlice'
// @components
import Spinner from '../components/layout/Spinner'
import BackButton from '../components/layout/BackButton'
import EditButton from '../components/layout/EditButton'
import FuncionarioItem from '../components/fucionarios/FuncionarioItem'
import FuncionarioAddModal from '../components/fucionarios/FuncionarioAddModal'
import ClienteDeleteModal from '../components/clientes/ClienteDeleteModal'
import ClienteContact from '../components/clientes/ClienteContact'
import Info from '../components/layout/Info'
// @flowbite
import { TextInput, Select, Accordion, Label } from 'flowbite-react'
// @icons
import { FaRoad } from 'react-icons/fa'
import { MdEdit, MdEmail, MdOutlineExpandMore } from 'react-icons/md'
import { HiTrash, HiIdentification, HiLocationMarker } from 'react-icons/hi'
import { GrTextAlignLeft } from 'react-icons/gr'
import { BsTelephoneFill, BsCalendar3 } from 'react-icons/bs'
import { AiOutlineNumber } from 'react-icons/ai'
import { IoIosAdd } from 'react-icons/io'

const Cliente = () => {
	// @reducers
	const { employer, isSuccess, isError, isLoading, message } = useSelector(
		(state) => state.employer
	)
	const { plans } = useSelector((state) => state.plan)
	const { contract, contracts } = useSelector((state) => state.contract)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { employerId } = useParams()

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset())
			}
		}
	}, [dispatch, isSuccess, employerId])
	// get operator data
	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
		dispatch(getEmployer(employerId))
	}, [dispatch, employerId, isError, message])

	const onDelete = (e) => {
		dispatch(deleteEmployer())
		navigate('/health/employers')
		dispatch(getEmployers())
		dispatch(reset())
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<div className='card-title text-secondary text-left justify-between'>
				<BackButton url='/health/employers' />
				<div>
					<EditButton url={`/health/employers/${employer._id}/edit`} />
					<ClienteDeleteModal />
				</div>
			</div>

			<div className=' text-4xl font-bold mt-10'>{employer.name}</div>
			<div className='divider'></div>
			<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
				<div className='col-span-4 lg:col-span-8 md:col-span-12'>
					<div className='mb-6'>
						{/* Employer Info */}
						<Info infoTarget={employer} />

						{/* contato */}
						<ClienteContact employer={employer} />

						{/* Funcionários */}
						<h1 className='text-3xl font-semibold my-5'>Contratos</h1>
						<Accordion
							flush={true}
							className='grid grid-cols-1 gap-0.5 mx-10'
							arrowIcon={MdOutlineExpandMore}
						>
							{employer.contracts?.map((contract) => (
								<Accordion.Panel key={contract._id}>
									<Accordion.Title>{contract.name}</Accordion.Title>
									<Accordion.Content>
										<FuncionarioAddModal
											cliente={employer}
											contrato={contract}
										/>

										{employer.employees
											?.filter(
												(employee) =>
													employee.contract?._id === contract._id
											)
											.map((employee) => (
												<FuncionarioItem
													key={employee._id}
													funcionario={employee}
												/>
											))}
									</Accordion.Content>
								</Accordion.Panel>
							))}
						</Accordion>
					</div>
				</div>
			</div>
		</>
	)
}

export default Cliente
