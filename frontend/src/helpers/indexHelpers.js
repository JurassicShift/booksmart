export const dateProducer = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = (now.getMonth() + 1).toString().padStart(2, "0");
	const day = now.getDate().toString().padStart(2, "0");
	const formattedDate = `${day}-${month}-${year}`;
	return formattedDate;
};

export const fetcher = async (route, method, payload = {}) => {
	const local = "http://localhost:5000/";

	if (typeof route === "string" && typeof method === "string") {
		try {
			let additionalData =
				method !== "GET" && method !== "DELETE"
					? {
							method: method,
							credentials: "include",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(payload),
					  }
					: { method: method, credentials: "include" };
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
		throw new Error("Internal Error, try again.");
	}
};

export const capitalizer = str => {
	return str[0].toUpperCase() + str.slice(1);
};

const authorParse = arr => {
	const splitName = arr[0].split(" ");
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
		thumbnail: b.volumeInfo.imageLinks?.smallThumbnail ?? "",
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
	const gridSpace = ["g-3", "g-4", "g-5"];
	if (screen < 576) {
		return gridSpace[0];
	} else if (screen >= 576) {
		return gridSpace[1];
	}
};

export const marginFactory = (dataLength, screenWidth, mapIdx) => {
	const margAdder = {
		marginBottom: "20px",
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
			labelName = "Current Password";
			break;
		case 1:
			labelName = "New Password";
			break;
		case 2:
			labelName = "Confirm New Password";
			break;
		default:
			labelName = "Current Password";
			break;
	}
	return labelName;
};

export const toastMsgFactory = (response, formTarget) => {
	let msg;
	switch (formTarget) {
		case "UpdatePassword":
			msg = `Password Updated ${response.obj.username}`;
			break;
		case "DeleteAccount":
			msg = `${response.obj.deletedUser.username}'s account deleted`;
			break;
		case "Login":
			msg = `Welcome back ${response.obj.username}`;
			break;
		case "SignUp":
			msg = `Welcome ${response.obj.username}`;
			break;
		default:
			msg = "Something went wrong";
	}
	return msg;
};

export const animateDummyClass = formTarget => {
	let cssClass;
	switch (formTarget) {
		case "Update":
			cssClass = "profile__form-dummy";
			break;
		case "Delete":
			cssClass = "profile__form-dummyDelete";
			break;
		case "Login":
			cssClass = "profile__form-dummyLogin";
			break;
		case "SignUp":
			cssClass = `profile__form-dummySignUp`;
			break;
		default:
			cssClass = "profile__form-dummy";
	}
	return cssClass;
};

export const reverseAnimateDummyClass = formTarget => {
	let cssClass;
	switch (formTarget) {
		case "Update":
			cssClass = "profile__form-dummyReverse";
			break;
		case "Delete":
			cssClass = "profile__form-dummyReverseDelete";
			break;
		case "Login":
			cssClass = "profile__form-dummyReverseLogin";
			break;
		case "SignUp":
			cssClass = `profile__form-dummyReverseSignUp`;
			break;
		default:
			cssClass = "profile__form-dummyReverse";
	}
	return cssClass;
};

export const stateParser = state => {
	const obj = {};
	for (let key in state) {
		obj[key] = state[key].value;
	}
	return obj;
};

export function checkResDataDuplication(data) {
	return data.filter(
		(obj, idx, array) =>
			!array.slice(0, idx).some(item => item.title === obj.title)
	);
}

export function checkDuplicateLists(newBooks, existingBooks) {
	const existingBookIds = new Set(existingBooks.map(book => book.book_id));
	return newBooks.filter(book => {
		return !existingBookIds.has(book.book_id);
	});
}

export function bookObjCreator(arr) {
	return arr.map(book => bookObjFactory(book));
}

export function filterToTenBooks(arr) {
	return arr.filter((_, idx) => !(idx > 9));
}

export function argumentsSelector(book, type) {
	const newObj = {
		...book,
		date: dateProducer(),
	};

	return type === "wish"
		? ["wishadd", "POST", book]
		: ["readadd", "POST", newObj];
}
