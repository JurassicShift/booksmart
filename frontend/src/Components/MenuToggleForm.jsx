import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBooks } from '../redux/slices/wishSlice.js';
import { addReadBooks } from '../redux/slices/readSlice.js';
import { updateLogin } from '../redux/slices/loginSlice.js';
import { updateBtnLogin } from '../redux/slices/btnLoginSlice.js';
import {
	updateForm1,
	updateForm1Dummy,
	updateForm2,
	updateForm2Dummy,
} from '../redux/slices/formToggleSlice.js';
import {
	toastMsgFactory,
	animateDummyClass,
	reverseAnimateDummyClass,
	stateParser,
} from '../helpers/indexHelpers.js';
import {
	errorMsgFactory,
	concatErrors,
	validations,
} from '../helpers/validationErrors.js';
import MenuLabelsAndInputs from './MenuLabelsInputs.jsx';
import { useLogOut, useToast } from '../hooks/indexHooks.js';

const MenuToggleForm = ({ formObj }) => {
	const { route, method, type, inputs, stateLocation } = formObj;

	const { username } = useSelector(state => state.login);

	const processLogOut = useLogOut();
	const callToast = useToast();
	const dispatch = useDispatch();


	const initialFormState = Object.fromEntries(
		inputs.map(input => [input, { value: '', error: null }])
	);
	const initialDeleteAcFormState = {
		...initialFormState,
		username: { value: username, error: null },
	};
	const [formInputs, setFormInputs] = useState(
		type === 'DeleteAccount' ? initialDeleteAcFormState : initialFormState
	);

	const updateField = (key, value, stateField) => {
		setFormInputs(prevData => ({
			...prevData,
			[stateField]: { ...prevData[stateField], [key]: value },
		}));
	};

	const fieldUpdater = (value, stateField) => {
		updateField('value', value, stateField);
	};

	const fieldValidationError = (error, stateField) => {
		updateField('error', error, stateField);
	};

	const fieldReseter = (value, arr) => {
		arr.forEach(field => {
			setFormInputs(prevData => ({
				...prevData,
				[field]: { ...prevData[field], value },
			}));
		});
	};

	const { form1Open, form1DummyOpen, form2Open, form2DummyOpen } = useSelector(
		state => state.formToggle
	);
	const activeDummy =
		stateLocation === 'form1' ? form1DummyOpen : form2DummyOpen;
	const activeForm = stateLocation === 'form1' ? form1Open : form2Open;

	const closeForm = () => {
		dispatch(
			stateLocation === 'form1'
				? updateForm1Dummy(null)
				: updateForm2Dummy(null)
		);
		dispatch(stateLocation === 'form1' ? updateForm1(null) : updateForm2(null));
	};

	const updateUserBooks = bookData => {
		const wishArray = bookData.userwish || [];
		if (wishArray.length > 0) {
			dispatch(addBooks(wishArray));
		}

		const readArray = bookData.userread || [];
		if (readArray.length > 0) {
			dispatch(addReadBooks(readArray));
		}
	};

	const processLoginSignUpState = bookData => {
		const loginData = {
			active: true,
			username: bookData.username,
			imgUrl: bookData.imgUrl,
		};

		updateUserBooks(bookData);
		dispatch(updateLogin(loginData));
		dispatch(updateBtnLogin());
	}

	const processFetchByType = data => {
		if (type === 'DeleteAccount') {
			processLogOut();
		} else if (type === 'Login' || type === 'SignUp') {
			processLoginSignUpState(data.obj);
		} else {
			dispatch(updateBtnLogin());
		}
	}

	const formSubmit = async () => {
		fetch(route, {
			method: method,
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(stateParser(formInputs)),
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(errorMsgFactory(type));
				}
			})
			.then(data => {
				fieldReseter('', inputs);
				processFetchByType(data);
				const toastMsg = toastMsgFactory(data, type);
				callToast("success", toastMsg);
				return closeForm();
			})
			.catch(error => {
				callToast("warning", error.message);
			});
	};

	const inputWarning = fields => {
		const stateCopy = { ...formInputs };
		let errorBool;
		for (const field in stateCopy) {
			fields.includes(field) ? (errorBool = true) : (errorBool = false);
			fieldValidationError(errorBool, field);
		}
	};

	const errorsUpdate = validation => {
		let errorStr = concatErrors(validation.errors);
		inputWarning(validation.fields);
		callToast("warning", errorStr);
	};

	const formValidation = e => {
		e.preventDefault();
		const validation = validations(type, stateParser(formInputs));
		if (validation.valid) return formSubmit();

		return errorsUpdate(validation);
	};

	const showForm = {
		display: 'block',
	};

	const hideForm = {
		display: 'none',
	};

	const animateDummy = animateDummyClass(type);
	const reverseAnimateDummy = reverseAnimateDummyClass(type);

	return (
		<form onSubmit={formValidation}>
			<div
				className={
					type && activeDummy && activeForm
						? reverseAnimateDummy
						: type && activeDummy && !activeForm
						? animateDummy
						: 'profile__form-hide'
				}
			></div>
			<div
				className="profile__form-pw"
				style={
					type && activeForm && activeDummy
						? hideForm
						: type && activeForm && !activeDummy
						? showForm
						: null
				}
			>
				<MenuLabelsAndInputs
					formObj={formObj}
					fieldUpdater={fieldUpdater}
					inputState={formInputs}
				/>
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

export default MenuToggleForm;
