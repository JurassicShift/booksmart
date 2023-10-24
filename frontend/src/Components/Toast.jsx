import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as bootstrap from 'bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Btn from './Btn';

import { resetToast } from '../redux/slices/toastSlice.js';

const Toaster = ({ notice, type }) => {
	const toastRef = useRef();
	const dispatch = useDispatch();
	const toastActive = useSelector(state => state.toast.active);

	useEffect(() => {
		const myToast = toastRef.current;
		let bsToast = new bootstrap.Toast(myToast, {autohide: false} );

		toastActive ? bsToast.show() : bsToast.hide();

		if (toastActive) {
			const timer = setTimeout(() => {
				dispatch(resetToast());
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [toastActive, dispatch]);

	const toastIcons = {
		information: <i className="bi bi-info-circle"></i>,
		warning: <i className="bi bi-exclamation-circle"></i>,
		success: <i className="bi bi-check-circle"></i>,
	};

	const icon = toastIcons[type];

	const toastColours = {
		information: '#517eef',
		warning: '#ef6351',
		success: '#51ef63',
	};

	const toastColour = {
		backgroundColor: toastColours[type],
	};

	const toastTitles = {
		information:'Just to let you know...',
		warning:'Woah hang on...',
		success:'Great work...',
	};

	const toastTitle = toastTitles[type];

	const btnProps = {
		btnTitle: `X`,
		btnRoute: '#',
		btnClick: () => dispatch(resetToast()),
		style: { backgroundColor: 'transparent', border: 'none', color: "white", fontSize: "20px" },
	};

	return (
		<div
			className="toast custom-toast"
			style={toastColour}
			ref={toastRef}
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
		>
			<div className="toast-header">
				<div className='toast__section'>
                    <div className="toast__icon">
                    {icon}
                    </div>
					
					<div className='toast__text'>
						<p>{toastTitle}</p>
						<p >{notice}</p>
					</div>
				</div>
				<Btn {...btnProps} />
			</div>
		</div>
	);
};

Toaster.propTypes = {
	notice: PropTypes.string,
	message: PropTypes.string,
	type: PropTypes.string,
};
export default Toaster;
