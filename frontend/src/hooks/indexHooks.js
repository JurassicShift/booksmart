import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateToast } from '../redux/slices/toastSlice.js';
import { toastObjFactory } from '../helpers/indexHelpers.js';
import { resetLogin } from '../redux/slices/loginSlice.js';
import { updateBtnLogin } from '../redux/slices/btnLoginSlice.js';
import { resetWish } from '../redux/slices/wishSlice.js';
import { resetRead } from '../redux/slices/readSlice.js';
import { updateTabs } from '../redux/slices/tabsSlice.js';

const getWindowWidth = () => {
    const { innerWidth: width } = window;

    return width;
}

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(getWindowWidth());

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(getWindowWidth());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowWidth;
}

export const useLogOut = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
	const location = useLocation();

    return () => {
    dispatch(resetLogin());
    dispatch(updateBtnLogin());
    dispatch(resetWish());
    dispatch(resetRead());
    if (location.pathname !== '/') {
        dispatch(updateTabs(0));
        return navigate('/');
    }
}
}

export const useToast = () => {
    const dispatch = useDispatch();

    return (notification, msg) => {
        dispatch(updateToast(toastObjFactory(notification, msg)));
    }
}

export default useWindowWidth;
