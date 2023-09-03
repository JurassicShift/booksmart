
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import {  useSelector, useDispatch } from 'react-redux';
import './styles/css/index.css';
import Header from './Components/Header.jsx';
import Btn from './Components/Btn.jsx';
import SearchBar from './Components/SearchBar.jsx';
import SearchTabs from './Components/SearchTabs.jsx';
import Logo from './Components/Logo.jsx';
import FetchedData from './Components/FetchedData.jsx';
import LoginForm from './Components/LoginForm.jsx';
import { updateLogin } from './redux/slices/loginSlice.js';


function App() {
	const dispatch = useDispatch();

	const loginActive = () => {
		dispatch(updateLogin());
	}

	const activeLogin = useSelector(state => state.login.value);
	const buttonTitle = activeLogin ? "back" : "login/signup";


	return (
		<Router>
			<div className="app">
				<Header />
				<div className="app__parent layout-left">
					<div className="app__main">
						<div className="app__main-btn mt-2">
							<Logo />
							<Btn btnTitle={buttonTitle} btnClick={loginActive} btnRoute={'#'}/>
						</div>
						<div className="app__main-view">
						<SearchTabs />
						<SearchBar />
						
						<div className="app__data">
							<Routes>
								 <Route index element={<FetchedData />}></Route>								
							</Routes>
							
						</div>
						<LoginForm active={activeLogin}/>
						</div>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default App;
