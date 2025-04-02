import React, { useEffect, useState } from 'react';
import './css/LoginPage.css';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/userSlice';

function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { loading } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (password.length > 8)
			document.getElementById('validation-length')?.classList.add('valid');
		else
			document.getElementById('validation-length')?.classList.remove('valid');
		if (password.match(/[0-9]/g))
			document.getElementById('validation-number')?.classList.add('valid');
		else
			document.getElementById('validation-number')?.classList.remove('valid');
		if (password === passwordRepeat && password.length > 0)
			document.getElementById('validation-repeat')?.classList.add('valid');
		else
			document.getElementById('validation-repeat')?.classList.remove('valid');
	}, [password, passwordRepeat]);

	const handleRegisterButton = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		if (
			username.length > 1 &&
			password.length > 8 &&
			password.match(/[0-9]/g) &&
			password === passwordRepeat
		) {
			try {
				const userCredentials = {
					name: username,
					password: password,
				};
				await dispatch(registerUser(userCredentials)).unwrap();
				toast.success('User registered succesfully!', {
					theme: 'dark',
					position: 'bottom-center',
					autoClose: 2000,
				});
				navigate('/login');
			} catch (error) {
				console.log(error);
				toast.error('User already exists!', {
					theme: 'dark',
					position: 'bottom-center',
					autoClose: 1000,
				});
			}
		} else {
			toast.error('Something is missing!', {
				theme: 'dark',
				position: 'bottom-center',
				autoClose: 1000,
			});
		}
	};

	return (
		<div className='login-page'>
			<div className='login-form'>
				<h1 className='login-form-title'>Register form</h1>
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
						<input
							className='login-form-input'
							type='password'
							placeholder='Repeat Password'
							name='password'
							value={passwordRepeat}
							onChange={(e) => setPasswordRepeat(e.target.value)}
						/>
						<div className='password-info '>
							<p id='validation-number'>- Your password must have a number!</p>
							<p id='validation-length'>- Minimum length is 8 characters!</p>
							<p id='validation-repeat'>- Passwords must match!</p>
						</div>

						<button
							className='login-form-button'
							type='submit'
							onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
								handleRegisterButton(e)
							}
						>
							Register
						</button>
						{loading && <div className='spinner'></div>}
					</form>
					<Link to={'/login'} className='login-form-register'>
						Already an user?
					</Link>
				</div>
			</div>
		</div>
	);
}
export default LoginPage;
