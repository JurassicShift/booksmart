const axios = require('axios');
const {
	urlSwitch,
	tryCatchDecorator,
	returnObjFactory,
	dataObjFactory,
} = require('../helpers/index');
const User = require('../models/user');
const Wish = require('../models/wish');
const Read = require('../models/read');
const { cloudinary } = require('../../cloudinaryConfig.js');
const bcrypt = require('bcryptjs');

const getBookData = tryCatchDecorator(async (req, res) => {
	const searchTerms = req.query.searchTerms || '';
	const searchCategory = req.query.searchCategory || '';

	let data = urlSwitch(searchCategory, searchTerms);
	let url = data.url;
	let genre = data.genre;

	const response = await axios({
		method: 'get',
		url: url,
	});
	if (response.status === 200) {
		const rawData = response.data;
		const titleData = { genre: searchCategory === '' ? genre : searchTerms };
		const combinedData = {
			data: rawData,
			title: titleData,
		};
		return returnObjFactory('Data fetched', combinedData);
	} else {
		return res
			.status(400)
			.send(dataObjFactory('Data not found. Try again', {}));
	}
});

const postLogin = tryCatchDecorator(async (req, res) => {
	const { username, userpass } = req.body;
	const foundUser = await User.findAndValidate(username, userpass);
	if (foundUser) {
		const userWishes = await foundUser.populate('userwish');
		const userReads = await foundUser.populate('userread');
		req.session.isAuthenticated = true;
		req.session.user_id = foundUser.id;
		const returnObj = {
			username: foundUser.username,
			active: true,
			imgUrl: foundUser.userimage?.url ?? '',
			userwish: userWishes?.userwish ?? [],
			userread: userReads?.userread ?? [],
		};
		return returnObjFactory('Login Complete', returnObj);
	} else {
		return res
			.status(401)
			.send(dataObjFactory('User not found. Try again', {}));
	}
});

const postSignup = tryCatchDecorator(async (req, res) => {
	const data = req.body;
	const { userconfirm, ...userdata } = data;

	const user = new User(userdata);

	const userStatus = await user.save();

	if (userStatus) {
		req.session.isAuthenticated = true;
		req.session.user_id = userStatus.id;
		const returnObj = {
			username: userStatus.username,
			active: true,
			imgUrl: userStatus.userimage?.url ?? '',
		};
		return returnObjFactory('Signup Complete', returnObj);
	} else {
		return res
			.status(401)
			.send(dataObjFactory('User not found. Try again.', {}));
	}
});

const postWish = tryCatchDecorator(async (req, res) => {
	const data = req.body;
	const userId = req.session.user_id;
	if (data) {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send(dataObjFactory('User not found. Try again.', {}));
		}

		const wish = new Wish(data);
		await wish.save();
		user.userwish.push(wish);
		await user.save();
		return returnObjFactory('Added To Wish list', wish);
	} else {
		return res
			.status(401)
			.send(dataObjFactory('Invalid data in request body ', {}));
	}
});

const postRead = tryCatchDecorator(async (req, res) => {
	const data = req.body;
	const userId = req.session.user_id;

	if (data) {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send(dataObjFactory('User not found', {}));
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
		return returnObjFactory('Added to Read list', read);
	} else {
		return res
			.status(401)
			.send(dataObjFactory('Invalid data in request body ', {}));
	}
});

const postRating = tryCatchDecorator(async (req, res) => {
	const { id, rating } = req.params;
	const userId = req.session.user_id;

	if (id && userId) {
		const updatedItem = await Read.findByIdAndUpdate(
			id,
			{ rating: rating },
			{ new: true }
		);
		return returnObjFactory('Rating Updated', updatedItem);
	} else {
		return res.status(401).send(dataObjFactory('Invalid data in request body ', {}));
	}
});

