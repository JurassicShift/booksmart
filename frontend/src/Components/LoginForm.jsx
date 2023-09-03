import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Btn from './Btn';

const Login = ({ active }) => {
	const [login, setLogin] = useState(true);
	const title = login ? 'SignUp' : 'Login';

	const formSubmit = (e) => {
		e.preventDefault();
		console.log(e.target);
	}

	return (
		<div
			className={`container login__container ${
				active ? 'active' : 'notActive'
			}`}
		>
			<form className="mt-1 mb-1" onSubmit={formSubmit}>
				<div className="login__title">
					<h1 className="login__title-h1">Login</h1>
				</div>
				<div className="mb-3">
					<label htmlFor="loginUsername" className="form-label text-dark">
						Username
					</label>
					<input type="text" name='username' className="form-control" id="loginUsername"></input>
				</div>
				<div className="mb-3">
					<label htmlFor="loginPassword" className="form-label text-dark">
						Password
					</label>
					<input type="password" name='user_password' className="form-control" id="loginPassword"></input>
				</div>
				<div className="login__btn">
					<Btn btnTitle="Login" style={{marginRight: "0px"}}/>
				</div>
			</form>
			<form className="mt-1" onSubmit={formSubmit}>
				<div className="login__title">
					<h1 className="login__title-h1">SignUp</h1>
				</div>
				<div className="mb-3">
					<label htmlFor="username" className="form-label text-dark">
						Username
					</label>
					<input type="text" name='username' className="form-control" id="username"></input>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label text-dark">
						Email address
					</label>
					<input type="text" name='email'className="form-control" id="email"></input>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label text-dark">
						Password
					</label>
					<input type="password" name='user_password' className="form-control" id="password"></input>
				</div>
				<div className="mb-3">
					<label htmlFor="confirmPassword" className="form-label text-dark">
						Confirm Password
					</label>
					<input
						type="password"
						name='user_confirm'
						className="form-control"
						id="confirmPassword"
					></input>
				</div>
				<div className="login__btn">
					<Btn btnTitle="SignUp" style={{marginRight: "0px"}} />
				</div>
			</form>
		</div>
	);
};

Login.propTypes = {
	active: PropTypes.bool,
};

export default Login;
