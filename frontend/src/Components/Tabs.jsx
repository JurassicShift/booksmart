import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

const Tabs = () => {
	const routes = ['Home', 'Wish', 'Read'];
	const [active, setActive] = useState(0);

	useEffect(() => {
		console.log('Active:', active);
	});

	const handleActive = num => {
		setActive(num);
	};

	const margAdder = {
		marginLeft: '10px',
	};

	const newTabs = routes.map((route, idx) => {
		return (
			<div
				className={active === idx ? 'card tab-active custom-card' : 'card tab-non-active custom-card'}
				onClick={() => handleActive(idx)}
				style={idx !== 0 ? margAdder : null}
				key={idx}
			>
				<div className="card-body d-flex flex-column justify-content-end">
					<p className="card-text">{route}</p>
				</div>
			</div>
		);
	});
	return newTabs;
};

export default Tabs;
