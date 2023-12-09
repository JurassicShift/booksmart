import {  useDispatch } from 'react-redux';
import { updateBtnLogin } from '../redux/slices/btnLoginSlice.js';
import Logo from './Logo.jsx';
import Btn from './Btn.jsx';

const SubHeader = ({activeLogin, btnLogin}) => {

    const dispatch = useDispatch();
	const buttonTitle = btnLogin ? 'back' : 'login/signup';

	return (
		<div className="app__main-btn mt-2">
			<Logo />
			{activeLogin ? (
				<i
					className="bi bi-three-dots-vertical app__dots"
					onClick={() => dispatch(updateBtnLogin())}
				></i>
			) : (
				<Btn
					btnTitle={buttonTitle}
					btnClick={() => dispatch(updateBtnLogin())}
					btnRoute={'#'}
					classExtension={'base-btn-login'}
				/>
			)}
		</div>
	);
};

export default SubHeader;
