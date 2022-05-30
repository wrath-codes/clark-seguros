//*                  App
//* ----------------------------------------
// @imports
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// @components
import NavbarClark from './components/layout/Navbar'
import Footer from './components/layout/Footer'
// @pages
import Operadoras from './pages/Operadoras'
import Operadora from './pages/Operadora'
import Home from './pages/Home'

//* ----------------------------------------

const App = () => {
	return (
		<>
			<Router>
				<div className='flex flex-col justify-between h-screen'>
					<NavbarClark />
					<main className='container mx-auto px-3 py-5 flex-grow text-center mt-16'>
						<Routes>
							<Route exact path='/' element={<Home />} />
							<Route path='/health/operators' element={<Operadoras />} />
							<Route
								path='/health/operators/:operatorId'
								element={<Operadora />}
							/>
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
