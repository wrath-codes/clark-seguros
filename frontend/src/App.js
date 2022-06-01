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
