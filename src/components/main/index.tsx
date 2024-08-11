// React imports
import { useRef } from 'react';

// App imports
import { Wrapper } from '../wrapper';
import { Sidebar } from './sidebar';
import { Maps } from './maps';
import './styles.scss';

export const Main = () => {
	const inputRef = useRef<any>(null);
	
	return (
		<Wrapper inputRef={inputRef}>
			<div ref={inputRef} className="main">
				<Sidebar/>
				<Maps/>
			</div>
		</Wrapper>
	)
}

Main.displayName="Main";