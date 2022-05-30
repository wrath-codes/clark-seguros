//*                  Footer
//* ----------------------------------------

const Footer = () => {
	return (
		<footer>
			<div className='footer pb-5 pt-5 bg-secondary text-base-100 shadow-xl footer-center '>
				<div className='grid grid-cols-1 text-center py-3'>
					<p>
						2022 - Copyright &copy; Clark Seguros&reg; | Desenvolvido por{' '}
						<span>
							<a className='font-semibold' href='https://github.com/rvaz-dev'>
								.raph
							</a>
						</span>
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
