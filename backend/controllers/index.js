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
	console.log("login", req.body);
	const hello = {message: "hello login"}
	res.send(hello);
}

const postSignup = async (req, res) => {
	const data = req.body;
	const {userconfirm, ...userdata} = data;
	console.log("userdata", userdata);
	if(data.userpass === data.userconfirm) {
		const user = new User(userdata);
		await user.save();
		res.send({"UserCreated:": user});
	} else {
		res.send({failed: "password don't match"})
	}

}

module.exports = {
	getBookData,
	postLogin,
	postSignup
};
