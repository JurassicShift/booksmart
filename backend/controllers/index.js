const axios = require('axios');
const { urlSwitch } = require('../helpers/index');

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

module.exports = {
	getBookData,
};
