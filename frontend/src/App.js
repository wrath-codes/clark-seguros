//*                  App
//* ----------------------------------------
// @imports
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Operadoras from './pages/Operadoras'
import Operadora from './pages/Operadora'

//* ----------------------------------------
const App = () => {
	return (
		<Router>
			<div className='flex flex-col justify-between h-screen'>
				<Navbar />
				<main className='container mx-auto px-3 py-5 flex-grow text-center'>
					<Routes>
						<Route
							path='/health/operators'
							element={<Operadoras />}
						/>
						<Route
							path='/health/operators/:id'
							element={<Operadora />}
						/>
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	)
}

export default App
