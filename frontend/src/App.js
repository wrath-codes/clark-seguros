//*                  App
//* ----------------------------------------
// @imports
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// @components
import NavbarClark from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PrivateRoute from './components/PrivateRoute'
// @pages
import Operadoras from './pages/Operadoras'
import Operadora from './pages/Operadora'
import Home from './pages/Home'
import Login from './pages/Login'
import AdicionarOperadora from './pages/AdicionarOperadora'
import EditarOperadora from './pages/EditarOperadora'
import Plano from './pages/Plano'
import Clientes from './pages/Clientes'
import Cliente from './pages/Cliente'
import AdicionarCliente from './pages/AdicionarCliente'
import EditarCliente from './pages/EditarCliente'
import Funcionario from './pages/Funcionario'

//* ----------------------------------------

const App = () => {
	return (
		<>
			<Router>
				<div className='flex flex-col justify-between h-screen'>
					<NavbarClark />
					<main className='container relative mx-auto px-3 py-5 flex-1  p-5 text-center mt-10 h-max'>
						<Routes>
							<Route exact path='/' element={<Home />} />

							<Route path='/health/operators' element={<PrivateRoute />}>
								<Route path='/health/operators' element={<Operadoras />} />
							</Route>
							<Route
								path='/health/operators/add-operator'
								element={<PrivateRoute />}
							>
								<Route
									path='/health/operators/add-operator'
									element={<AdicionarOperadora />}
								/>
							</Route>
							<Route
								path='/health/operators/:operatorId'
								element={<PrivateRoute />}
							>
								<Route
									path='/health/operators/:operatorId'
									element={<Operadora />}
								/>
							</Route>
							<Route
								path='/health/operators/:operatorId/edit'
								element={<PrivateRoute />}
							>
								<Route
									path='/health/operators/:operatorId/edit'
									element={<EditarOperadora />}
								/>
							</Route>
							<Route
								path='/health/operators/:operatorId/plans/:planId'
								element={<PrivateRoute />}
							>
								<Route
									path='/health/operators/:operatorId/plans/:planId'
									element={<Plano />}
								/>
							</Route>

							<Route path='/health/employers' element={<PrivateRoute />}>
								<Route path='/health/employers' element={<Clientes />} />
							</Route>

							<Route
								path='/health/employers/:employerId'
								element={<PrivateRoute />}
							>
								<Route
									path='/health/employers/:employerId'
									element={<Cliente />}
								/>
							</Route>
							<Route
								path='/health/employers/add-employer'
								element={<PrivateRoute />}
							>
								<Route
									path='/health/employers/add-employer'
									element={<AdicionarCliente />}
								/>
							</Route>

							<Route
								path='/health/employers/:employerId/edit'
								element={<PrivateRoute />}
							>
								<Route
									path='/health/employers/:employerId/edit'
									element={<EditarCliente />}
								/>
							</Route>
							<Route
								path='/health/employees/:planCardId'
								element={<PrivateRoute />}
							>
								<Route
									path='/health/employees/:planCardId'
									element={<Funcionario />}
								/>
							</Route>

							<Route path='/login' element={<Login />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</Router>
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={'dark'}
			/>
		</>
	)
}

//* ----------------------------------------

export default App
