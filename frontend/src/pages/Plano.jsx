//*                  Operadora
//* ----------------------------------------
// @imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// @features
import { getPlan, reset } from '../features/plan/planSlice'
// @components
import Spinner from '../components/layout/Spinner'
import BackButton from '../components/layout/BackButton'
import PlanoEditModal from '../components/planos/PlanoEditModal'
import PlanoDeleteModal from '../components/planos/PlanoDeleteModal'
import PlanoValues from '../components/planos/PlanoValues'
import PlanoInfo from '../components/planos/PlanoInfo'

const Plano = () => {
	const { planId } = useParams()

	const { plan, isSuccess, isError, isLoading, message } = useSelector((state) => state.plan)

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
	}, [dispatch, message, isError, planId])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<div className='card-title text-secondary text-left justify-between'>
				<BackButton url={`/health/operators/${plan.operator?.id}`} />
				<div>
					<PlanoEditModal plan={plan} />
					<PlanoDeleteModal plan={plan} />
				</div>
			</div>

			<div className=' text-4xl font-bold mt-10'>{plan.name}</div>
			<div className='divider'></div>
			<div className='grid grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 mb-8 md:gap-8'>
				<div className='col-span-4 xl:col-span-12 lg:col-span-12 md:col-span-12'>
					<div className='mb-6'>
						<PlanoInfo plan={plan} />
						<PlanoValues plan={plan} />
					</div>
				</div>
			</div>
		</>
	)
}

export default Plano
