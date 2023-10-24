import { useSelector, useDispatch } from 'react-redux';

const Sort = () => {
	const sortTitles = ['Author', 'Year', 'Rating'];
    const tab = useSelector(state => state.tabs.active);
    const read = useSelector(state => state.read);
    const wish = useSelector(state => state.wish);

    const handleSort = e => {
        console.log("e:", e.target.name);
        console.log("read", read);
        // const sortedData = [...read].sort((a, b) => {
        //     return a.author[0].split(' ')[-1] - b.author[0].split(' ')[-1];
        // } )

        const initialSort = [...read].map((book) => {
            const splitName = book.author[0].split(' ');
            return splitName[splitName.length > 0 ? splitName.length - 1 : 0];
        } )
        initialSort.sort();

        const sortedData = [...read].map((book, idx) => {
                if(book.author.includes(initialSort[idx])) {
                    return book;
                }
        } )

        console.log("sortedData:", sortedData)
    }
	return (
		<div className="container mt-4 d-flex justify-content-end">
			<div className="dropdown">
				<button
					className="btn btn-secondary btn-sm dropdown-toggle"
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Sort by
				</button>
				<ul className="dropdown-menu">
                    <div className="d-flex">
                    {sortTitles.map((title, idx) => {
				return (
					<li key={title + idx} className="px-1">
						<button
							type="radio"
							className={`btn`}
							name={title}
							id={title + idx}
							autoComplete="off"
                            onClick={(e) => handleSort(e)}
						></button>
						<label className={`btn btn-sm bg-colour-light-${idx + 1}`} htmlFor={title + idx}>
							{title}
						</label>
					</li>
				);
			})}
                    </div>
             
                </ul>
			</div>

		
		</div>
	);
};

export default Sort;
