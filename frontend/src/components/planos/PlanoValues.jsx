//*              Plano Values
//* ----------------------------------------
const PlanoValues = ({ plan }) => {
	return (
		<>
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
		</>
	)
}

export default PlanoValues
