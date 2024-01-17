import Spinner from './Spinner';
import { gridSpaceSelect } from '../helpers/indexHelpers';
import useWindowWidth from '../hooks/indexHooks.js';

const FetchLoader = ({ bookCollection = 'home' }) => {
	const width = useWindowWidth();
	const gridSpace = gridSpaceSelect(width);
	const clarification =
		bookCollection === 'home'
			? '...server may not be responding.'
			: bookCollection === 'Wish'
			? "Add books you'd like to read or..."
			: "Add and rate books you've read or...";
	const handleRefresh = () => {
		return window.location.reload();
	};

	const colFlex = {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
	};
	const marginBt = {
		marginBottom: '40px',
	};
	return (
		<div className={`col-12 col-sm-6 ${gridSpace}`} style={colFlex}>
			<div className="data__card bg-colour-light" style={marginBt}>
				<div className="data__card-placeholder">
					<Spinner />
				</div>

				<div className="data__card-body">
					<div className="data__card-info">
						<h5 className="data__card-title">Loading...</h5>
						<p className="data__card-author">{clarification}</p>
					</div>
					<div className="data__card-btns">
						<button className="btn base-btn" onClick={handleRefresh}>
							Reload Books
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FetchLoader;
