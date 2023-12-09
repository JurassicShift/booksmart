
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar.jsx';
import SearchTabs from './SearchTabs.jsx';
import Sort from './SortBtns.jsx';

const TabsAndSearch = ({wish, read}) => {
    const tab = useSelector(state => state.tabs.active);
	return (
		<div className="container limiter">
			<SearchTabs />
			<SearchBar />
			{tab !== 0 && <Sort wish={wish} read={read} />}
		</div>
	);
};

export default TabsAndSearch;
