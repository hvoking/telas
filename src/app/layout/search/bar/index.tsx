// App imports
import './styles.scss';

// Context imports
import { useMapboxSearchApi } from 'context/api/mapbox/search';
import { useSearch } from 'context/search';

export const Bar = () => {
	const { handleChange, handleKeyDown } = useSearch();
	const { searchText } = useMapboxSearchApi();

	return (
		<input 
			className="search-input"
			type="text" 
			placeholder="find a place..."
			value={searchText}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			spellCheck={false}
		/>
	)
}

Bar.displayName="Bar";