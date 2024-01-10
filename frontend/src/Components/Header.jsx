import PropTypes from 'prop-types';

const Header = ({url}) => {

    const imgStyles = {
        height: '28px',
		width: '28px',
		borderRadius: '50%',
		border: '2px solid #c9d3cc',
		marginLeft: '15px',
        marginRight: '15px'
    }
 
    return (
        <div className="header">
            <div className="header__title">
            <h1 className="header__title-font ">BookSMART</h1>
            <div className="header__title-icons">
                {url === '' ? (<i className="bi bi-person-circle icon-mg"></i>) : (<img src={url} style={imgStyles} alt="profile img"></img>)}
            <i className="bi bi-instagram text-text"></i>
            <i className="bi bi-pinterest text-text icon-mg"></i>
            </div>
            </div>
           
            <p className="header__text">
					A concise tool for managing your book collections. Search, save and
					rate your reading journey.
				</p>
            
				
			</div>
    )
}

Header.propTypes = {
    login: PropTypes.bool
}

export default Header;