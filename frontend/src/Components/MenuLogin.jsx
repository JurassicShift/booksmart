import { loginFormData } from "../Config/formData";
import { signUpFormData } from "../Config/formData";
import MenuBtn from './MenuBtn';

const MenuLogin = ({ active }) => {
	const hrStyles = {
		height: '2px',
		borderWidth: '0',
		color: 'gray',
		backgroundColor: 'gray',
	};
	return (
		<div className={`container menu ${active ? 'active' : 'notActive'}`}>
			<div className="profile__main text-dark">
				<div className="profile__menu">
					<div className="profile__text">
						<p>Login</p>
					</div>
					<MenuBtn formObj={loginFormData} />
				</div>
				<hr style={hrStyles} />
				<div className="profile__menu">
					<div className="profile__text">
						<p>SignUp</p>
					</div>
					<MenuBtn formObj={signUpFormData} />
				</div>
				<br />
			</div>
		</div>
	);
};

export default MenuLogin;
