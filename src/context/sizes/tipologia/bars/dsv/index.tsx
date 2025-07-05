// React imports
import { useState, useContext, createContext } from 'react';

const DsvBarsSizesContext: React.Context<any> = createContext(null)

export const useDsvBarsSizes = () => {
	return (
		useContext(DsvBarsSizesContext)
	)
}

export const DsvBarsSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 5, bottom: 5, right: 60, left: 60 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<DsvBarsSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</DsvBarsSizesContext.Provider>
	)
}

DsvBarsSizesContext.displayName = "DsvBarsSizesContext";