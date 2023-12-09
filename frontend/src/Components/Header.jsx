import PropTypes from 'prop-types';

const Header = ({login}) => {

 
    return (
        <div className="header">
            <div className="header__title">
            <h1 className="header__title-font ">BookSMART</h1>
            <div className="header__title-icons">
                {login && <i className="bi bi-person-circle icon-mg"></i>}
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