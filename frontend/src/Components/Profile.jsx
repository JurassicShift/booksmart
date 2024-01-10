import { useSelector } from 'react-redux';
import ProfileHeader from './ProfileHeader.jsx';
import ProfileImg from './ProfileImg.jsx';
import ProfileLogOut from './ProfileLogOut.jsx';
import ProfileFooter from './ProfileFooter.jsx';
import ToggleBtn from './ProfileToggleBtns.jsx';

const Profile = ({ btnActive }) => {
	const { username, imgUrl } = useSelector(state => state.login);
	const hrStyles = {
		height: '2px',
		borderWidth: '0',
		color: 'gray',
		backgroundColor: 'gray',
	};
	return (
		<div className={`container menu ${btnActive ? 'active' : 'notActive'}`}>
			<ProfileHeader imgUrl={imgUrl} username={username} />
			<div className="profile__main text-dark">
				<div className="profile__menu">
					<div className="profile__text">
						<p>Manage Image</p>
					</div>
					<ProfileImg />
				</div>
				<hr style={hrStyles} />
				<div className="profile__menu">
					<div className="profile__text">
						<p>Manage Password</p>
					</div>
					<ToggleBtn target={"Update"} />
				</div>
				<hr style={hrStyles} />
				<div className="profile__menu">
					<div className="profile__text">
						<p>Manage Account</p>
					</div>
					<ProfileLogOut username={username} />
					<ToggleBtn target={"Delete"} />
				</div>
				<br />
			</div>
			<ProfileFooter />
		</div>
	);
};

export default Profile;
