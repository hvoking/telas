// React imports
import { useState, useContext, createContext } from 'react';

const IsoPolygonSizesContext: React.Context<any> = createContext(null)

export const useIsoPolygonSizes = () => {
	return (
		useContext(IsoPolygonSizesContext)
	)
}

export const IsoPolygonSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = {top: 20, bottom: 20, left: 20, right: 20}

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<IsoPolygonSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</IsoPolygonSizesContext.Provider>
	)
}

IsoPolygonSizesContext.displayName = "IsoPolygonSizesContext";