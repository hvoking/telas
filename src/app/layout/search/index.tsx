// App imports
import { Bar } from './bar';
import { Suggestions } from './suggestions';
import './styles.scss';

export const Search = ({ activeSearch, setActiveSearch }: any) => {
	return (
		<div className="search-wrapper">
			<Bar/>
			<Suggestions/>
		</div>
	)
}

Search.displayName="Search";