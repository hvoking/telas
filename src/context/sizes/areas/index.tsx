// React imports
import { useState, useContext, createContext } from 'react';

const AreasSizesContext: React.Context<any> = createContext(null)

export const useAreasSizes = () => {
	return (
		useContext(AreasSizesContext)
	)
}

export const AreasSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 5, bottom: 40, left: 20, right: 20 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<AreasSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</AreasSizesContext.Provider>
	)
}

AreasSizesContext.displayName = "AreasSizesContext";