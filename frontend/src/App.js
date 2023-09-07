import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateBtnLogin } from './redux/slices/btnLoginSlice.js';
import './styles/css/index.css';
import Header from './Components/Header.jsx';
import Btn from './Components/Btn.jsx';
import SearchBar from './Components/SearchBar.jsx';
import SearchTabs from './Components/SearchTabs.jsx';
import Logo from './Components/Logo.jsx';
import FetchedData from './Components/FetchedData.jsx';
import LoginForm from './Components/LoginForm.jsx';
import Profile from './Components/Profile.jsx';

function App() {
	const { btnLogin } = useSelector(state => state.btnLogin);
	const buttonTitle = btnLogin ? 'back' : 'login/signup';
	const activeLogin = useSelector(state => state.login);
	const dispatch = useDispatch();

	useEffect(() => {
		if (activeLogin.active) {
			dispatch(updateBtnLogin);
		}
	}, [activeLogin.active, dispatch]);

	return (
		<Router>
			<div className="app">
				<Header login={activeLogin.active} />
				<div className="app__parent layout-left">
					<div className="app__main">
						<div className="app__main-btn mt-2">
							<Logo />
							{activeLogin.active ? (
								<i className="bi bi-three-dots-vertical app__dots" onClick={() => dispatch(updateBtnLogin())}></i>
							) : (
								<Btn
									btnTitle={buttonTitle}
									btnClick={() => dispatch(updateBtnLogin())}
									btnRoute={'#'}
								/>
							)}
						</div>
						<div className="app__main-view">
							<SearchTabs />
							<SearchBar />

							<div className="app__data">
								<Routes>
									<Route index element={<FetchedData />}></Route>
								</Routes>
							</div>
							{activeLogin.active ? (
								<Profile btnActive={btnLogin} />
							) : (
								<LoginForm active={btnLogin} />
							)}
						</div>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default App;
