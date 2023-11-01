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
	const read = useSelector(state => state.read);
	const r = read.length;
	const wish = useSelector(state => state.wish);
	const w = wish.length;
	const home = useSelector(state => state.category.data);
	const h = home.length;

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

	const margAdder = {
		marginLeft: '10px',
	};

	const newTabs = routes.map((route, idx) => {
		return (
			<>
				<div
					className={
						active === idx
							? 'card tab-active custom-card'
							: 'card tab-non-active custom-card'
					}
					onClick={() => handleActive(idx)}
					style={idx !== 0 ? margAdder : null}
					key={idx}
				>
					<div className="card-body d-flex flex-column justify-content-end">
						<p className="card-text">{route}</p>
					</div>
				</div>
				{idx === 0 && (
					<span key={`badge-${idx}`} className="badge">
						{h}
					</span>
				)}
				{idx === 1 && (
					<span key={`badge-${idx}`} className="badge">
						{w}
					</span>
				)}
				{idx === 2 && (
					<span key={`badge-${idx}`} className="badge">
						{r}
					</span>
				)}
			</>
		);
	});
	return newTabs;
};

export default Tabs;
