import { useSelector, useDispatch } from 'react-redux';
import { resetLogin } from '../redux/slices/loginSlice';
import { updateBtnLogin } from '../redux/slices/btnLoginSlice.js';
// import Btn from './Btn';


const Profile = ({ btnActive, loggedIn }) => {
	const { username } = useSelector(state => state.login);
	const dispatch = useDispatch();
	const imgStyles = {
		fontSize: '75px',
		marginTop: '20px',
	};
	const textStyles = {
		fontSize: '20px',
		marginBottom: '20px',
	};
	const iconStyles = {
		fontSize: '20px',
	};

	const handleLogOut = () => {
		dispatch(resetLogin());
		dispatch(updateBtnLogin());
	}

	return (
		<div
			className={`container profile__container ${
				btnActive ? 'active' : 'notActive'
			}`}
		>
			<div className="profile__img">
				<i
					className="bi bi-person-circle mt-3 layout-bottom icon-mg"
					style={imgStyles}
				></i>
				<p style={textStyles}>{username}</p>
			</div>
			<div className="profile__main text-dark">
				<div className="profile__menu">
					<div className="profile__main-flex">
						<i class="bi bi-upload layout-bottom" style={iconStyles}></i>
						<p className="profile__text layout-bottom">Upload Image</p>
					</div>
					<div className="profile__main-flex">
						<i class="bi bi-trash3 layout-bottom" style={iconStyles}></i>
						<p className="profile__text layout-bottom">Delete Image</p>
					</div>
					<br></br>
				</div>
				<div className="profile__menu">
					<div className="profile__main-flex plus">
						<i class="bi bi-key layout-bottom" style={iconStyles}></i>
						<p className="profile__text layout-bottom">Update Password</p>
					</div>
					<br></br>
				</div>
				<div className="profile__menu">
					<div className="profile__main-flex" onClick={handleLogOut}>
						<i class="bi bi-box-arrow-left layout-bottom" style={iconStyles}></i>
						<p className="profile__text layout-bottom">Log Out</p>
					</div>
					<div className="profile__main-flex">
						<i class="bi bi-trash3 layout-bottom" style={iconStyles}></i>
						<p className="profile__text layout-bottom">Delete Account</p>
					</div>
					<br></br>
				</div>
			</div>
			<div
				className="btn-group mb-3"
				role="group"
				aria-label="Basic radio toggle button group"
				style={{ width: '100%' }}
			>
				<input
					type="radio"
					className="btn-check"
					name="title"
					id="btnradio1"
					autoComplete="off"
				></input>
				<label className="btn btn-secondary" htmlFor="btnradio1">
					<i className="bi bi-book"></i>
					<p>22</p>
				</label>

				<input
					type="radio"
					className="btn-check"
					name="author"
					id="btnradio2"
					autoComplete="off"
				></input>
				<label className="btn btn-secondary" htmlFor="btnradio2">
					<i className="bi bi-star"></i>
					<p>53</p>
				</label>

				<input
					type="radio"
					className="btn-check"
					name="genre"
					id="btnradio3"
					autoComplete="off"
				></input>
				<label className="btn btn-secondary" htmlFor="btnradio3">
					Last Updated:
					<p>23.07.97.</p>
				</label>
			</div>
		</div>
	);
};

export default Profile;
