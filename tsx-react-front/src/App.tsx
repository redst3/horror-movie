import './pages/css/App.css';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import FavoritePage from './pages/FavoritePage';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<>
			<NavBar />
			<ToastContainer />
			<main className='app'>
				<Routes>
					<Route path={'/'} element={<HomePage />} />
					<Route path={'/favorites'} element={<FavoritePage />} />
					<Route path={'/login'} element={<LoginPage />} />
					<Route path={'/Register'} element={<RegisterPage />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
