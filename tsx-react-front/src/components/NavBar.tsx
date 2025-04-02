import './css/NavBar.css';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { logoutUser } from '../redux/userSlice';
import { useEffect, useState } from 'react';
function NavBar() {
	const [loggedIn, setLoggedIn] = useState(false);
	const { user } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
	}, [user]);

	const handleLogoutButton = () => {
		dispatch(logoutUser());
		navigate('/login');
	};

	return (
		<>
			<div className='navbar'>
				<div className='navbar-left'>
					<Link to={'/'} className='navbar-logo'>
						<img className='logo' src={logo} alt='logo' />
					</Link>
				</div>
				<div className='navbar-right'>
					{loggedIn && (
						<Link to={'/favorites'} className='navbar-button'>
							FAVORITES
						</Link>
					)}
					{!loggedIn && (
						<Link to={'/login'} className='navbar-button'>
							LOGIN
						</Link>
					)}
					{loggedIn && (
						<button className='navbar-button' onClick={handleLogoutButton}>
							LOG OUT
						</button>
					)}
				</div>
			</div>
		</>
	);
}
export default NavBar;
