
 import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MenuToggleForm from './MenuToggleForm';
import {
	updateForm1Dummy,
	updateForm1,
	updateForm2Dummy,
	updateForm2,
} from '../redux/slices/formToggleSlice';

const MenuBtn = ({formObj}) => {
	const formData = formObj;
    const dispatch = useDispatch();
    const { form1DummyOpen, form1Open, form2DummyOpen, form2Open } = useSelector(
		state => state.formToggle
	);

    const handleOpen = e => {
		e.preventDefault();
        if(formObj.stateLocation === "form1" && form1DummyOpen === null) {
            dispatch(updateForm1Dummy(true));

        }

        if(formObj.stateLocation === "form2" && form2DummyOpen === null) {
            dispatch(updateForm2Dummy(true));

        }
	};

    useEffect(() => {
		const formDisplayTimer = (dummyOpen, formOpen) => {
			const timer = setTimeout(() => {
				dispatch(
					formObj.stateLocation === "form1"
						? updateForm1Dummy(dummyOpen)
						: updateForm2Dummy(dummyOpen)
				);
				dispatch(
					formObj.stateLocation === "form1" ? updateForm1(formOpen) : updateForm2(formOpen)
				);
			}, 250);
			return () => clearTimeout(timer);
		};

		const formTriage = (dummyOpen, formOpen) => {
			if (dummyOpen && !formOpen) {
				formDisplayTimer(null, true);
			} else if (dummyOpen && formOpen) {
				formDisplayTimer(null, null);
			} else {
				return;
			}
		};

		if (formObj.stateLocation === "form1") {
			formTriage(form1DummyOpen, form1Open);
		} else {
			formTriage(form2DummyOpen, form2Open);
		}
	}, [form1DummyOpen, form1Open, form2DummyOpen, form2Open, dispatch, formObj.stateLocation]);


    const iconMap = {
        Login: <i className="bi bi-box-arrow-in-right profile__form-icon profile__form-iconAdjust"></i>,
        SignUp: <i className="bi bi-person-add profile__form-icon profile__form-iconAdjust"></i>,
		UpdatePassword: <i className="bi bi-key profile__form-icon profile__form-iconAdjust"></i>,
		DeleteAccount:  <i className="bi bi-trash3 layout-bottom profile__form-icon"></i>
    }

    return (
		<>
			<div className="profile__main-flex plus">
				<button
					className=" base-btn-form-cropLeft"
					onClick={handleOpen}
					type="button"
				>
					{iconMap[formObj.type]}
					{formObj.btn}
				</button>
			</div>
		<MenuToggleForm formObj={formData}/>
		</>
	);

}
export default MenuBtn;