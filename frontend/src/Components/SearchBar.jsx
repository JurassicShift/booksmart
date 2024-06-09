import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	updateSearchCategory,
	replaceFetchedData,
	updateActive,
} from "../redux/slices/searchCategorySlice.js";
import { updateTitle, resetTimesSearched } from "../redux/slices/titleSlice.js";
import { updateTabs } from "../redux/slices/tabsSlice.js";
import { bookObjFactory } from "../helpers/indexHelpers.js";
import { useToast } from "../hooks/indexHooks.js";

const SearchBar = () => {
	const dispatch = useDispatch();
	const callToast = useToast();
	const title = useSelector(state => state.title.value);
	const timesSearched = useSelector(state => state.title.timesSearched);
	const searchCategory = useSelector(state => state.category.category);
	const isActive = useSelector(state => state.category.active);
	const tab = useSelector(state => state.tabs);
	const navigate = useNavigate();
	const categories = ["Title", "Author", "Genre"];

	const setSearchCategory = (cat, num) => {
		dispatch(updateSearchCategory(cat));
		dispatch(updateActive(num));
	};

	const handleSearch = async e => {
		e.preventDefault();
		const local = "http://localhost:5000/data";
		const searchTerms = e.target.searchTerms.value.trim();
		if (searchTerms !== title) {
			dispatch(resetTimesSearched());
		}
		const queryParams = new URLSearchParams({
			searchTerms: searchTerms,
			searchCategory: searchCategory,
			timesSearched: timesSearched,
		});
		const url = `${local}?${queryParams}`;

		try {
			const response = await fetch(url, { method: "GET" });
			if (!response.ok) {
				throw new Error("Network response was not ok.");
			}

			const rawData = await response.json();
			const objToArr = rawData.obj.data.items || [];
			const parsedArr = objToArr.map(book => bookObjFactory(book));
			const title = rawData.obj.title.genre;
			dispatch(replaceFetchedData(parsedArr));
			dispatch(updateTitle(title));
			e.target.searchTerms.value = null;
			if (tab !== 0) {
				dispatch(updateTabs(0));
				return navigate("/");
			}
		} catch (error) {
			callToast("warning", `${error.message}`);
		}
	};

	return (
		<search>
			<p className="app__font mt-4 mb-3">Search...</p>
			<form
				className="d-flex flex-column needs-validation"
				onSubmit={handleSearch}>
				<div
					className="btn-group mb-3"
					role="group"
					aria-label="Basic radio toggle button group">
					{categories.map((cat, idx) => {
						return (
							<React.Fragment key={`category-${idx}`}>
								<input
									type="radio"
									className="btn-check"
									name={cat}
									id={`btnradio${idx}`}
									autoComplete="off"
									checked={isActive === idx}
									onChange={() =>
										setSearchCategory(cat.toLowerCase(), idx)
									}></input>
								<label
									className="btn btn-secondary search__label"
									htmlFor={`btnradio${idx}`}>
									{cat}
								</label>
							</React.Fragment>
						);
					})}
				</div>
				<div className="input-group has-validation">
					<input
						type="text"
						className="form-control search__input"
						placeholder={`${searchCategory}...`}
						aria-label="Username"
						aria-describedby="basic-addon1"
						name="searchTerms"></input>
					<button className="btn btn-secondary" type="submit">
						<i className="bi bi-search"></i>
					</button>
					<div className="valid-feedback">Looks good!</div>
					<div className="invalid-feedback">Enter Search Term.</div>
				</div>
			</form>
		</search>
	);
};

export default SearchBar;
