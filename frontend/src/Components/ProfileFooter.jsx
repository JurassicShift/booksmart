import { useSelector } from 'react-redux';

const ProfileFooter = () => {

    const wish = useSelector(state => state.wish);
	const read = useSelector(state => state.read);

    return (
        <div
				className="btn-group mb-3"
				role="group"
				aria-label="Basic radio toggle button group"
				style={{ width: '100%' }}
			>
				<input
					type="radio"
					className="btn-check"
					name="author"
					id="btnradio2"
					autoComplete="off"
				></input>
				<label className="btn btn-secondary" htmlFor="btnradio2">
					<i className="bi bi-star"></i>
					<p>{wish.data.length}</p>
				</label>
				<input
					type="radio"
					className="btn-check"
					name="title"
					id="btnradio1"
					autoComplete="off"
				></input>
				<label className="btn btn-secondary" htmlFor="btnradio1">
					<i className="bi bi-book"></i>
					<p>{read.data.length}</p>
				</label>

				<input
					type="radio"
					className="btn-check"
					name="genre"
					id="btnradio3"
					autoComplete="off"
				></input>
				<label className="btn btn-secondary" htmlFor="btnradio3">
					Last Updated:
					<p>{wish.date >= read.date ? wish.date : read.date}</p>
				</label>
			</div>
    )
}

export default ProfileFooter;