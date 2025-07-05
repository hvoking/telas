// React imports
import { useRef } from 'react';

// App imports
import { Wrapper } from './wrapper';
import { Sidebar } from './sidebar';
import { Maps } from './maps';
import './styles.scss';

export const App = () => {
	const inputRef = useRef<any>(null);
	
	return (
		<Wrapper>
			<Sidebar/>
			<Maps/>
		</Wrapper>
	)
}

App.displayName="App";