export const dateProducer = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = (now.getMonth() + 1).toString().padStart(2, '0');
	const day = now.getDate().toString().padStart(2, '0');
	const formattedDate = `${day}-${month}-${year}`;
	return formattedDate;
};

export const fetcher = async (route, method, payload = {}) => {
	const local = 'http://localhost:5000/';

	if (typeof route === 'string' && typeof method === 'string') {
		try {
			let additionalData =
				method !== 'GET' && method !== 'DELETE'
					? {
							method: method,
							credentials: 'include',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify(payload),
					  }
					: { method: method, credentials: 'include' };
			const response = await fetch(local + route, additionalData);
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(`Network response was not ok. ${errorData.msg}`);
			}

			const rawData = await response.json();

			return rawData;
		} catch (error) {
			throw new Error(`Error: ${error}`);
		}
	} else {
		throw new Error('Internal Error, try again.');
	}
};

export const capitalizer = str => {
	return str[0].toUpperCase() + str.slice(1);
};

const authorParse = arr => {
	const splitName = arr[0].split(' ');
	return splitName[
		splitName.length > 0 ? splitName.length - 1 : 0
	].toLowerCase();
};

const publicationDateParse = str => {
	const newDate = new Date(str);
	const year = newDate.getFullYear();
	return year;
};

export const bookObjFactory = b => {
	return {
		book_id: b.id,
		title: b.volumeInfo.title,
		author: b.volumeInfo.authors[0],
		authorparse: authorParse(b.volumeInfo.authors),
		rating: b.volumeInfo?.averageRating ?? 0,
		thumbnail: b.volumeInfo.imageLinks?.smallThumbnail ?? '',
		publisheddate: publicationDateParse(b.volumeInfo.publishedDate),
		date: dateProducer(),
	};
};

export const toastObjFactory = (type, notice) => {
	return {
		active: true,
		notice: notice,
		type: type,
	};
};

export const gridSpaceSelect = screen => {
	const gridSpace = ['g-3', 'g-4', 'g-5'];
	if (screen < 576) {
		return gridSpace[0];
	} else if (screen >= 576) {
		return gridSpace[1];
	}
};

export const marginFactory = (dataLength, screenWidth, mapIdx) => {
	const margAdder = {
		marginBottom: '20px',
	};

	if (screenWidth <= 575 && dataLength === mapIdx + 1) {
		return margAdder;
	} else if (screenWidth > 575) {
		if (dataLength % 2 === 0 && dataLength - 2 === mapIdx) {
			return margAdder;
		} else if (dataLength === mapIdx + 1) {
			return margAdder;
		} else {
			return null;
		}
	} else {
		return null;
	}
};

export const labelNameFactory = num => {
	let labelName;
	switch (num) {
		case 0:
			labelName = 'Current Password';
			break;
		case 1:
			labelName = 'New Password';
			break;
		case 2:
			labelName = 'Confirm New Password';
			break;
		default:
			labelName = 'Current Password';
			break;
	}
	return labelName;
};

const validationObjFactory = errorArr => {
	const test = errorArr.length > 0;

	const validationObj = {
		valid: test ? false : true,
		errors: test ? errorArr : [],
	};

	return validationObj;
};

export const pwValidation = obj => {
	const errors = [];

	const { current, newpw, confirm } = obj;

	if (!current || !newpw || !confirm) {
		errors.push({ msg: 'Please complete all fields.' });
	}
	if (newpw !== confirm) {
		errors.push({ msg: "Passwords don't match." });
	}
	if (newpw.length < 8 || confirm.length < 8) {
		errors.push({ msg: 'Passwords must be at least 8 characters.' });
	}

	const validationObj = validationObjFactory(errors);

	return validationObj;
};

export const deletePwValidation = pwConfirmation => {
	const errors = [];

	if (!pwConfirmation) {
		errors.push({ msg: 'Field cannot be empty.' });
	}

	if (pwConfirmation.length < 8) {
		errors.push({ msg: 'Passwords must be at least 8 characters.' });
	}

	const validationObj = validationObjFactory(errors);

	return validationObj;
};

export const stringifyErrors = errorArr => {
	let errorStr;

	errorArr.forEach((error, idx) => {
		if (idx === 0) {
			errorStr = error.msg;
		} else {
			errorStr += ' ' + error.msg;
		}
	});

	return errorStr;
};

export const errorMsgFactory = formTarget => {
	let msg;
	switch (formTarget) {
		case 'Update':
			msg = 'Password update failed.';
			break;
		case 'Delete':
			msg = 'Deletion Failed';
			break;
		case 'Login':
			msg = 'Login Failed';
			break;
		case 'SignUp':
			msg = 'Failed to Sign up user';
			break;
		default:
			msg = 'Something went wrong';
	}
	return msg;
};

export const toastMsgFactory = (response, formTarget) => {
		let msg;
		switch (formTarget) {
			case 'Update':
				msg = `Password Updated ${response.obj.username}`;
				break;
			case 'Delete':
				msg = `${response.obj.deletedUser.username}'s account deleted`;
				break;
			case 'Login':
				msg = `Welcome back ${response.obj.username}`;
				break;
			case 'SignUp':
				msg = `Welcome ${response.obj.username}`;
				break;
			default:
				msg = 'Something went wrong';
		}
		return msg;
	};

	export const animateDummyClass = formTarget => {
		let cssClass;
		switch (formTarget) {
			case 'Update':
				cssClass = 'profile__form-dummy';
				break;
			case 'Delete':
				cssClass = 'profile__form-dummyDelete';
				break;
			case 'Login':
				cssClass = 'profile__form-dummyLogin';
				break;
			case 'SignUp':
				cssClass = `profile__form-dummySignUp`;
				break;
			default:
				cssClass = 'profile__form-dummy';
		}
		return cssClass;
	}

	export const reverseAnimateDummyClass = formTarget => {
		let cssClass;
		switch (formTarget) {
			case 'Update':
				cssClass = 'profile__form-dummyReverse';
				break;
			case 'Delete':
				cssClass = 'profile__form-dummyReverseDelete';
				break;
			case 'Login':
				cssClass = 'profile__form-dummyReverseLogin';
				break;
			case 'SignUp':
				cssClass = `profile__form-dummyReverseSignUp`;
				break;
			default:
				cssClass = 'profile__form-dummyReverse';
		}
		return cssClass;
	}
