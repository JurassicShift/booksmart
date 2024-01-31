import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBooks } from '../redux/slices/wishSlice.js';
import { addReadBooks } from '../redux/slices/readSlice.js';
import { updateLogin } from '../redux/slices/loginSlice.js';
import { updateBtnLogin } from '../redux/slices/btnLoginSlice.js';
import { updateToast } from '../redux/slices/toastSlice.js';
import { updateForm1, updateForm1Dummy, updateForm2, updateForm2Dummy } from '../redux/slices/formToggleSlice.js';
import {
	toastObjFactory,
	errorMsgFactory,
	toastMsgFactory,
	animateDummyClass,
	reverseAnimateDummyClass
} from '../helpers/indexHelpers.js';
import MenuLabelsAndInputs from "./MenuLabelsInputs.jsx"

const MenuToggleForm = ({formObj}) => {
	
	const formData = formObj;
	const dispatch = useDispatch();
	const { username } = useSelector(state => state.login);
	const initialFormState = Object.fromEntries(formObj.inputs.map(input => [input, ""]));
	const initialDeleteAcFormState = {...initialFormState, username: username};
    const [loginInputs, setLoginInputs] = useState(formObj.type === "DeleteAccount" ? initialDeleteAcFormState : initialFormState);

	const fieldUpdater = (value, stateField) => {
		setLoginInputs(prevData => ({
			...prevData,
			[stateField]: value,
		}));
	};

	const fieldReseter = (value, arr) => {
		arr.forEach(field => {
			setLoginInputs(prevPasswords => ({
				...prevPasswords,
				[field]: value,
			}));
		});
	};

	const { form1Open, form1DummyOpen, form2Open, form2DummyOpen} = useSelector(
		state => state.formToggle
	);
	const activeDummy = formObj.stateLocation === 'form1' ? form1DummyOpen : form2DummyOpen;
	const activeForm = formObj.stateLocation === 'form1' ? form1Open : form2Open;

	const closeForm = () => {
		dispatch(formObj.stateLocation === 'form1' ? updateForm1Dummy(null) : updateForm2Dummy(null));
		dispatch(formObj.stateLocation === 'form1' ? updateForm1(null) : updateForm2(null));
	};

	const updateUserBooks = bookData => {
		const wishArray = bookData.userwish || [];
				if(wishArray.length > 0) {
					dispatch(addBooks(wishArray));
				}
				
				const readArray = bookData.userread || [];
				if(readArray.length > 0) {
					dispatch(addReadBooks(readArray));
				}
	}


	const formSubmit = async e => {
		e.preventDefault();
		const url = formObj.route;
		const method = formObj.method;
		fetch(url, {
			method: method,
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loginInputs),
		})
			.then(response => {
				console.log("response:", response);
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(errorMsgFactory(formObj.type));
				}
			})
			.then(data => {
				fieldReseter('', formObj.inputs);
				const loginData = {
					active: true,
					username: data.obj.username,
					imgUrl: data.obj.imgUrl
				};
		
				updateUserBooks(data.obj);
				dispatch(updateLogin(loginData));
				dispatch(updateBtnLogin());
				const toastMsg = toastMsgFactory(data, formObj.type);

				dispatch(updateToast(toastObjFactory('success', toastMsg)));
				return closeForm();
			})
			.catch(error => {
				console.log('fired here:', error);
				dispatch(
					updateToast(toastObjFactory('warning', `Error ${error.message}!`))
				);
			});
	}

	const showForm = {
		display: 'block',
	};

	const hideForm = {
		display: 'none',
	};

	const animateDummy = animateDummyClass(formObj.type);
	const reverseAnimateDummy = reverseAnimateDummyClass(formObj.type);


    return (
        <form onSubmit={formSubmit}>
			<div
				className={
					formObj.type && activeDummy && activeForm
						? reverseAnimateDummy
						: formObj.type && activeDummy && !activeForm
						? animateDummy
						: 'profile__form-hide'
				}
			></div>
			<div
				className="profile__form-pw"
				style={
					formObj.type && activeForm && activeDummy
						? hideForm
						: formObj.type && activeForm && !activeDummy
						? showForm
						: null
				}
			>
                <MenuLabelsAndInputs formObj={formData} fieldUpdater={fieldUpdater} inputState={loginInputs}/>
				<div className={'profile__form-pwBtn'}>
					<input
						className=" base-btn-form"
						type="submit"
						value="Submit"
					></input>
				</div>
			</div>
		</form>
    )
}

export default MenuToggleForm;