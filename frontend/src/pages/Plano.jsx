//*                  Operadora
//* ----------------------------------------
// @imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// @features
import { getPlan, deletePlan, updatePlan, reset } from '../features/plan/planSlice'
// @components
import Spinner from '../components/layout/Spinner'
import BackButton from '../components/layout/BackButton'
// @icons
import { MdEdit, MdAttachMoney } from 'react-icons/md'
import { HiTrash } from 'react-icons/hi'
import { GrTextAlignLeft } from 'react-icons/gr'
// @flowbite
import { TextInput, Select } from 'flowbite-react'

const Plano = () => {
	const { planId, operatorId } = useParams()

	const { plan, isSuccess, isError, isLoading, message } = useSelector((state) => state.plan)

	// get plan Data
	const [planData, setPlanData] = useState({
		name: '',
		ansRegister: '',
		reach: '',
		from0To18: 0,
		from19To23: 0,
		from24To28: 0,
		from29To33: 0,
		from34To38: 0,
		from39To43: 0,
		from44To48: 0,
		from49To53: 0,
		from54To58: 0,
		from59AndAbove: 0
	})
	const {
		name,
		ansRegister,
		reach,
		from0To18,
		from19To23,
		from24To28,
		from29To33,
		from34To38,
		from39To43,
		from44To48,
		from49To53,
		from54To58,
		from59AndAbove
	} = planData

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset())
			}
		}
	}, [dispatch, isSuccess])

	// get operator data
	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
		dispatch(getPlan(planId))
		setPlanData({
			name: plan.name,
			ansRegister: plan.ansRegister,
			reach: plan.reach,
			from0To18: plan.ageRangeValue?.from0To18,
			from19To23: plan.ageRangeValue?.from19To23,
			from24To28: plan.ageRangeValue?.from24To28,
			from29To33: plan.ageRangeValue?.from29To33,
			from34To38: plan.ageRangeValue?.from34To38,
			from39To43: plan.ageRangeValue?.from39To43,
			from44To48: plan.ageRangeValue?.from44To48,
			from49To53: plan.ageRangeValue?.from49To53,
			from54To58: plan.ageRangeValue?.from54To58,
			from59AndAbove: plan.ageRangeValue?.from59AndAbove
		})
	}, [dispatch, planId, isError, message, plan.name, plan.ansRegister, plan.reach])

	const getPlanData = (e) => {
		setPlanData({
			name: plan.name,
			ansRegister: plan.ansRegister,
			reach: plan.reach,
			from0To18: plan.ageRangeValue?.from0To18,
			from19To23: plan.ageRangeValue?.from19To23,
			from24To28: plan.ageRangeValue?.from24To28,
			from29To33: plan.ageRangeValue?.from29To33,
			from34To38: plan.ageRangeValue?.from34To38,
			from39To43: plan.ageRangeValue?.from39To43,
			from44To48: plan.ageRangeValue?.from44To48,
			from49To53: plan.ageRangeValue?.from49To53,
			from54To58: plan.ageRangeValue?.from54To58,
			from59AndAbove: plan.ageRangeValue?.from59AndAbove
		})
	}

	const onPlanEdit = (e) => {
		e.preventDefault()
		const sendData = {
			name: name,
			ansRegister: ansRegister,
			reach: reach,
			ageRangeValue: {
				from0To18: Number(from0To18),
				from19To23: Number(from19To23),
				from24To28: Number(from24To28),
				from29To33: Number(from29To33),
				from34To38: Number(from34To38),
				from39To43: Number(from39To43),
				from44To48: Number(from44To48),
				from49To53: Number(from49To53),
				from54To58: Number(from54To58),
				from59AndAbove: Number(from59AndAbove)
			}
		}
		dispatch(updatePlan(sendData))
		window.location.reload()
	}

	const onDelete = (e) => {
		const opertatorToRoute = plan.operator?.id
		dispatch(deletePlan(planId))
		navigate(`/health/operators/${opertatorToRoute}`)
		dispatch(reset())
	}

	const onChange = (e) => {
		setPlanData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<div className='card-title text-secondary text-left justify-between'>
				<BackButton url={`/health/operators/${plan.operator?.id}`} />
				<div>
					<label
						className='btn btn-warning btn-md mb-10 mr-2 transform transition duration-200 hover:scale-105'
						htmlFor='editPlanModal'
						onClick={getPlanData}
					>
						<MdEdit />
					</label>
					<label
						className='btn btn-error btn-md mb-10 transform transition duration-200 hover:scale-105'
						htmlFor='deleteModal'
					>
						<HiTrash />
					</label>
				</div>
			</div>

			{/* Modals */}
			{/* Edit Modal */}
			<input type='checkbox' id='editPlanModal' className='modal-toggle' />
			<label htmlFor='editPlanModal' className='modal cursor-pointer'>
				<label className='modal-box relative' htmlFor=''>
					<h3 className='text-lg font-bold'>Plano</h3>
					<div className='mt-5 items-center'>
						<form onSubmit={onPlanEdit} className='flex flex-col gap-3'>
							<div>
								<TextInput
									id='name'
									type='name'
									placeholder='Nome do Contato'
									name='name'
									value={name}
									onChange={onChange}
									required={true}
									icon={GrTextAlignLeft}
									addon='Nome'
								/>
							</div>
							<div>
								<TextInput
									id='ansRegister'
									type='ansRegister'
									placeholder='Registro ANS XXXXXXXXX'
									name='ansRegister'
									value={ansRegister}
									onChange={onChange}
									required={true}
									icon={GrTextAlignLeft}
									addon='Registro ANS'
								/>
							</div>

							<div id='select'>
								<Select
									id='reach'
									name='reach'
									onChange={onChange}
									addon='Abrangência'
									required={true}
								>
									<option disabled value='Grupo de Municipios'>
										Abrangência
									</option>
									<option value='Grupo de Municipios'>
										Grupo de Municipios
									</option>
									<option value='Estadual'>Estadual</option>
									<option value='Grupo de Estados'>Grupo de Estados</option>
									<option value='Nacional'>Nacional</option>
								</Select>
							</div>

							<div>
								<TextInput
									id='from0To18'
									type='number'
									placeholder='R$'
									name='from0To18'
									value={from0To18}
									onChange={onChange}
									required={true}
									icon={MdAttachMoney}
									addon='0a18'
								/>
							</div>

							<div>
								<TextInput
									id='from19To23'
									type='number'
									placeholder='R$'
									name='from19To23'
									value={from19To23}
									onChange={onChange}
									required={true}
									icon={MdAttachMoney}
									addon='19a23'
								/>
							</div>

							<div>
								<TextInput
									id='from24To28'
									type='number'
									placeholder='R$'
									name='from24To28'
									value={from24To28}
									onChange={onChange}
									required={true}
									icon={MdAttachMoney}
									addon='24a28'
								/>
							</div>
							<div>
								<TextInput
									id='from29To33'
									type='number'
									placeholder='R$'
									name='from29To33'
									value={from29To33}
									onChange={onChange}
									required={true}
									icon={MdAttachMoney}
									addon='29a33'
								/>
							</div>

							<div>
								<TextInput
									id='from34To38'
									type='number'
									placeholder='R$'
									name='from34To38'
									value={from34To38}
									onChange={onChange}
									required={true}
									icon={MdAttachMoney}
									addon='34a38'
								/>
							</div>

							<div>
								<TextInput
									id='from39To43'
									type='number'
									placeholder='R$'
									name='from39To43'
									value={from39To43}
									onChange={onChange}
									required={true}
									icon={MdAttachMoney}
									addon='39a43'
								/>
							</div>

							<div>
								<TextInput
									id='from44To48'
									type='number'
									placeholder='R$'
									name='from44To48'
									value={from44To48}
									onChange={onChange}
									required={true}
									icon={MdAttachMoney}
									addon='44a48'
								/>
							</div>

							<div>
								<TextInput
									id='from49To53'
									type='number'
									placeholder='R$'
									name='from49To53'
									value={from49To53}
									onChange={onChange}
									required={true}
									icon={MdAttachMoney}
									addon='49a53'
								/>
							</div>

							<div>
								<TextInput
									id='from54To58'
									type='number'
									placeholder='R$'
									name='from54To58'
									value={from54To58}
									onChange={onChange}
									required={true}
									icon={MdAttachMoney}
									addon='54a58'
								/>
							</div>

							<div>
								<TextInput
									id='from59AndAbove'
									type='number'
									placeholder='R$'
									name='from59AndAbove'
									value={from59AndAbove}
									onChange={onChange}
									required={true}
									icon={MdAttachMoney}
									addon='59+'
								/>
							</div>

							<button
								type='submit'
								className='btn btn-outline btn-success btn-sm mb-2 '
							>
								Editar
							</button>
						</form>
					</div>
				</label>
			</label>

			{/* delete modal */}
			<input type='checkbox' id='deleteModal' className='modal-toggle' />
			<label htmlFor='deleteModal' className='modal cursor-pointer'>
				<label className='modal-box relative' htmlFor=''>
					<h3 className='text-lg font-bold'>
						Tem certeza que quer deletar esta Operadora?
					</h3>
					<div className='mt-5 items-center'>
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

			<div className=' text-4xl font-bold mt-10'>{plan.name}</div>
			<div className='divider'></div>
			<div className='grid grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 mb-8 md:gap-8'>
				<div className='col-span-4 xl:col-span-12 lg:col-span-12 md:col-span-12'>
					<div className='mb-6'>
						{/* info */}
						<div className='card-actions justify-evenly mb-5 align'>
							<h1 className='text-base card-title inline m-1'>
								<strong>Operadora:</strong> {plan.operator?.name}
							</h1>
							<div className='ml-2 mr-1 badge badge-success mt-2'>
								<strong>CNPJ: &nbsp;</strong>
								{plan.operator?.cnpj}
							</div>
							<div className='ml-2 mr-1 px-3 card bg-info rounded-2xl text-sm mt-2 inline'>
								<strong>Endereço: &nbsp;</strong>
								{plan.operator?.address?.street},{' '}
								{plan.operator?.address?.streetNumber},{' '}
								{plan.operator?.address?.complement
									? plan.operator?.address?.complement + ', '
									: ''}
								{plan.operator?.address?.neighborhood},{' '}
								{plan.operator?.address?.city} -{' '}
								{plan.operator?.address?.state}, {plan.operator?.address?.cep},{' '}
								{plan.operator?.address?.country}
							</div>
						</div>

						<div className=' w-full rounded-lg shadow-lg border-2 bg-base-100 mt-3 stats stats-vertical lg:stats-horizontal md:stats-vertical sm:stats-vertical '>
							{plan.kind === 'health' && (
								<div className='stat'>
									<div className='stat-title text-md'>Tipo</div>
									<div className='text-lg stat-value'>Saúde</div>
								</div>
							)}

							<div className='stat'>
								<div className='stat-title text-md'>Registro ANS</div>
								<div className='text-lg stat-value'>{plan.ansRegister}</div>
							</div>

							<div className='stat'>
								<div className='stat-title text-md'>Abrangência</div>
								<div className='text-lg stat-value'>{plan.reach}</div>
							</div>
						</div>

						<div className='mt-5 text-xl font-semibold contact mb-2'>
							Preços{' '}
							<div className=' w-full rounded-lg shadow-lg border-2 bg-base-100 mt-3 stats stats-vertical xl:stats-horizontal lg:stats-horizontal md:stats-vertical sm:stats-vertical '>
								<div className='stat'>
									<div className='stat-title text-md'>0 - 18</div>
									<div className='text-lg stat-value'>
										R$ {plan.ageRangeValue?.from0To18}
									</div>
								</div>

								<div className='stat'>
									<div className='stat-title text-md'>19 - 23</div>
									<div className='text-lg stat-value'>
										R$ {plan.ageRangeValue?.from19To23}
									</div>
								</div>

								<div className='stat'>
									<div className='stat-title text-md'>24 - 28</div>
									<div className='text-lg stat-value'>
										R$ {plan.ageRangeValue?.from24To28}
									</div>
								</div>

								<div className='stat'>
									<div className='stat-title text-md'>29 - 33</div>
									<div className='text-lg stat-value'>
										R$ {plan.ageRangeValue?.from29To33}
									</div>
								</div>
								<div className='stat'>
									<div className='stat-title text-md'>34 - 38</div>
									<div className='text-lg stat-value'>
										R$ {plan.ageRangeValue?.from34To38}
									</div>
								</div>
							</div>
							<div className=' w-full rounded-lg shadow-lg border-2 bg-base-100 mt-3 stats stats-vertical xl:stats-horizontal lg:stats-horizontal md:stats-vertical sm:stats-vertical '>
								<div className='stat'>
									<div className='stat-title text-md'>39 - 43</div>
									<div className='text-lg stat-value'>
										R$ {plan.ageRangeValue?.from39To43}
									</div>
								</div>
								<div className='stat'>
									<div className='stat-title text-md'>44 - 48</div>
									<div className='text-lg stat-value'>
										R$ {plan.ageRangeValue?.from44To48}
									</div>
								</div>
								<div className='stat'>
									<div className='stat-title text-md'>49 - 53</div>
									<div className='text-lg stat-value'>
										R$ {plan.ageRangeValue?.from49To53}
									</div>
								</div>
								<div className='stat'>
									<div className='stat-title text-md'>54 - 58</div>
									<div className='text-lg stat-value'>
										R$ {plan.ageRangeValue?.from54To58}
									</div>
								</div>
								<div className='stat'>
									<div className='stat-title text-md'>59 +</div>
									<div className='text-lg stat-value'>
										R$ {plan.ageRangeValue?.from59AndAbove}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Plano
