//*                  Operadora
//* ----------------------------------------
// @imports
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// @components
import Spinner from '../components/layout/Spinner'
// @images
import seguroAuto from '../components/layout/assets/cotacao-automomel.jpg'
import planoSaude from '../components/layout/assets/plano-saude.jpg'
import planoDental from '../components/layout/assets/plano-dental.jpg'
import seguroViagem from '../components/layout/assets/seguro-viagem.jpg'
import seguroAssinatura from '../components/layout/assets/seguro-assinatura.png'
import seguroResidencial from '../components/layout/assets/seguro-residencial.jpg'
import seguroPessoa from '../components/layout/assets/seguro-pessoa.jpg'
import seguroPortatil from '../components/layout/assets/seguro-portatil.jpg'
import seguroEstagiario from '../components/layout/assets/seguro-estagiario.jpg'
// @icons
import { IoIosPeople } from 'react-icons/io'
import { RiBuilding2Fill } from 'react-icons/ri'
import { GiShakingHands } from 'react-icons/gi'
// @flowbite
import { Carousel } from 'flowbite-react'
const Home = () => {
	return (
		<>
			<Carousel className='rounded-md'>
				{/* Auto */}
				<div className='flex h-full items-center justify-center border-0'>
					<Link to='/products/auto'>
						<div className='text-center align-middle border-0'>
							<img
								className='rounded-md border-0'
								src={seguroAuto}
								alt='Seguro Automovel'
							/>
							<div className='top-1/2 left-1/2'>
								<h5 className='text-xl absolute font-bold top-1/4 left-1/2  text-white -translate-x-1/2 -translate-y-1/2'>
									Seguro Automóvel
								</h5>
								<p className='text-sm absolute top-3/4 left-1/2  text-white  -translate-x-1/2 -translate-y-1/2 '>
									Seguro total contra Roubo, Furto, Colisão, Incêndio e danos
									da natureza.
								</p>
							</div>
						</div>
					</Link>
				</div>
				{/* Saude */}
				<div className='flex h-full items-center justify-center border-0'>
					<Link to='/products/health'>
						<div className='text-center align-middle border-0'>
							<img
								className='rounded-md border-0'
								src={planoSaude}
								alt='Plano Saúde'
							/>
							<h5 className='text-xl absolute font-bold top-1/4 left-1/2  text-white -translate-x-1/2 -translate-y-1/2'>
								Plano de Saúde
							</h5>
							<p className='text-sm absolute top-3/4 left-1/2  text-white  -translate-x-1/2 -translate-y-1/2 '>
								Os melhores planos de saúde do Brasil para cuidar de você e da
								sua família.
							</p>
						</div>
					</Link>
				</div>
				{/* Dental */}
				<div className='flex h-full items-center justify-center border-0'>
					<div className='text-center align-middle border-0'>
						<a href='http://sulamericaodonto.com.br/clarkrio'>
							<img
								className='rounded-md border-0'
								src={planoDental}
								alt='Plano Dental'
							/>
							<h5 className='text-xl absolute font-bold top-1/4 left-1/2  text-white -translate-x-1/2 -translate-y-1/2'>
								Plano Dental
							</h5>
							<p className='text-sm absolute top-3/4 left-1/2  text-white  -translate-x-1/2 -translate-y-1/2 '>
								Seu sorriso é a porta de entrada para novas oportunidades.
							</p>
						</a>
					</div>
				</div>
				{/* Viagem */}
				<div className='flex h-full items-center justify-center border-0'>
					<div className='text-center align-middle border-0'>
						<a href='https://www.goaffinity.com.br/CLARKRI'>
							<img
								className='rounded-md border-0'
								src={seguroViagem}
								alt='Seguro Viagem'
							/>
							<h5 className='text-xl absolute font-bold top-1/4 left-1/2  text-white -translate-x-1/2 -translate-y-1/2'>
								Seguro Viagem
							</h5>
							<p className='text-sm absolute top-3/4 left-1/2  text-white  -translate-x-1/2 -translate-y-1/2 '>
								Com diversas coberturas e serviços, este seguro mantém sua
								tranquilidade e segurança por toda a viagem.
							</p>
						</a>
					</div>
				</div>
				{/* Assinatura */}
				<div className='flex h-full items-center justify-center border-0'>
					<div className='text-center align-middle border-0'>
						<a href='https://assinatura.azulseguros.com.br/?utm_source=T3H9EJ&utm_medium=geradorLinks&utm_campaign=GeradordeLinks_T3H9EJ&utm_content=BLLU_CLARK_SEGUROS&susep=T3H9EJ&origem=Site'>
							<img
								className='rounded-md border-0'
								src={seguroAssinatura}
								alt='Seguro Assinatura'
							/>
							<h5 className='text-xl absolute font-bold top-1/4 left-1/2  text-gray-700 -translate-x-1/2 -translate-y-1/2'>
								Seguro por Assinatura
							</h5>
							<p className='text-sm absolute top-3/4 left-1/2   text-gray-700  -translate-x-1/2 -translate-y-1/2 '>
								Bllu é para você que não tem seguro do carro e seu veículo vale
								até R$60,000.
							</p>
						</a>
					</div>
				</div>
				{/* Residencial */}
				<div className='flex h-full items-center justify-center border-0'>
					<div className='text-center align-middle border-0'>
						<a href='https://servicos.tokiomarine.com.br/massificados/cotador-rd-ot-digital/#/partner/516687cf-244c-42a3-bc92-172ab263ed71'>
							<img
								className='rounded-md border-0'
								src={seguroResidencial}
								alt='Seguro Residencial'
							/>
							<h5 className='text-xl absolute font-bold top-1/4 left-1/2  text-white -translate-x-1/2 -translate-y-1/2'>
								Seguro Residencial
							</h5>
							<p className='text-sm absolute top-3/4 left-1/2  text-white  -translate-x-1/2 -translate-y-1/2 '>
								Cobertura contra incêndio, danos elétricos e assistência 24h.
								Disponível 7 dias por semana.
							</p>
						</a>
					</div>
				</div>
				{/* Pessoa */}
				<div className='flex h-full items-center justify-center border-0'>
					<div className='text-center align-middle border-0'>
						<a href='https://servicos.tokiomarine.com.br/massificados/cotador-rd-ot-digital/#/partner/516687cf-244c-42a3-bc92-172ab263ed71'>
							<img
								className='rounded-md border-0'
								src={seguroPessoa}
								alt='Seguro de Pessoas'
							/>
							<h5 className='text-xl absolute font-bold top-1/4 left-1/2  text-white -translate-x-1/2 -translate-y-1/2'>
								Seguro de Pessoas
							</h5>
							<p className='text-sm absolute top-3/4 left-1/2  text-white  -translate-x-1/2 -translate-y-1/2 '>
								Não precisa morrer para usar o seguro de vida? Coberturas e
								serviços que vão além da morte
							</p>
						</a>
					</div>
				</div>
				{/* Portatil */}
				<div className='flex h-full items-center justify-center border-0'>
					<div className='text-center align-middle border-0'>
						<a href='https://wwws.portoseguro.com.br/vendaonline/equipamentosportateis/home.ns?cod=c0676a86ca324727887d5f0eac89f7fb&utm_source=T3H9EJ&utm_medium=geradorLinks&utm_campaign=GeradordeLinks_LN51YJ&utm_content=CLARK_SEGUROS'>
							<img
								className='rounded-md border-0'
								src={seguroPortatil}
								alt='Seguro Portáteis'
							/>
							<h5 className='text-xl absolute font-bold top-1/4 left-1/2  text-white -translate-x-1/2 -translate-y-1/2'>
								Seguro Portáteis
							</h5>
							<p className='text-sm absolute top-3/4 left-1/2  text-white  -translate-x-1/2 -translate-y-1/2 '>
								Contrate aqui o seguro para seu celular, Tablet ou Notebook.
								Eles ficarão sempre protegidos contra danos e roubo.
							</p>
						</a>
					</div>
				</div>
				{/* Estagiários */}
				<div className='flex h-full items-center justify-center border-0'>
					<div className='text-center align-middle border-0'>
						<a href='https://seguros.portalpasi.com.br/seguro/3'>
							<img
								className='rounded-md border-0'
								src={seguroEstagiario}
								alt='Seguro Estagiários'
							/>
							<h5 className='text-xl absolute font-bold top-1/4 left-1/2  text-gray-700 -translate-x-1/2 -translate-y-1/2'>
								Seguro Estagiários
							</h5>
							<p className='text-2xs absolute top-3/4 left-1/2  text-gray-700 -translate-x-1/2 -translate-y-1/2 '>
								O seguro de Acidentes Pessoais ampara os estagiários e seus
								familiares na ocorrência de eventos adversos com base na lei do
								estágio nº 11.788 de 25 de Setembro de 2008.
							</p>
						</a>
					</div>
				</div>
			</Carousel>
			{/* hero */}
			<div className='hero min-h-screen'>
				<div className='hero-content text-center'>
					<div className='max-w-md'>
						<h1 className='text-5xl font-bold'>Clark Seguros</h1>
						<p className='py-6'>
							Com perfil consultivo e apostando na credibilidade adquirida ao
							longo de seus 25 anos de atuação no mercado segurador, a Clark atua
							de forma a ofertar aos seus clientes uma vasta gama de produtos e
							serviços de acordo com suas particularidades e necessidades
							relacionadas às suas operações.
						</p>
						<button className='btn btn-secondary'>Nossos Produtos</button>
					</div>
				</div>
			</div>
			<div className='divider mb-40'></div>
			{/* Tipos de Seguros */}
			<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
				<div className='col-span-4 lg:col-span-8 md:col-span-12'>
					<div className='mb-6'>
						<div className='justify-evenly'>
							<div className='inline'>
								<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3'>
									<div className='card-actions flex-col items-center  justify-around '>
										<IoIosPeople
											size={100}
											className='text-secondary transform transition duration-500 hover:scale-110'
										/>
										<div className='card-title'>Seguros Pessoais</div>
										<p className='card-body'>
											A equipe de seguros pessoais da Clark disponibiliza
											as melhores condições do mercado para proteção de
											seu patrimônio e para o bem estar de sua família.
										</p>
									</div>
									<div className='card-actions flex-col items-center justify-around '>
										<RiBuilding2Fill
											size={100}
											className='text-secondary transform transition duration-500 hover:scale-110'
										/>
										<div className='card-title'>Seguros Empresariais</div>
										<p className='card-body'>
											Oferecemos aos nossos clientes diversos serviços e
											soluções, desenvolvidos de acordo com as
											necessidades específicas de suas empresas.
										</p>
									</div>
									<div className='card-actions flex-col items-center  justify-around '>
										<GiShakingHands
											size={100}
											className='text-secondary transform transition duration-500 hover:scale-110'
										/>
										<div className='card-title'>Seguros Massificados</div>
										<p className='card-body'>
											A Clark desenvolve projetos cujo objetivo é a
											oferta de seguros para pessoas físicas,
											comercializados de forma massificada, através de
											projetos estruturados com varejistas, empresas de
											utilities, e-commerce
										</p>
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

export default Home
