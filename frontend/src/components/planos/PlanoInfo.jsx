//*             Plano Info
//* ----------------------------------------

const PlanoInfo = ({ plan }) => {
	return (
		<>
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
					{plan.operator?.address?.street}, {plan.operator?.address?.streetNumber},{' '}
					{plan.operator?.address?.complement
						? plan.operator?.address?.complement + ', '
						: ''}
					{plan.operator?.address?.neighborhood}, {plan.operator?.address?.city} -{' '}
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
		</>
	)
}

export default PlanoInfo
