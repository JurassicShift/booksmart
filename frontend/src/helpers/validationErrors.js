const validationObjFactory = errorArr => {
	const obj = {};
	const validationObj = {
		valid: errorArr.length > 0 ? false : true,
		errors:  [],
		fields: []
	};
	const msg = "msg";
	errorArr.forEach(error => {
		obj[error[msg]] = (obj[error[msg]] ?? 0) + 1;
		validationObj.fields = [...validationObj.fields, error["field"]];
	})
	
	for(const key in obj) {
		validationObj.errors = [...validationObj.errors, key];
	}

	return validationObj;
};

const errorObjBuilder = (msg, field) => ({msg, field});

const checkForEmptyField = (expectedFields, formData) => {
	const msg = 'Fields cannot be empty';
	let returnArr = [];
	expectedFields.forEach(key => {
		if (!formData[key]) {
			 returnArr.push(errorObjBuilder(msg, key));
		}
	});
	return returnArr;
};

const checkForPwLength = (passwords, field) => {
	const msg = 'Passwords must be at least 8 characters';
	let returnArr = [];
	passwords.forEach((pw, idx) => {
		if (pw.length < 8) {
			return returnArr.push(errorObjBuilder(msg, field[idx]));
		}
	});
	return returnArr;
};

const updatePwValidation = dataObj => {

	const { newpw, confirm } = dataObj;
	const expectedFields = ["current", "newpw", "confirm"];
	let errors = [...checkForEmptyField(expectedFields, dataObj), ...checkForPwLength([newpw, confirm], ["newpw", "confirm"])];

	if (newpw !== confirm) {
		const msg = "Passwords don't match";
		errors = [...errors, errorObjBuilder(msg, "newpw"), errorObjBuilder(msg, "confirm")]
	}

	const validationObj = validationObjFactory(errors);

	return validationObj;
};

const deleteAcPwValidation = dataObj => {
	const { confirm } = dataObj;
	const expectedFields = ['confirm'];
	const errors = [
		...checkForEmptyField(expectedFields, dataObj),
		...checkForPwLength([confirm], expectedFields),
	];

	const validationObj = validationObjFactory(errors);

	return validationObj;
};

const loginValidation = dataObj => {
	const { userpass } = dataObj;
	const expectedFields = ['username', 'userpass'];

	const errors = [
		...checkForEmptyField(expectedFields, dataObj),
		...checkForPwLength([userpass], ['userpass']),
	];

	const validationObj = validationObjFactory(errors);

	return validationObj;
};

const signUpValidation = dataObj => {
	const { useremail, userpass, userconfirm } = dataObj;
	const expectedVariables = [
		'username',
		'useremail',
		'userpass',
		'userconfirm',
	];

	const fieldReturns = ["userpass", "userconfirm"];

	let errors = [
		...checkForEmptyField(expectedVariables, dataObj),
		...checkForPwLength([userpass, userconfirm], fieldReturns),
	];

	if (userpass !== userconfirm) {
		const msg = 'Passwords do not match';
		errors = [
			...errors,
			errorObjBuilder(msg, fieldReturns[0]),
			errorObjBuilder(msg, fieldReturns[1]),
		];
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailRegex.test(useremail)) {
		const msg = 'Check email address is valid';
		errors = [...errors, errorObjBuilder(msg, expectedVariables[1])];
	}

	const validationObj = validationObjFactory(errors);

	return validationObj;
};

export const validations = (formType, formData) => {
	let validation;
	switch (formType) {
		case 'Login':
			validation = loginValidation(formData);
			break;
		case 'SignUp':
			validation = signUpValidation(formData);
			break;
		case 'UpdatePassword':
			validation = updatePwValidation(formData);
			break;
		case 'DeleteAccount':
			validation = deleteAcPwValidation(formData);
			break;
		default:
			validation = {
				valid: false,
				errors: ['Something went wrong'],
				fields: []
			};
	}
	return validation;
};
export const concatErrors = errorArr => {
	let errorStr;

	errorArr.forEach((error, idx) => {
		if (idx === 0) {
			errorStr = error;
		} else {
			errorStr += ', ' + error;
		}
	});
	return errorStr;
};

export const errorMsgFactory = formTarget => {
	let msg;
	switch (formTarget) {
		case 'UpdatePassword':
			msg = 'Password update failed';
			break;
		case 'DeleteAccount':
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