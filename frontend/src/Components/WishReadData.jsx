import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addReadBook, removeReadBook } from '../redux/slices/readSlice';
import { removeBook } from '../redux/slices/wishSlice';
import { updateToast } from '../redux/slices/toastSlice';
import { updateTabs } from '../redux/slices/tabsSlice';
import { fetcher, toastObjFactory, gridSpaceSelect, marginFactory } from '../helpers/indexHelpers';
import Stars from './Stars';
import useWindowWidth from '../hooks/indexHooks.js';


const WishReadData = ({ list, bookData }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const width = useWindowWidth();

	const handleSelection = e => {
		const selectionType = e.target.getAttribute('data-button-type');
		const bookId = e.target.getAttribute('data-book-id');
		const b = bookData.find(book => book._id === bookId);
		const urlBookDelete = `bookdelete/${bookId}/${list}`;
		const urlRead = 'readadd';

		if (selectionType === 'read') {
			fetcher(urlRead, 'POST', b)
				.then(response => {
					if (!response._id || !response.title) {
						throw new Error();
					}
					dispatch(addReadBook(b));
					dispatch(
						updateToast(toastObjFactory('success', `${response.title} added to Read`))
					);
					dispatch(removeBook(b._id));
					dispatch(updateTabs(2));
					navigate('/read');
				})
				.catch(error => {
					dispatch(updateToast(toastObjFactory('warning', `${error.message}`)));
				});
		} else {
			fetcher(urlBookDelete, 'DELETE')
				.then(response => {
					if (!response.deletedItem._id || !response.deletedItem.title) {
						throw new Error();
					}
					dispatch(list === 'Wish' ? removeBook(b._id) : removeReadBook(b._id));
					dispatch(updateToast(toastObjFactory('success', `${response.deletedItem.title} deleted!`)));
				})
				.catch(error => {
					dispatch(updateToast(toastObjFactory('warning', `${error.message}`)));
				});
		}
	};

	const imgBase = {
		height: '185px',
		width: '120px',
	};

	const colFlex = {
		display: 'flex',
		justifyContent: 'center',
	};

	const dateStyle = {
		marginTop: '10px',
	};

	const arrLength = bookData.length;
	const gridSpace = gridSpaceSelect(width);

	return (
		<>
		<p className="mb-3 app__font-title">{list}</p>
			<div className="text-dark data__window container">
				<div className="row ">
					

					{bookData.length === 0 ? (
						<p>Loading...</p>
					) : (
						bookData.map((book, idx) => (
							<div className={`col-12 col-sm-6 ${gridSpace}`} style={colFlex} key={idx}>
								<div className="data__card bg-colour-light" 	style={marginFactory(arrLength, width, idx)}>
									{book && book.thumbnail ? (
										<img
											src={book.thumbnail}
											className="data__card-img-top"
											alt={book.title}
											style={imgBase}
										></img>
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
											<p className="data__card-author">{`Published: ${book.publisheddate}`}</p>
											<p className="data__card-author" style={dateStyle}>
												{list === 'Wish'
													? `Date added: ${book.date}`
													: `Date completed: ${book.date}`}
											</p>
											<div className="data__card-author">
												{list === 'Wish' ? (
													`Avg Rating: ${book.rating}`
												) : (
													<Stars starValue={book.rating} bookid={book._id} />
												)}
											</div>
										</div>
										<div className="data__card-btns">
											{list === 'Wish' && (
												<button
													className="btn base-btn"
													data-button-type="read"
													data-book-id={book._id}
													onClick={handleSelection}
												>
													+ Read
												</button>
											)}
											<button
												className="btn base-btn"
												data-button-type="delete"
												data-book-id={book._id}
												onClick={handleSelection}
											>
												Delete
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

WishReadData.propTypes = {
	list: PropTypes.string,
	bookData: PropTypes.array,
};

export default WishReadData;
