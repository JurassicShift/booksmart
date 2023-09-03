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
	'Young Adult',
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
    urlSwitch
}