import PropTypes from 'prop-types';

const Header = ({login}) => {
    return (
        <div className="app__header layout-left layout-top">
            <div className="app__title">
            <h1 className="app__title-font display-2 layout-bottom ">BookSMART</h1>
            <div className="app__title-icons">
                {login && <i className="bi bi-person-circle fs-5 layout-bottom icon-mg"></i>}
            <i className="bi bi-instagram text-text fs-5 layout-bottom"></i>
            <i className="bi bi-pinterest text-text fs-5 layout-bottom icon-mg"></i>
            </div>
            </div>
				<p className="layout-bottom">
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