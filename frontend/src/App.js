import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateBtnLogin } from './redux/slices/btnLoginSlice.js';
import './styles/css/index.css';
import Header from './Components/Header.jsx';
import SubHeader from './Components/SubHeader.jsx';
import TabsAndSearch from './Components/TabsAndSearch.jsx';
import FetchedData from './Components/FetchedData.jsx';
import Menu from './Components/Menu.jsx';
import Toaster from './Components/Toast.jsx';
import WishReadData from './Components/WishReadData.jsx';


function App() {
	const { btnLogin } = useSelector(state => state.btnLogin);
	const activeLogin = useSelector(state => state.login.active);
	const url = useSelector(state => state.login.imgUrl);
	const toast = useSelector(state => state.toast);
	const wish = useSelector(state => state.wish.data);
	const read = useSelector(state => state.read.data);
	const homePageBookData = useSelector(state => state.category.data);

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
				<Header url={url}/>
				<div className="app__parent">
					<div className="app__main">
						<SubHeader activeLogin={activeLogin} btnLogin={btnLogin}/>
						<div className="app__main-view">
								<TabsAndSearch wish={wish} read={read}/>
							<div className="app__data">
								<div className="app__data-container">
								<Routes>
									<Route path="/" element={<FetchedData homePageBookData={homePageBookData}/>}></Route>
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
							
							</div>
							<Menu activeLogin={activeLogin} btnLogin={btnLogin} />
						</div>
					</div>
				</div>
				<Toaster {...toastProps} />
			</div>
		</Router>
	);
}

export default App;