const deleteBook = tryCatchDecorator(async (req, res) => {
	const { id, list } = req.params;
	const userId = req.session.user_id;
	const pullObj = list === 'Wish' ? { userwish: id } : { userread: id };

	if (id && userId) {
		let deletedItem;
		deletedItem =
			list === 'Wish'
				? await Wish.findByIdAndDelete(id)
				: await Read.findByIdAndDelete(id);
		const deletedUserItem = await User.updateOne(
			{ _id: userId },
			{ $pull: pullObj }
		);
		return returnObjFactory('Item Deleted', deletedItem);
	} else {
		return res.status(401).send(dataObjFactory('Invalid data in request body ', {}));
	}
});

const postPhoto = tryCatchDecorator(async (req, res) => {
	const userId = req.session.user_id;

	const path = req.file.path;
	const name = req.file.filename;

	if (path && name) {
		const updatedItem = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					userimage: {
						url: path,
						filename: name,
					},
				},
			},
			{ new: true }
		);

		return returnObjFactory('Image Updated', updatedItem);
	} else {
		return res.status(401).send(dataObjFactory('Invalid data in request body ', {}));
	}
});

const deletePhoto = tryCatchDecorator(async (req, res) => {
	const userId = req.session.user_id;

	if (userId) {
		const userObj = await User.findById(userId);
		if (userObj.userimage.url && userObj.userimage.filename) {
			await cloudinary.uploader.destroy(userObj.userimage.filename);
		}
		userObj.userimage.url = '';
		userObj.userimage.filename = '';
		await userObj.save();
		return returnObjFactory('Image Deleted', userObj);
	} else {
		return res.status(401).send(dataObjFactory('Invalid data in request body ', {}));
	}
});

const postUpdatePw = tryCatchDecorator(async (req, res) => {
	const { current, newpw, confirm } = req.body;
	const userId = req.session.user_id;

	if (userId && current) {
		const userObj = await User.findById(userId);
		if (newpw === confirm) {
			const isMatch = await bcrypt.compare(current, userObj.userpass);

			if (isMatch) {
				userObj.userpass = newpw;
				await userObj.save();
				return returnObjFactory('Password Updated', userObj);
			} else {
				return res
					.status(401)
					.send(dataObjFactory('Check Password and try again', {}));
			}
		}
	} else {
		return res.status(401).send(dataObjFactory('Invalid data in request body ', {}));
	}
});

const deleteAc = tryCatchDecorator(async (req, res) => {
	const { confirm, username } = req.body;
	const userId = req.session.user_id;

	const documentDeletor = async (collection, array) => {
		const deletedDocuments = [];
		for (const refId of array) {
			const deletedDocument = await collection.deleteMany({ _id: refId });
			if (deletedDocument) {
				deletedDocuments.push(deletedDocument);
			}
		}
		return deletedDocuments;
	};
	let deletedUser, deletedWish, deletedRead;
	const returnObj = {};

	if (confirm && username && userId) {
		deletedUser = await User.findByIdAndDelete(userId);
		if (deletedUser) {
			const wishArray = deletedUser.userwish;
			const readArray = deletedUser.userread;

			if (wishArray.length || readArray.length) {
				deletedWish = await documentDeletor(Wish, wishArray);
				deletedRead = await documentDeletor(Read, readArray);
				returnObj.deletedRefs = [...deletedWish, ...deletedRead];
			}

			if (deletedUser.userimage.url && deletedUser.userimage.filename) {
				let deletedPhoto = await cloudinary.uploader.destroy(
					deletedUser.userimage.filename
				);
				returnObj.deletedPhoto = deletedPhoto;
			}

			returnObj.deletedUser = deletedUser;
			
			return returnObjFactory('Account Deleted', returnObj);
		} else {
	
			returnObj.deletedUser = deletedUser;
			return res.status(401).send(dataObjFactory('Deletion Failed ', returnObj));
		}
	} else {
		return res.status(401).send(dataObjFactory('Invalid data in request body ', {}));
	}
});

module.exports = {
	getBookData,
	postLogin,
	postSignup,
	postWish,
	deleteBook,
	postRead,
	postRating,
	postPhoto,
	deletePhoto,
	postUpdatePw,
	deleteAc,
};
