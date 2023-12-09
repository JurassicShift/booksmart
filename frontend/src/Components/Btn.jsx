import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Btn = ({ btnTitle, btnRoute, btnClick, style, classExtension }) => {
	return btnRoute !== '#' ? (
		<Link to={btnRoute}>
			<button type="button" style={style} className={`btn ${classExtension}`} onClick={btnClick}>
				{btnTitle}
			</button>
		</Link>
	) : (
		<button type="button" style={style} className={`btn ${classExtension}`} onClick={btnClick}>
			{btnTitle}
		</button>
	);
};


Btn.propTypes = {
	btnTitle: PropTypes.string,
	btnRoute: PropTypes.string,
	btnClick: PropTypes.func,
	style: PropTypes.object,
};

export default Btn;
