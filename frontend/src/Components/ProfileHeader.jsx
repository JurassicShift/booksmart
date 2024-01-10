

const ProfileHeader = ({imgUrl, username}) => {

    const lgIconStyles = {
		fontSize: '75px',
		marginTop: '20px',
	};
    const imgStyles = {
		height: '80px',
		width: '80px',
		borderRadius: '50%',
		border: '4px solid #c9d3cc',
		marginTop: '20px',
		marginBottom: '5px',
	};
    const textStyles = {
		fontSize: '20px',
		marginBottom: '10px',
		letterSpacing: '0.5px',   
        fontWeight: 'bold'

	};

    const subTextStyles = {
		fontSize: '16px',
		letterSpacing: '1px',
        marginBottom: '20px',
        color: '#212121',
        fontWeight: 'bold'

	};
    return (
        <div className="profile__img">
        {imgUrl === '' ? (
            <i
                className="bi bi-person-circle mt-3 layout-bottom icon-mg"
                style={lgIconStyles}
            ></i>
        ) : (
            <img src={imgUrl} style={imgStyles} alt="profile img"></img>
        )}

        <p style={textStyles}>{username}</p>
        <p style={subTextStyles}>Account Settings</p>
    </div>
    )
}

export default ProfileHeader;