// React imports
import { useState, useContext, createContext } from 'react';

const RoomsBarsSizesContext: React.Context<any> = createContext(null)

export const useRoomsBarsSizes = () => {
	return (
		useContext(RoomsBarsSizesContext)
	)
}

export const RoomsBarsSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 5, bottom: 5, right: 20, left: 20 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<RoomsBarsSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</RoomsBarsSizesContext.Provider>
	)
}

RoomsBarsSizesContext.displayName = "RoomsBarsSizesContext";