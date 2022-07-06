//*            Plano Edit
//* ----------------------------------------
// @imports
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// @features
import { updatePlan, getPlan } from '../../features/plan/planSlice'
// @icons
import { MdEdit, MdAttachMoney } from 'react-icons/md'
import { GrTextAlignLeft } from 'react-icons/gr'
// @flowbite
import { TextInput, Select } from 'flowbite-react'

const PlanoEditModal = ({ plan }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

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
		dispatch(getPlan(plan._id))
	}

	const onChange = (e) => {
		setPlanData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	return (
		<>
			<label
				className='btn btn-warning btn-md mb-10 mr-2 transform transition duration-200 hover:scale-105'
				htmlFor='editPlanModal'
				onClick={getPlanData}
			>
				<MdEdit />
			</label>

			{/* Edit Modal */}
			<input type='checkbox' id='editPlanModal' className='modal-toggle' />
			<label htmlFor='editPlanModal' className='modal cursor-pointer'>
				<label className='modal-box relative' htmlFor=''>
					<h3 className='text-lg font-bold text-center text-base-content'>Plano</h3>

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
		</>
	)
}

export default PlanoEditModal
