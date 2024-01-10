import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateLogin } from '../redux/slices/loginSlice';
import { updateBtnLogin } from '../redux/slices/btnLoginSlice.js';
import { updateToast } from '../redux/slices/toastSlice';
import { addBooks } from '../redux/slices/wishSlice';
import { addReadBooks } from '../redux/slices/readSlice';
import { fetcher, toastObjFactory } from '../helpers/indexHelpers';
import PropTypes from 'prop-types';

const Login = ({ active }) => {
	const dispatch = useDispatch();

	const [loginData, setLoginData] = useState({
		username: '',
		userpass: '',
	});

	const [signupData, setSignupData] = useState({
		username: '',
		useremail: '',
		userpass: '',
		userconfirm: '',
	});


	const formSubmit = async e => {
		e.preventDefault();

		const target = e.target.id;
		let payload = target === 'login' ? loginData: signupData;


		fetcher(target, 'POST', payload)
			.then(response => {
				console.log("response:", response.obj);
				if(!response.obj.username || !response.obj.active ) {
					throw new Error("Fetch Error");
				}
				const loginData = {
					active: true,
					username: response.obj.username,
					imgUrl: response.obj.imgUrl
				};
		
					
				const wishArray = response.obj.userwish || [];
				if(wishArray.length > 0) {
					dispatch(addBooks(wishArray));
				}
				
				const readArray = response.obj.userread || [];
				if(readArray.length > 0) {
					dispatch(addReadBooks(readArray));
				}

				dispatch(updateLogin(loginData));
				dispatch(updateBtnLogin());
				const toastParams =
					target === 'login'
						? ['information', `Welcome back ${response.obj.username}`]
						: ['success', `Welcome ${response.obj.username}`];
			
				dispatch(updateToast(toastObjFactory(...toastParams)));
			})
			.catch(error => {
				dispatch(
					updateToast(toastObjFactory('warning', `${error.message}`))
				);
			});
	};

	return (
		<div
			className={`container menu ${
				active ? 'active' : 'notActive'
			}`}
		>
			<form className="mt-1 mb-1" id="login" onSubmit={formSubmit}>
				<div className="menu__login">
					<h1 className="menu__login-title">Login</h1>
				</div>
				<div className='menu__login-bg'>
				<div className="mb-3 menu__login-section">
					<div className="menu__login-label">
					<label htmlFor="loginUsername" className="form-label text-dark">
						Username
					</label>
					</div>
					
					<input
						type="text"
						name="username"
						onChange={e =>
							setLoginData({ ...loginData, username: e.target.value })
						}
						className="form-control limiter"
						id="loginUsername"
					></input>
				</div>
				<div className="mb-3 menu__login-section">
				<div className="menu__login-label">
					<label htmlFor="loginPassword" className="form-label text-dark">
						Password
					</label>
					</div>
					<input
						type="password"
						name="user_password"
						onChange={e =>
							setLoginData({ ...loginData, userpass: e.target.value })
						}
						className="form-control limiter"
						id="loginPassword"
					></input>
				</div>
				</div>
				<div className="menu__btn">
					<button
						className="btn base-btn"
						type="submit"
						style={{ marginRight: '0px' }}
					>
						Login
					</button>
				</div>
			</form>
			<form  id="signup" onSubmit={formSubmit}>
				<div className="menu__login">
					<h1 className="menu__login-title">SignUp</h1>
				</div>
				<div className='menu__login-bg'>
				<div className="mb-3 menu__login-section">
				<div className="menu__login-label">
					<label htmlFor="username" className="form-label text-dark">
						Username
					</label>
					</div>
					<input
						type="text"
						name="username"
						onChange={e =>
							setSignupData({ ...signupData, username: e.target.value })
						}
						className="form-control limiter"
						id="username"
					></input>
				</div>
				<div className="mb-3 menu__login-section">
				<div className="menu__login-label">
					<label htmlFor="email" className="form-label text-dark">
						Email address
					</label>
					</div>
					<input
						type="text"
						name="email"
						onChange={e =>
							setSignupData({ ...signupData, useremail: e.target.value })
						}
						className="form-control limiter"
						id="email"
					></input>
				</div>
				<div className="mb-3 menu__login-section">
				<div className="menu__login-label">
					<label htmlFor="password" className="form-label text-dark">
						Password
					</label>
					</div>
					<input
						type="password"
						name="user_password"
						onChange={e =>
							setSignupData({ ...signupData, userpass: e.target.value })
						}
						className="form-control limiter"
						id="password"
					></input>
				</div>
				<div className="mb-3 menu__login-section">
				<div className="menu__login-label">
					<label htmlFor="confirmPassword" className="form-label text-dark">
						Confirm Password
					</label>
					</div>
					<input
						type="password"
						onChange={e =>
							setSignupData({ ...signupData, userconfirm: e.target.value })
						}
						name="user_confirm"
						className="form-control limiter"
						id="confirmPassword"
					></input>
				</div>
				</div>
				<div className="menu__btn">
					<button
						className="btn base-btn"
						type="submit"
						style={{ marginRight: '0px' }}
					>
						SignUp
					</button>
				</div>
			</form>
		</div>
	);
};

Login.propTypes = {
	active: PropTypes.bool,
};

export default Login;
