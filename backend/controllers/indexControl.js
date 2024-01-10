const axios = require('axios');
const { urlSwitch } = require('../helpers/index');
const User = require('../models/user');
const Wish = require('../models/wish');
const Read = require('../models/read');
const { cloudinary } = require('../../cloudinaryConfig.js');
const bcrypt = require('bcryptjs');

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
		return res.status(201).send({
			msg: 'Data fetched',
			obj: combinedData,
		});
	} catch (e) {
		console.error(`FETCH ERROR: ${e.message}`);
		return res.status(500).send({
			msg: `Error: ${e.message}`,
			obj: e,
		});
	}
};

const postLogin = async (req, res) => {
	const { username, userpass } = req.body;
	try {
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
			return res.status(201).send({
				msg: 'Login Complete',
				obj: returnObj,
			});
		} else {
			return res.status(401).send({
				msg: 'User not found. Try again.',
				obj: {},
			});
		}
	} catch (e) {
		console.log('error:', e.message);
		return res.status(500).send({
			msg: `Error: ${e.message}`,
			obj: e,
		});
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
					imgUrl: userStatus.userimage?.url ?? '',
				};
				return res.status(201).send({
					msg: 'Signup Complete',
					obj: returnObj,
				});
			} else {
				return res.status(401).send({
					msg: 'User not found. Try again.',
					obj: {},
				});
			}
		} catch (e) {
			return res.status(500).send({
				msg: `Error: ${e.message}`,
				obj: e,
			});
		}
	} else {
		return res.status(401).send({
			msg: 'User not found. Try again.',
			obj: {},
		});
	}
};

const postWish = async (req, res) => {
	const data = req.body;
	const userId = req.session.user_id;
	if (data) {
		try {
			const user = await User.findById(userId);
			if (!user) {
				return res.status(404).send({ msg: 'User not found', obj: {} });
			}

			const wish = new Wish(data);
			await wish.save();
			user.userwish.push(wish);
			await user.save();
			const returnData = {
				_id: wish._id,
			};
			return res.status(201).send({ msg: 'Added to wish', obj: wish });
		} catch (e) {
			return res.status(500).send({ msg: `Error ${e.message}`, obj: e });
		}
	} else {
		return res
			.status(401)
			.send({ msg: `Invalid data in request body ${data}`, obj: {} });
	}
};

