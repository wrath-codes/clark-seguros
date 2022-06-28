//*               Add Plan Modal
//* ----------------------------------------
// @imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// @features
import { createPlan } from '../../features/plan/planSlice'
import { getOperator } from '../../features/operator/operatorSlice'
// @flowbite
import { TextInput, Select } from 'flowbite-react'
// @icons
import { GrTextAlignLeft } from 'react-icons/gr'

const PlanoAddModal = ({ operatorId }) => {
	const dispatch = useDispatch()
	// set planData
	const [planData, setPlanData] = useState({
		name: '',
		ansRegister: '',
		kind: 'health',
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

	const onPlanChange = (e) => {
		setPlanData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const onPlanAdd = (e) => {
		e.preventDefault()
		setPlanData((prevState) => ({
			...prevState,
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
		}))
		console.log(planData)
		dispatch(createPlan(planData))
		dispatch(getOperator(operatorId))
		window.location.reload()
	}

	return (
		<>
			<label
				htmlFor='addPlanModal'
				className='btn btn-outline btn-secondary btn-md mb-2 justify-around transform transition duration-200 hover:scale-105'
			>
				adicionar plano
			</label>

			{/* add plan modal */}
			<input type='checkbox' id='addPlanModal' className='modal-toggle' />
			<label htmlFor='addPlanModal' className='modal cursor-pointer'>
				<label className='modal-box relative' htmlFor=''>
					<h3 className='text-lg font-bold'>Contato</h3>
					<div className='mt-5 items-center'>
						<form onSubmit={onPlanAdd} className='flex flex-col gap-3'>
							<div>
								<TextInput
									id='name'
									type='name'
									placeholder='Nome do Plano'
									name='name'
									value={name}
									onChange={onPlanChange}
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
									onChange={onPlanChange}
									required={true}
									icon={GrTextAlignLeft}
									addon='ANS'
								/>
							</div>
							<div id='select'>
								<Select
									id='reach'
									name='reach'
									onChange={onPlanChange}
									addon='Abrangência'
									required={true}
								>
									<option disabled value='Grupo de Municipios'>
										Grupo de Municipios
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
									type='from0To18'
									placeholder='Preço de 0 a 18'
									name='from0To18'
									value={from0To18}
									onChange={onPlanChange}
									required={true}
									icon={GrTextAlignLeft}
									addon='0a18'
								/>
							</div>
							<div>
								<TextInput
									id='from19To23'
									type='from19To23'
									placeholder='Preço de 19 a 23'
									name='from19To23'
									value={from19To23}
									onChange={onPlanChange}
									required={true}
									icon={GrTextAlignLeft}
									addon='19a23'
								/>
							</div>
							<div>
								<TextInput
									id='from24To28'
									type='from24To28'
									placeholder='Preço de 24 a 28'
									name='from24To28'
									value={from24To28}
									onChange={onPlanChange}
									required={true}
									icon={GrTextAlignLeft}
									addon='24a28'
								/>
							</div>
							<div>
								<TextInput
									id='from29To33'
									type='from29To33'
									placeholder='Preço de 29 a 33'
									name='from29To33'
									value={from29To33}
									onChange={onPlanChange}
									required={true}
									icon={GrTextAlignLeft}
									addon='29a33'
								/>
							</div>
							<div>
								<TextInput
									id='from34To38'
									type='from34To38'
									placeholder='Preço de 34 a 38'
									name='from34To38'
									value={from34To38}
									onChange={onPlanChange}
									required={true}
									icon={GrTextAlignLeft}
									addon='34a38'
								/>
							</div>
							<div>
								<TextInput
									id='from39To43'
									type='from39To43'
									placeholder='Preço de 39 a 43'
									name='from39To43'
									value={from39To43}
									onChange={onPlanChange}
									required={true}
									icon={GrTextAlignLeft}
									addon='39a43'
								/>
							</div>
							<div>
								<TextInput
									id='from44To48'
									type='from44To48'
									placeholder='Preço de 44 a 48'
									name='from44To48'
									value={from44To48}
									onChange={onPlanChange}
									required={true}
									icon={GrTextAlignLeft}
									addon='44a48'
								/>
							</div>
							<div>
								<TextInput
									id='from49To53'
									type='from49To53'
									placeholder='Preço de 49 a 53'
									name='from49To53'
									value={from49To53}
									onChange={onPlanChange}
									required={true}
									icon={GrTextAlignLeft}
									addon='49a53'
								/>
							</div>
							<div>
								<TextInput
									id='from54To58'
									type='from54To58'
									placeholder='Preço de 54 a 58'
									name='from54To58'
									value={from54To58}
									onChange={onPlanChange}
									required={true}
									icon={GrTextAlignLeft}
									addon='54a58'
								/>
							</div>
							<div>
								<TextInput
									id='from59AndAbove'
									type='from59AndAbove'
									placeholder='Preço de 59+'
									name='from59AndAbove'
									value={from59AndAbove}
									onChange={onPlanChange}
									required={true}
									icon={GrTextAlignLeft}
									addon='59+'
								/>
							</div>

							<button
								type='submit'
								className='btn btn-outline btn-success btn-sm mb-5 '
							>
								Adicionar
							</button>
						</form>
					</div>
				</label>
			</label>
		</>
	)
}

export default PlanoAddModal
