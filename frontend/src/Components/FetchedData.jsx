import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTitle } from "../redux/slices/titleSlice.js";
import {
	updateFetchedData,
	removeDataItem,
} from "../redux/slices/searchCategorySlice.js";
import {
	fetcher,
	capitalizer,
	gridSpaceSelect,
	marginFactory,
	checkDuplicateLists,
	checkResDataDuplication,
	bookObjCreator,
	argumentsSelector,
} from "../helpers/indexHelpers.js";
import { addBook } from "../redux/slices/wishSlice.js";
import { addReadBook } from "../redux/slices/readSlice.js";
import { updateTabs } from "../redux/slices/tabsSlice.js";
import { incrementTimesSearched } from "../redux/slices/titleSlice.js";
import useWindowWidth from "../hooks/indexHooks.js";
import FetchLoader from "./FetchLoader.jsx";
import { useToast } from "../hooks/indexHooks.js";

const FetchedData = ({ homePageBookData = [] }) => {
	const title = useSelector(state => state.title.value);
	const timesSearched = useSelector(state => state.title.timesSearched);
	const loggedIn = useSelector(state => state.login.active);
	const searchCategory = useSelector(state => state.category.category);
	const readBookList = useSelector(state => state.read.data);
	const wishBookList = useSelector(state => state.wish.data);
	const whichTab = useSelector(state => state.tabs.active);
	const width = useWindowWidth();
	const callToast = useToast();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// const [fireUseEffect, setFireUseEffect] = useState(false);

	useEffect(() => {
		if (whichTab !== 0) dispatch(updateTabs(0));
	}, []);

	useEffect(() => {
		fetchData();
	}, [homePageBookData]);

	async function fetchData() {
		console.log("hit fetchData!");
		if (homePageBookData.length >= 10) {
			return;
		}

		if (homePageBookData.length === 9) {
			dispatch(incrementTimesSearched());
		}
		try {
			const queryParams = new URLSearchParams({
				searchTerms: title,
				searchCategory: searchCategory,
				timesSearched: timesSearched,
			});

			const base = "http://localhost:5000/data";
			const url =
				homePageBookData.length === 9 ? `${base}?${queryParams}` : base;

			const response = await fetch(url, {
				method: "GET",
				credentials: "include",
			});
			if (!response.ok) {
				throw new Error("Network response not ok in fetchData");
			}

			const data = await response.json();
			const booksResponseData = data?.obj?.data?.items || [];

			if (booksResponseData.length === 0) {
				throw new Error("Check search terms. No items found");
			}

			dispatch(updateTitle(data?.obj?.title?.genre));

			return removeDuplicates(booksResponseData);
		} catch (e) {
			console.log(`ERROR MESSAGE: ${e.message}`);
			dispatch(updateTitle("Loading data..."));
			callToast("warning", "Server not responding");
		}
	}

	function removeDuplicates(responseData) {
		const parsedBooksResData = bookObjCreator(responseData);

		const existingBookLists = loggedIn
			? [...homePageBookData, ...readBookList, ...wishBookList]
			: homePageBookData;

		const uniqueBooksData = checkDuplicateLists(
			checkResDataDuplication(parsedBooksResData),
			existingBookLists
		);

		updateState(uniqueBooksData);
	}

	function updateState(booksData) {
		if (!homePageBookData.length || homePageBookData.length < 10) {
			const count = 10 - homePageBookData.length;
			const slicedArr = booksData.slice(0, count);
			return dispatch(updateFetchedData(slicedArr));
		}
	}

	const handleSelection = e => {
		if (!loggedIn)
			return callToast("information", "Please login or create account");

		const selectionType = e.target.getAttribute("data-button-type");
		const bookId = e.target.getAttribute("data-book-id");

		const bookObj = homePageBookData.find(book => book.book_id === bookId);
		if (bookObj) {
			const argumentsArr = argumentsSelector(bookObj, selectionType);

			fetcher(...argumentsArr)
				.then(response => {
					if (!response.obj._id || !response.obj.title) {
						throw new Error();
					}
					dispatch(
						selectionType === "wish"
							? addBook(response.obj)
							: addReadBook(response.obj)
					);
					dispatch(removeDataItem(response.obj.book_id));
					callToast("success", `${bookObj.title} added to wishlist!`);
					dispatch(updateTabs(selectionType === "wish" ? 1 : 2));
					fetchData();
					// setFireUseEffect(value => !value);
					return navigate(selectionType === "wish" ? "/wish" : "/read");
				})
				.catch(error => {
					callToast("warning", `${bookObj.title} failed to hit wishlist!`);
				});
		}
	};

	const imgBase = {
		height: "185px",
		width: "120px",
	};

	const colFlex = {
		display: "flex",
		justifyContent: "center",
	};

	const arrLength = homePageBookData.length || 0;
	const gridSpace = gridSpaceSelect(width);

	return (
		<>
			<p className="mb-3 app__font-title">
				{title ? capitalizer(title) : "Loading"}
			</p>
			<div className="text-dark data__window container">
				<div className="row">
					{homePageBookData.length === 0 ? (
						<FetchLoader />
					) : (
						homePageBookData.map((book, idx) => (
							<div
								className={`col-12 col-sm-6 ${gridSpace}`}
								style={colFlex}
								key={book.book_id + idx}>
								<div
									className="data__card bg-colour-light"
									style={marginFactory(arrLength, width, idx)}>
									{book.thumbnail && book.thumbnail !== "" ? (
										<img
											src={book.thumbnail}
											className="data__card-img-top"
											alt={book.title}
											style={imgBase}></img>
									) : (
										<div className="data__card-placeholder">
											<p>No</p>
											<p>Thumbnail</p>
											<p>Available</p>
										</div>
									)}
									<div className="data__card-body">
										<div className="data__card-info">
											<h5 className="data__card-title">{book.title}</h5>
											<p className="data__card-author">{book.author}</p>
										</div>
										<div className="data__card-btns">
											<button
												className="btn base-btn"
												data-button-type="wish"
												data-book-id={book.book_id}
												onClick={handleSelection}>
												+ Wish
											</button>
											<button
												className="btn base-btn"
												data-button-type="read"
												data-book-id={book.book_id}
												onClick={handleSelection}>
												+ Read
											</button>
										</div>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
};

export default FetchedData;
