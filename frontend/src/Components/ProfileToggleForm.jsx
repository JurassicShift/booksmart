import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetLogin } from '../redux/slices/loginSlice';
import { updateBtnLogin } from '../redux/slices/btnLoginSlice';
import { resetWish } from '../redux/slices/wishSlice';
import { resetRead } from '../redux/slices/readSlice';
import { updateTabs } from '../redux/slices/tabsSlice';
import {
	labelNameFactory,
	pwValidation,
	toastObjFactory,
} from '../helpers/indexHelpers';
import { updateToast } from '../redux/slices/toastSlice';

const ProfileToggleForm = ({ target, inputArr, activeDummy, activeForm }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const name = useSelector(state => state.login.username);

	const [passwords, setPasswords] = useState({
		currentPw: '',
		newPw: '',
		confirmPw: '',
		username: name,
	});

	const fieldUpdater = (value, stateField) => {
		setPasswords(prevPasswords => ({
			...prevPasswords,
			[stateField]: value,
		}));
	};

	const fieldReseter = (value, arr) => {
		arr.forEach(field => {
			setPasswords(prevPasswords => ({
				...prevPasswords,
				[field]: value,
			}));
		});
	};

	const handleReset= () => {
	
		dispatch(resetLogin());
		dispatch(updateBtnLogin());
		dispatch(resetWish());
		dispatch(resetRead());
		if (location.pathname !== '/') {
			dispatch(updateTabs(0));
			return navigate('/');
		}
	};

	const handleUpdate = e => {
		e.preventDefault();

		const url = `http://localhost:5000/${
			target === 'Update' ? 'updatepassword' : 'deleteaccount'
		}`;

		const method = target === 'Update' ? 'POST' : 'DELETE';

		const formData = {
			current: passwords['currentPw'],
			newpw: passwords['newPw'],
			confirm: passwords['confirmPw'],
			username: passwords['username'],
		};

		let validation = pwValidation(formData, target);

		if (validation.valid) {
			fetch(url, {
				method: method,
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
				.then(response => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error(
							target === 'Update'
								? 'Password update failed.'
								: 'Deletion Failed'
						);
					}
				})
				.then(data => {
					fieldReseter('', inputArr);
					if(target === "Delete") handleReset();
					console.log('return data:', data);
					const toastMsg =
						target === 'Update'
							? `Password Updated ${data.obj.username}`
							: `${data.obj.deletedUser.username}'s account deleted`;
					dispatch(
						updateToast(
							toastObjFactory(
								'success',
								toastMsg
							)
						)
					);
				})
				.catch(error => {
					console.log('fired here:', error);
					dispatch(
						updateToast(toastObjFactory('warning', `Error ${error.message}!`))
					);
				});
		} else {
			let errorStr;
			validation.errors.forEach((error, idx) => {
				if (idx === 0) {
					errorStr = error.msg;
				} else {
					errorStr += ' ' + error.msg;
				}
			});
			dispatch(updateToast(toastObjFactory('warning', `${errorStr}..!`)));
		}
	};

	const showForm = {
		display: 'block',
	};

	const hideForm = {
		display: 'none',
	};

	let labelName;

	return (
		<form id="pwUpdate" onSubmit={handleUpdate}>
			<div
				className={
					target && activeDummy && activeForm
						? 'profile__form-dummyReverse'
						: target && activeDummy && !activeForm
						? 'profile__form-dummy'
						: 'profile__form-hide'
				}
			></div>
			<div
				className="profile__form-pw"
				style={
					target && activeForm && activeDummy
						? hideForm
						: target && activeForm && !activeDummy
						? showForm
						: null
				}
			>
				{inputArr.map((field, idx) => {
					labelName =
						target === 'Update' ? labelNameFactory(idx) : 'Confirm Passord';

					return (
						<label
							htmlFor={field}
							key={`profileLabel${idx}`}
							className={`profile__form-pwLabel${idx}`}
						>
							{labelName}
							<input
								className="pwInput form-control"
								type="text"
								name={field}
								id={field}
								value={passwords[field]}
								onChange={e => fieldUpdater(e.target.value, field)}
							></input>
						</label>
					);
				})}
				<div className={'profile__form-pwBtn'}>
					<input
						className=" base-btn-form"
						type="submit"
						value="Submit"
					></input>
				</div>
			</div>
		</form>
	);
};
export default ProfileToggleForm;
