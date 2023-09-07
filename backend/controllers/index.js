const axios = require('axios');
const { urlSwitch } = require('../helpers/index');
const User = require('../models/user');

const getBookData = async (req, res) => {
	const searchTerms = req.query.searchTerms || '';
	const searchCategory = req.query.searchCategory || '';

	let data = urlSwitch(searchCategory, searchTerms);
	let url = data.url;
	let genre = data.genre;

	try {
		const response = await axios({
			method: 'get',
			url: url,
		});

		const rawData = response.data;
		const titleData = { genre: searchCategory === '' ? genre : searchTerms };
		const combinedData = {
			data: rawData,
			title: titleData,
		};
		res.send(combinedData);
	} catch (e) {
		console.error(`FETCH ERROR: ${e.message}`);
	}
};

const postLogin = async (req, res) => {

	const {username, userpass} = req.body;
	try {
		const foundUser = await User.findAndValidate(username, userpass);	
	
		if (foundUser) {
			req.session.isAuthenticated = true;
		}

		const returnObj = {
			username: foundUser.username,
			active: true,
		};
		res.status(201).send(returnObj);
	} catch(e) {
		res.status(500).send('Error signing up');

	}


};

const postSignup = async (req, res) => {
	const data = req.body;
	const { userconfirm, ...userdata } = data;

	if (data.userpass === data.userconfirm) {

		try {
			const user = new User(userdata);
			const userStatus = await user.save();
			if (userStatus) {
				req.session.isAuthenticated = true;

			}
			const returnObj = {
				username: userStatus.username,
				active: true,
			};
			res.status(201).send(returnObj);
		} catch (e) {
			res.status(500).send('Error signing up');
		}
	} else {
		res.status(401).send('Your information is not correct');
	}
};

module.exports = {
	getBookData,
	postLogin,
	postSignup,
};
