

import {  useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { updateRating } from '../redux/slices/readSlice';
import { fetcher, toastObjFactory  } from '../helpers/indexHelpers';
import { updateToast } from '../redux/slices/toastSlice';


const Stars = ({ starValue, bookid }) => {

	const dispatch = useDispatch();


	const ratingChanged = newRating => {
		const url = `postrating/${bookid}/${newRating}`;
		const ratingData = {
				_id: bookid, rating: newRating 
		};

		fetcher(url, "POST")
		.then(response => {
			const r = response.obj;
			dispatch(updateRating(ratingData));
			dispatch(
				updateToast(toastObjFactory('success', `${r.title} rated ${r.rating} stars!`))
			);
		} 
		)
		.catch(error => {
			dispatch(
				updateToast(toastObjFactory('warning', `Something went wrong: ${error}`))
			);
		})
		
		
	};

	const starStyle = {
		marginTop: '10px',
		marginBottom: '5px',
	};
	const heighty = {
		lineHeight: '24px',
	};
	return (
		<div style={starStyle}>
			<span style={heighty}>My Rating:</span>
			<ReactStars
			 key={`stars_${starValue}`}
				count={5}
				isHalf={true}
				onChange={ratingChanged}
				size={24}
				color2={'#ffd700'}
				value={starValue}
			/>
		</div>
	);
};

export default Stars;