const postRead = async (req, res) => {
	const data = req.body;

	const userId = req.session.user_id;
	if (data) {
		try {
			const user = await User.findById(userId);
			if (!user) {
				return res.status(404).send({ msg: 'User not found', obj: {} });
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
			return res.status(201).send({ msg: 'Added to Read list.', obj: read });
		} catch (e) {
			return res.status(500).send({ msg: `Error ${e.message}`, obj: e });
		}
	} else {
		return res
			.status(401)
			.send({ msg: `Invalid data in request body.`, obj: {} });
	}
};

const postRating = async (req, res) => {
	const { id, rating } = req.params;
	const userId = req.session.user_id;

	if (id && userId) {
		try {
			const updatedItem = await Read.findByIdAndUpdate(
				id,
				{ rating: rating },
				{ new: true }
			);
			return res.status(201).send({ msg: 'Rating updated', obj: updatedItem });
		} catch (e) {
			return res.status(500).send({ msg: `Error ${e.message}`, obj: e });
		}
	} else {
		return res.status(401).send({ msg: `Invalid Request`, obj: {} });
	}
};

const deleteBook = async (req, res) => {
	const { id, list } = req.params;
	const userId = req.session.user_id;
	const pullObj = list === 'Wish' ? { userwish: id } : { userread: id };

	if (id && userId) {
		let deletedItem;
		try {
			deletedItem =
				list === 'Wish'
					? await Wish.findByIdAndDelete(id)
					: await Read.findByIdAndDelete(id);
			const deletedUserItem = await User.updateOne(
				{ _id: userId },
				{ $pull: pullObj }
			);
			return res.status(201).send({ msg: 'Item deleted', obj: deletedItem });
		} catch (e) {
			return res.status(500).send({ msg: `Error ${e.message}`, obj: e });
		}
	} else {
		return res.status(401).send({ msg: `Invalid Request`, obj: {} });
	}
};

const postPhoto = async (req, res) => {
	const userId = req.session.user_id;

	const path = req.file.path;
	const name = req.file.filename;

	if (path && name) {
		try {
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

			return res.status(201).send({ msg: 'Image updated.', obj: updatedItem });
		} catch (e) {
			console.log('ERROR: ', e);
			return res.status(500).send({ msg: `Error ${e.message}`, obj: e });
		}
	} else {
		return res.status(401).send({ msg: `Invalid Request`, obj: {} });
	}
};

const deletePhoto = async (req, res) => {
	const userId = req.session.user_id;

	if (userId) {
		try {
			const userObj = await User.findById(userId);
			if (userObj.userimage.url && userObj.userimage.filename) {
				await cloudinary.uploader.destroy(userObj.userimage.filename);
			}
			userObj.userimage.url = '';
			userObj.userimage.filename = '';
			await userObj.save();
			return res.status(201).send({ msg: 'Image deleted.', obj: userObj });
		} catch (e) {
			console.log('ERROR: ', e);
			return res.status(500).send({ msg: `Error ${e.message}`, obj: e });
		}
	} else {
		return res.status(401).send({ msg: `Invalid Request`, obj: {} });
	}
};

const postUpdatePw = async (req, res) => {
	const { current, newpw, confirm } = req.body;
	const userId = req.session.user_id;

	if (userId && current) {
		try {
			const userObj = await User.findById(userId);
			if (newpw === confirm) {
				const isMatch = await bcrypt.compare(current, userObj.userpass);

				if (isMatch) {
					userObj.userpass = newpw;
					await userObj.save();
					return res
						.status(201)
						.send({ msg: 'Password updated', obj: userObj });
				} else {
					return res
						.status(401)
						.send({ msg: 'Invalid username or password.', obj: {} });
				}
			}
		} catch (e) {
			return res.status(500).send({ msg: `Error ${e.message}`, obj: e });
		}
	} else {
		return res.status(401).send({ msg: `Invalid Request`, obj: {} });
	}
};

const deleteAc = async (req, res) => {
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
	let deletedUser;
	let deletedWish;
	let deletedRead;
	let deletedRefs;
	const returnObj = {
		msg: '',
		obj: {
			deletedUser: {},
			deletedRefs: [],
			deletedPhoto: {},
		},
	};

	if (confirm && username && userId) {
		try {
			deletedUser = await User.findByIdAndDelete(userId);
			if (deletedUser) {
				const wishArray = deletedUser.userwish;
				const readArray = deletedUser.userread;

				if (wishArray.length || readArray.length) {
					deletedWish = await documentDeletor(Wish, wishArray);
					deletedRead = await documentDeletor(Read, readArray);
					deletedRefs = [...deletedWish, ...deletedRead];
				}

				if (deletedUser.userimage.url && deletedUser.userimage.filename) {
					let deletedPhoto = await cloudinary.uploader.destroy(
						deletedUser.userimage.filename
					);
					returnObj.obj.deletedPhoto = deletedPhoto;
				}

				returnObj.msg = 'Account deleted';
				returnObj.obj.deletedUser = deletedUser;
				returnObj.obj.deletedRefs = deletedRefs;
				return res.status(201).send(returnObj);
			} else {
				returnObj.msg = 'Deletion failed';
				returnObj.obj.deletedUser = deletedUser;
				return res.status(401).send(returnObj);
			}
		} catch (e) {
			return res.status(401).send({ msg: `ERROR: ${e.message}`, obj: {} });
		}
	} else {
		return res.status(401).send({ msg: `Invalid request `, obj: {} });
	}
};

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
