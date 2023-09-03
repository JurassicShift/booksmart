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
	const isValid = await bcrypt.compare(password, foundUser.password);
	return isValid ? foundUser : false;
};

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
