//*                  Login
//* ----------------------------------------
import { Link } from 'react-router-dom'

const OperadoraLogin = ({ login, url }) => {
	return (
		<>
			{!(login?.username === 'username') ? (
				<div className='mt-5 text-xl font-semibold contact mb-10'>
					Login do Site
					<div className=' w-full rounded-lg shadow-lg border-2 bg-base-100 mt-3 stats stats-vertical lg:stats-horizontal md:stats-vertical sm:stats-vertical '>
						<div className='stat'>
							<div className='stat-title text-md'>Username</div>
							<div className='text-lg stat-value'>{login?.username}</div>
						</div>
						<div className='stat'>
							<div className='stat-title text-md'>Senha</div>
							<div className='text-lg stat-value'>{login?.password}</div>
						</div>
					</div>
				</div>
			) : (
				<Link
					to={url}
					className='btn btn-secondary text-base-100 btn-lg justify-around btn-block'
				>
					Adicionar login
				</Link>
			)}
		</>
	)
}

export default OperadoraLogin
