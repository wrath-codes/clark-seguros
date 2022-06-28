//*                  Info
//* ----------------------------------------
const Info = ({ infoTarget }) => {
	return (
		<>
			<div className='card-actions justify-evenly mb-5'>
				<h1 className='text-2xl card-title inline'>{infoTarget.name}</h1>
				<div className='ml-2 mr-1 badge badge-success mt-2'>
					<strong>CNPJ: &nbsp;</strong>
					{infoTarget.cnpj}
				</div>
				<div className='ml-2 mr-1 px-3 card bg-info rounded-2xl text-sm mt-2 inline'>
					<strong>Endereço: &nbsp;</strong>
					{infoTarget.address?.street}, {infoTarget.address?.streetNumber},{' '}
					{infoTarget.address?.complement
						? infoTarget.address?.complement + ', '
						: ''}
					{infoTarget.address?.neighborhood}, {infoTarget.address?.city} -{' '}
					{infoTarget.address?.state}, {infoTarget.address?.cep},{' '}
					{infoTarget.address?.country}
				</div>
			</div>
		</>
	)
}

export default Info
