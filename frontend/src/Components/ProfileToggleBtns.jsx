import React, { useEffect } from 'react';
import ProfileToggleForm from './ProfileToggleForm';
import { useSelector, useDispatch } from 'react-redux';
import { updateDummyFn, updateFormFn, deleteDummyFn, deleteFormFn } from '../redux/slices/formActiveSlice';

const ToggleBtn = ({ target }) => {
	const btnName = target === 'Update' ? 'Update Password' : 'Delete Account';
	const inputArr =
		target === 'Update' ? ['currentPw', 'newPw', 'confirmPw'] : ['confirmPw'];

	const { deleteDummy, deleteForm, updateDummy, updateForm } = useSelector(
		state => state.form
	);

	const dispatch = useDispatch();

	const handleOpen = e => {
		e.preventDefault();
		if (target === "Update" && updateDummy === null) {
			dispatch(updateDummyFn(true));
		}
		if (target === "Delete" && deleteDummy === null) {
			dispatch(deleteDummyFn(true));
		}
	};


	useEffect(() => {

		const formDisplayTimer = (dummyVal, formVal) => {
			const timer = setTimeout(() => {
				dispatch(target === "Update" ? updateDummyFn(dummyVal) : deleteDummyFn(dummyVal));
				dispatch(target === "Update" ? updateFormFn(formVal) : deleteFormFn(formVal));
			}, 250);
			return () => clearTimeout(timer);
		};

		const formTriage = (dummy, form) => {
			if (dummy && !form) {
				formDisplayTimer(null, true);
			} else if (dummy && form) {
				formDisplayTimer(null, null);
			} else {
				return;
			}
		}

		if(target === "Update") {
			formTriage(updateDummy, updateForm);
		} else {
			formTriage(deleteDummy, deleteForm);
		}
	}, [updateDummy, updateForm, deleteDummy, deleteForm, target, dispatch]);

	return (
		<>
			<div className="profile__main-flex plus">
				<button
					className=" base-btn-form-cropLeft"
					onClick={handleOpen}
					type="button"
				>
					{btnName === 'Update Password' && (
						<i className="bi bi-key profile__form-icon profile__form-iconAdjust"></i>
					)}
					{btnName === 'Delete Account' && (
						<i className="bi bi-trash3 layout-bottom profile__form-icon"></i>
					)}
					{btnName}
				</button>
			</div>

			{target === 'Update' ? (
				<ProfileToggleForm
					target={target}
					inputArr={inputArr}
					activeDummy={updateDummy}
					activeForm={updateForm}
				/>
			) : (
				<ProfileToggleForm
					target={target}
					inputArr={inputArr}
					activeDummy={deleteDummy}
					activeForm={deleteForm}
				/>
			)}
		</>
	);
};

export default ToggleBtn;
