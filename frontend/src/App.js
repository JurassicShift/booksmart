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
import Toaster from './Components/Toast.jsx';
import WishReadData from './Components/WishReadData.jsx';
import Sort from './Components/SortBtns.jsx';

function App() {
	const { btnLogin } = useSelector(state => state.btnLogin);
	const buttonTitle = btnLogin ? 'back' : 'login/signup';
	const activeLogin = useSelector(state => state.login.active);
	const toast = useSelector(state => state.toast);
	const wish = useSelector(state => state.wish);
	const read = useSelector(state => state.read);
	const tab = useSelector(state => state.tabs.active);

	const toastProps = {
		active: toast.active,
		notice: toast.notice,
		type: toast.type,
	};

	const dispatch = useDispatch();

	useEffect(() => {
		if (activeLogin) {
			dispatch(updateBtnLogin);
		}
	}, [activeLogin, dispatch]);

	return (
		<Router>
			<div className="app">
				<Header login={activeLogin} />
				<div className="app__parent layout-left">
					<div className="app__main">
						<div className="app__main-btn mt-2">
							<Logo />
							{activeLogin ? (
								<i
									className="bi bi-three-dots-vertical app__dots"
									onClick={() => dispatch(updateBtnLogin())}
								></i>
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
								{tab !== 0 && <Sort wish={wish} read={read} />}
							<div className="app__data">
								<Routes>
									<Route path="/" element={<FetchedData />}></Route>
									<Route
										path="/wish"
										element={<WishReadData list="Wish" bookData={wish} />}
									></Route>
									<Route
										path="/read"
										element={<WishReadData list="Read" bookData={read} />}
									></Route>
								</Routes>
							</div>
							{activeLogin ? (
								<Profile btnActive={btnLogin} />
							) : (
								<LoginForm active={btnLogin} />
							)}
						</div>
					</div>
				</div>
				<Toaster {...toastProps} />
			</div>
		</Router>
	);
}

export default App;
