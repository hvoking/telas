// React imports
import { useState, useContext, createContext } from 'react';

const RoomsGaugeSizesContext: React.Context<any> = createContext(null)

export const useRoomsGaugeSizes = () => {
	return (
		useContext(RoomsGaugeSizesContext)
	)
}

export const RoomsGaugeSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 0, bottom: 10, right: 5, left: 5 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<RoomsGaugeSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</RoomsGaugeSizesContext.Provider>
	)
}

RoomsGaugeSizesContext.displayName = "RoomsGaugeSizesContext";