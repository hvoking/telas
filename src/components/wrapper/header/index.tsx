// React imports
import { useState } from 'react';

// App imports
import { LogoGenerativa } from './logo';
import { Search } from './search';
import './styles.scss';

export const Header = ({ inputRef }: any) => {
	const [ activeSearch, setActiveSearch ] = useState(false);
	
	return (
		<div className="yu-header">
			<div className="normal-yu-header"><LogoGenerativa/></div>
			<div></div>
			<Search 
				activeSearch={activeSearch} 
				setActiveSearch={setActiveSearch}
			/>
		</div>
	)
}

Header.displayName="Header"