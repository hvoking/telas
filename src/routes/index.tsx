// App imports
import { Main } from '../components/main';

// Third party imports
import { Routes, Route } from 'react-router-dom';

export const YuRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Main/>}/>
		</Routes>
	)
}

YuRoutes.displayName="YuRoutes"