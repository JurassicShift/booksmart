const customError = (msg, statusCode) => {
	const error = new Error(msg);
	error.statusCode = statusCode;
	return error;
}

const dataObjFactory = (msg, obj) => ({msg, obj});

const returnObjFactory = (msg, obj) => ({
	status: 201,
	data: dataObjFactory(msg, obj)
})

const tryCatchDecorator = (fn) => {
	return async (req, res) => {
		try {
			const result= await fn(req, res);
			return res.status(result.status).send(result.data);
		} catch (e) {
			return res.status(500).send(dataObjFactory(`Error: ${e.message}`, e));
		}
	}
	
}


const urlSwitch = (category, terms) => {

	const apiKey = process.env.BOOKS_API_KEY;
	const key = `&key=${apiKey}`;
	
	const genre =
		urlSwitch.bookGenres[
			Math.floor(Math.random() * urlSwitch.bookGenres.length - 1)
		];

    let url;
	switch (category) {
		case 'genre':
			url = `https://www.googleapis.com/books/v1/volumes?q=subject:${
				terms + key
			}`;
			break;
		case 'title':
			url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${
				terms + key
			}`;
			break;
		case 'author':
			url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${
				terms + key
			}`;
      break;
		default:
			url = `https://www.googleapis.com/books/v1/volumes?q=subject:${
				genre + key
			}`;
	}
	const combinedData = {
		url: url,
		genre: genre
	}
    return combinedData;
}

urlSwitch.bookGenres = [
	'Sci-Fi',
	'Fantasy',
	'Mystery',
	'Romance',
	'Horror',
	'Thriller',
	'Adventure',
	'Historical Fiction',
	'Dystopian',
	'Teenage',
	'Science',
	'Philosophy',
	'Classics',
	'Biography',
	'Self-Help',
	'Humor',
	'Crime',
	'Non-Fiction',
	'Poetry',
	'Memoir',
	'History',
	'Politics',
	'Social Sciences',
	'Psychology',
	'Economics',
	'Sociology',
	'Anthropology',
	'True Crime',
	'Self-Improvement',
	'Cooking',
	'Health',
	'Fitness',
	'Travel',
];

module.exports = {
    urlSwitch,
	tryCatchDecorator,
	returnObjFactory,
	dataObjFactory,
	customError
}