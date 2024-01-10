import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateToast } from '../redux/slices/toastSlice';
import { toastObjFactory } from '../helpers/indexHelpers';
import { resetLogin } from '../redux/slices/loginSlice';
import { updateBtnLogin } from '../redux/slices/btnLoginSlice.js';
import { resetWish } from '../redux/slices/wishSlice';
import { resetRead } from '../redux/slices/readSlice';
import { updateTabs } from '../redux/slices/tabsSlice';


const ProfileLogOut = ({username}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
	const location = useLocation();

    const handleLogOut = () => {
		dispatch(
			updateToast(toastObjFactory('information', `Goodbye ${username}`))
		);
		dispatch(resetLogin());
		dispatch(updateBtnLogin());
		dispatch(resetWish());
		dispatch(resetRead());
		if (location.pathname !== '/') {
			dispatch(updateTabs(0));
			return navigate('/');
		}
	};

    return (
        <button className="base-btn-form-cropLeft" onClick={handleLogOut}>
        <i
            className="bi bi-box-arrow-left profile__form-iconAdjust"
    
        ></i>
        Log Out
    </button>
    )
}

export default ProfileLogOut;