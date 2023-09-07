const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Username is required!'],
	},
	useremail: {
		type: String,
		required: [true, 'Email is required!'],
	},
	userpass: {
		type: String,
		required: [true, 'Password is required!'],
	},
	userimage:
	{
		url: String,
		filename: String
	},
	userwish: [
		{
			type: Schema.Types.ObjectId,
			ref: 'UserWish',
		},
	],
	userread: [
		{
			type: Schema.Types.ObjectId,
			ref: 'UserRead',
		},
	],
});

userSchema.statics.findAndValidate = async function (username, password) {

	const foundUser = await this.findOne({ username });
	const isValid = await bcrypt.compare(password, foundUser.userpass);
	return isValid ? foundUser : false;
};

userSchema.pre('save', async function (next) {
	
	if (!this.isModified('userpass')) return next();
	this.userpass = await bcrypt.hash(this.userpass, 12);
	next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
