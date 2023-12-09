import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTabs } from '../redux/slices/tabsSlice';
import { updateToast } from '../redux/slices/toastSlice';
import { toastObjFactory } from '../helpers/indexHelpers';

const Tabs = () => {
	const routes = ['Home', 'Wish', 'Read'];
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const active = useSelector(state => state.tabs.active);
	const login = useSelector(state => state.login.active);
	const read = useSelector(state => state.read.data);
	const r = read.length;
	const wish = useSelector(state => state.wish.data);
	const w = wish.length;
	const home = useSelector(state => state.category.data);
	const h = home.length;
	const listLengths = [h, w, r];
	const handleActive = num => {
		if (!login && num !== 0) {
			return dispatch(
				updateToast(
					toastObjFactory('information', `Please login to use ${routes[num]}`)
				)
			);
		}
		dispatch(updateTabs(num));
		if (num === 0) {
			return navigate('/');
		}
		navigate('/' + routes[num].toLowerCase());
	};


	const newTabs = routes.map((route, idx) => {
		return (
			<React.Fragment key={`tab-${idx}`}>
				
			<div
					className={
						active === idx
							? 'card tabs__base-active custom-card'
							: 'card tabs__base-nonActive custom-card'
					}
					onClick={() => handleActive(idx)}
					
				>
					<div className="card-body ">
						<p className="card-text">{route}</p>
					</div>
				</div>
				<span className="badge">
						{listLengths[idx]}
					</span>
					</React.Fragment>
		);
	});
	return newTabs; 
};

export default Tabs;
