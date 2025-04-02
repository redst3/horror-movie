import { useEffect, useState } from 'react';
import './css/LoginPage.css';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { loginUser, logoutUser } from '../redux/userSlice';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch<AppDispatch>();
	const { user, loading, error, errorMessage } = useSelector(
		(state: RootState) => state.user
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (user && user.accessToken) {
			const tokenInfo = jwtDecode(user.accessToken);
			if (tokenInfo.exp) {
				const isValid = tokenInfo.exp * 1000 > Date.now();
				if (isValid) {
					navigate('/');
					toast.success('Welcome, ' + user.name + ' !', {
						theme: 'dark',
						position: 'bottom-center',
						autoClose: 1000,
					});
				} else {
					dispatch(logoutUser());
				}
			}
		}
	}, [user, navigate, dispatch]);

	const handleLogin = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		if (password.length === 0 || username.length === 0) {
			toast.error('Missing fields!', {
				theme: 'dark',
				position: 'bottom-center',
				autoClose: 1000,
			});
			return;
		}

		const userCredentials = {
			name: username,
			password: password,
		};
		try {
			await dispatch(loginUser(userCredentials)).unwrap();
			navigate('/');
		} catch {
			toast.error('Login was unsuccessful!', {
				theme: 'dark',
				position: 'bottom-center',
				autoClose: 1000,
			});
		}
	};

	return (
		<div className='login-page'>
			<div className='login-form'>
				<h1 className='login-form-title'>Login form</h1>
				<div className='login-fields'>
					<form>
						<input
							className='login-form-input'
							type='text'
							placeholder='Username'
							name='username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							className='login-form-input'
							type='password'
							placeholder='Password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							className='login-form-button'
							type='submit'
							onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
								handleLogin(e)
							}
						>
							Login
						</button>
						{error && <p className='error-message'>{errorMessage}</p>}
						{loading && <div className='spinner'></div>}
					</form>
					<Link to={'/register'} className='login-form-register'>
						Create a new user?
					</Link>
				</div>
			</div>
		</div>
	);
}
export default LoginPage;
