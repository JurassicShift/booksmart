import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateTitle } from '../redux/slices/titleSlice.js';
import { updateFetchedData } from '../redux/slices/searchCategorySlice.js';


const FetchedData = () => {
	const local = 'http://localhost:5000/data';

	const title = useSelector(state => state.title.value);
	const fetchedData = useSelector(state => state.category.value.data);
	const dispatch = useDispatch();

	const capitalizer = (str) => {
		return str[0].toUpperCase() + str.slice(1);
	}

	const handleSelection = (e) => {
		const selectionType = e.target.getAttribute("data-button-type");
		const bookId = e.target.getAttribute("data-book-id");
		const book = fetchedData.filter(book => book.id === bookId);
		console.log("BOOK", book);
		console.log("SELECTON:", selectionType);
		console.log("BOOKID:", bookId);
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(local, { method: 'GET' });
				if (!response.ok) {
					throw new Error('Network response was not ok.');
				}

				const rawData = await response.json();
				const objToArr = rawData.data.items || [];
				const genre = rawData.title;
				dispatch(updateTitle(genre.genre));
				dispatch(updateFetchedData(objToArr));
			} catch (error) {
				console.log('MY BIG ERROR:', error);
			}
		};

		fetchData();
	}, []);

	const imgBase = {
		height: '185px',
		width: '120px',
	};

	const colFlex = {
		display: 'flex',
		justifyContent: 'center',
	};

	return (
		<>
		<div className="text-dark data__window container">
			<div className="row mb-5 ">
				{<p className="mb-3 app__sub-font">{capitalizer(title)}</p>}
				{fetchedData.length === 0 ? (
					<p>Loading...</p>
				) : (
					fetchedData.map((book, idx) => (
						<div className="col-12 col-sm-6 g-0" style={colFlex} key={book.id}>
							<div className="data__card bg-colour-light">
								{book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail ? (
									<img
										src={
											
											book.volumeInfo.imageLinks.smallThumbnail
										}
										className="data__card-img-top"
										alt={book.volumeInfo.title}
										style={imgBase}
									></img>
								) : (
									<div className="data__card-placeholder">
										<p>No Thumbnail Available</p>
									</div>
								)}
								<div className="data__card-body">
									<div className="data__card-info">
										<h5 className="data__card-title">
											{book.volumeInfo.title}
										</h5>
										<p className="data__card-author">
											{book.volumeInfo.authors}
										</p>
									</div>
									<div className="data__card-btns">
										<button className='btn base-btn' data-button-type="wish" data-book-id={book.id} onClick={handleSelection}>+ Wish</button>
										<button className='btn base-btn' data-button-type="read" data-book-id={book.id} onClick={handleSelection}>+ Read</button>
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
