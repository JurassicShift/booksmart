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

		// if (target === 'login') {
		// 	payload = loginData;
		// } else {
		// 	payload = signupData;
		// }

		fetcher(target, 'POST', payload)
			.then(response => {
				if(!response.username || !response.active) {
					throw new Error();
				}
				const loginData = {
					active: true,
					username: response.username,
				};

				const wishArray = response.userwish;
				if(wishArray.length > 0) {
					dispatch(addBooks(wishArray));
				}
				
				const readArray = response.userread;
				if(readArray.length > 0) {
					dispatch(addReadBooks(readArray));
				}

				dispatch(updateLogin(loginData));
				dispatch(updateBtnLogin());
				const toastParams =
					target === 'login'
						? ['information', `Welcome back ${response.username}`]
						: ['success', `Welcome ${response.username}`];
			
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
			className={`container login__container ${
				active ? 'active' : 'notActive'
			}`}
		>
			<form className="mt-1 mb-1" id="login" onSubmit={formSubmit}>
				<div className="login__title">
					<h1 className="login__title-h1">Login</h1>
				</div>
				<div className="mb-3">
					<label htmlFor="loginUsername" className="form-label text-dark">
						Username
					</label>
					<input
						type="text"
						name="username"
						onChange={e =>
							setLoginData({ ...loginData, username: e.target.value })
						}
						className="form-control"
						id="loginUsername"
					></input>
				</div>
				<div className="mb-3">
					<label htmlFor="loginPassword" className="form-label text-dark">
						Password
					</label>
					<input
						type="password"
						name="user_password"
						onChange={e =>
							setLoginData({ ...loginData, userpass: e.target.value })
						}
						className="form-control"
						id="loginPassword"
					></input>
				</div>
				<div className="login__btn">
					<button
						className="btn base-btn"
						type="submit"
						style={{ marginRight: '0px' }}
					>
						Login
					</button>
				</div>
			</form>
			<form className="mt-1" id="signup" onSubmit={formSubmit}>
				<div className="login__title">
					<h1 className="login__title-h1">SignUp</h1>
				</div>
				<div className="mb-3">
					<label htmlFor="username" className="form-label text-dark">
						Username
					</label>
					<input
						type="text"
						name="username"
						onChange={e =>
							setSignupData({ ...signupData, username: e.target.value })
						}
						className="form-control"
						id="username"
					></input>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label text-dark">
						Email address
					</label>
					<input
						type="text"
						name="email"
						onChange={e =>
							setSignupData({ ...signupData, useremail: e.target.value })
						}
						className="form-control"
						id="email"
					></input>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label text-dark">
						Password
					</label>
					<input
						type="password"
						name="user_password"
						onChange={e =>
							setSignupData({ ...signupData, userpass: e.target.value })
						}
						className="form-control"
						id="password"
					></input>
				</div>
				<div className="mb-3">
					<label htmlFor="confirmPassword" className="form-label text-dark">
						Confirm Password
					</label>
					<input
						type="password"
						onChange={e =>
							setSignupData({ ...signupData, userconfirm: e.target.value })
						}
						name="user_confirm"
						className="form-control"
						id="confirmPassword"
					></input>
				</div>
				<div className="login__btn">
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
