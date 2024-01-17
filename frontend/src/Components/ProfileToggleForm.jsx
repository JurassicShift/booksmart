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
	deletePwValidation,
	toastObjFactory,
	stringifyErrors,
} from '../helpers/indexHelpers';
import { updateToast } from '../redux/slices/toastSlice';
import {
	updateDummyFn,
	updateFormFn,
	deleteFormFn,
	deleteDummyFn,
} from '../redux/slices/formActiveSlice';

const ProfileToggleForm = ({ target, inputArr }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { username } = useSelector(state => state.login.username);

	const { deleteDummy, deleteForm, updateDummy, updateForm } = useSelector(
		state => state.form
	);
	const activeDummy = target === 'Update' ? updateDummy : deleteDummy;
	const activeForm = target === 'Update' ? updateForm : deleteForm;

	const [passwords, setPasswords] = useState({
		current: '',
		newpw: '',
		confirm: '',
		username: username,
	});

	const url = `http://localhost:5000/${
		target === 'Update' ? 'updatepassword' : 'deleteaccount'
	}`;

	const method = target === 'Update' ? 'POST' : 'DELETE';

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

	const handleReset = () => {
		dispatch(resetLogin());
		dispatch(updateBtnLogin());
		dispatch(resetWish());
		dispatch(resetRead());
		if (location.pathname !== '/') {
			dispatch(updateTabs(0));
			return navigate('/');
		}
	};

	const errorMsgFactory = formTarget => {
		return formTarget === 'Update'
			? 'Password update failed.'
			: 'Deletion Failed';
	};

	const toastMsgFactory = (response, formTarget) => {
		return formTarget === 'Update'
			? `Password Updated ${response.obj.username}`
			: `${response.obj.deletedUser.username}'s account deleted`;
	};

	const closeForm = () => {
		dispatch(target === 'Update' ? updateDummyFn(null) : deleteDummyFn(null));
		dispatch(target === 'Update' ? updateFormFn(null) : deleteFormFn(null));
	};

	const revealInputContent = (ev) => {
		const inputElement = ev.currentTarget.nextSibling;
		const type = inputElement.type;
		inputElement.setAttribute("type", type === "password" ? "text" : "password");
	}

	const fetchUpdate = () => {
		fetch(url, {
			method: method,
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(passwords),
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(errorMsgFactory());
				}
			})
			.then(data => {
				fieldReseter('', inputArr);

				if (target === 'Delete') handleReset();

				const toastMsg = toastMsgFactory(data, target);

				dispatch(updateToast(toastObjFactory('success', toastMsg)));
				return closeForm();
			})
			.catch(error => {
				console.log('fired here:', error);
				dispatch(
					updateToast(toastObjFactory('warning', `Error ${error.message}!`))
				);
			});
	};

	const errorsUpdate = errors => {
		let errorStr = stringifyErrors(errors);
		dispatch(updateToast(toastObjFactory('warning', `${errorStr}..!`)));
	};

	const update = validation => {
		if (validation.valid) return fetchUpdate();

		if (validation.errors.length > 0) return errorsUpdate(validation.errors);
	};

	const handleUpdate = e => {
		e.preventDefault();

		let validation =
			target === 'Update'
				? pwValidation(passwords)
				: deletePwValidation(passwords['confirm']);

		return update(validation);
	};

	const showForm = {
		display: 'block',
	};

	const hideForm = {
		display: 'none',
	};

	let labelName;
	const animateDummy =
		target === 'Update' ? 'profile__form-dummy' : 'profile__form-dummyDelete';
	const reverseAnimateDummy =
		target === 'Update'
			? 'profile__form-dummyReverse'
			: 'profile__form-dummyReverseDelete';
	return (
		<form id={target === 'Update' ? 'pwUpdate': 'deleteAc'} onSubmit={handleUpdate}>
			<div
				className={
					target && activeDummy && activeForm
						? reverseAnimateDummy
						: target && activeDummy && !activeForm
						? animateDummy
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
						target === 'Update' ? labelNameFactory(idx) : 'Confirm Password';
					const idField = target === 'Update' ? field : `${field}Delete`;
					return (
						<label
							htmlFor={field}
							key={`profileLabel${idx}`}
							className={`profile__form-pwLabel${idx}`}
						>
							<div className='profile__form-pwSpan' onClick={revealInputContent}>{labelName}<i className="bi bi-eye"></i></div>
							<input
								className="pwInput form-control"
								type="password"
								name={field}
								id={idField}
								value={passwords[field]}
								onChange={e => fieldUpdater(e.target.value, field)}
								required
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
