const axios = require('axios');
const { urlSwitch } = require('../helpers/index');
const User = require('../models/user');
const Wish = require('../models/wish');
const Read = require('../models/read');

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
	const { username, userpass } = req.body;
	try {
		const foundUser = await User.findAndValidate(username, userpass);
		const userWishes = await foundUser.populate('userwish');
		const userReads = await foundUser.populate('userread');
		if (foundUser) {
			req.session.isAuthenticated = true;
			req.session.user_id = foundUser.id;
			const returnObj = {
				username: foundUser.username,
				active: true,
				userwish: userWishes?.userwish ?? [],
				userread: userReads?.userread ?? []
			};
			res.status(201).send(returnObj);
		} else {
			res.status(401).send({ error: 'User not found. Try again.' });
		}
	} catch (e) {
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
				req.session.user_id = userStatus.id;
				const returnObj = {
					username: userStatus.username,
					active: true,
				}; 
				res.status(201).send(returnObj);
			} else {
				res.status(401).send({ error: 'somehow inauthentic' });
			}
		} catch (e) {
			res.status(500).send('Error signing up');
		}
	} else {
		res.status(401).send('Your information is not correct');
	}
};

const postWish = async (req, res) => {
	const data = req.body;
	const userId = req.session.user_id;
	if (data) {
		try {
			const user = await User.findById(userId);
			if (!user) {
				return res.status(404).send({ message: 'User not found' });
			}

			const wish = new Wish(data);
			await wish.save();
			user.userwish.push(wish);
			await user.save();
			const returnData = {
				_id: wish._id,
			};
			res.status(201).send(wish);
		} catch (e) {
			res.status(500).send({ message: `Internal server error ${e.message}` });
		}
	} else {
		res.status(401).send({ message: `Invalid data in request body ${data}` });
	}
};

const postRead = async (req, res) => {
	const data = req.body;

	const userId = req.session.user_id;
	if (data) {
		try {
			const user = await User.findById(userId);
			if (!user) {
				return res.status(404).send({ message: 'User not found' });
			}

			const read = new Read(data);
			await read.save();
			user.userread.push(read);
			const indexToRemove = user.userwish.indexOf(data._id);
			if (indexToRemove !== -1) {
				user.userwish.splice(indexToRemove, 1);
			}
			await user.save();
			const deletedItem = await Wish.findByIdAndDelete(data._id);
			res.status(201).send(read);
		} catch (e) {
			res.status(500).send({ message: `Internal server error ${e.message}` });
		}
	} else {
		res.status(401).send({ message: `Invalid data in request body ${data}` });
	}
};

const postRating = async (req, res) => {
	const { id, rating } = req.params;
	const userId = req.session.user_id;

	if (id && userId) {
		try {
			const updatedItem = await Read.findByIdAndUpdate(id, {rating: rating}, { new: true } );
			res.status(201).send({ updatedItem: updatedItem });
			
		
		} catch (e) {
			res.status(500).send({ message: `Internal server error ${e.message}` });
		}
	} else {
		res.status(401).send({ message: `Invalid Request` });
	}
}

const deleteBook = async (req, res) => {
	const { id, list } = req.params;
	const userId = req.session.user_id;
	const pullObj = list === "Wish" ? {userwish: id} : {userread: id};

	if (id && userId) {
		let deletedItem;
		try {
			deletedItem = list === "Wish" ? await Wish.findByIdAndDelete(id) : await Read.findByIdAndDelete(id);
			const deletedUserItem = await User.updateOne(
				 		{ _id: userId },
				 		{ $pull: pullObj }
				 	);
					 res.status(201).send({ deletedItem: deletedItem });
			
		
		} catch (e) {
			res.status(500).send({ message: `Internal server error ${e.message}` });
		}
	} else {
		res.status(401).send({ message: `Invalid Request` });
	}
};

module.exports = {
	getBookData,
	postLogin,
	postSignup,
	postWish,
	deleteBook,
	postRead,
	postRating
};
