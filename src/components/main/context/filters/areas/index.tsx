// React imports
import { useState, useContext, createContext } from 'react';

const AreasContext: React.Context<any> = createContext(null)

export const useAreas = () => {
	return (
		useContext(AreasContext)
	)
}

export const AreasProvider = ({children}: any) => {
	const [ areaMin, setAreaMin ] = useState(30);
	const [ areaMax, setAreaMax ] = useState(300);

	const [ minParcelArea, setMinParcelArea ] = useState(100);
	const [ maxParcelArea, setMaxParcelArea ] = useState(1000);

	return (
		<AreasContext.Provider value= {{ 
			areaMin, setAreaMin, 
			areaMax, setAreaMax,
			minParcelArea, setMinParcelArea,
			maxParcelArea, setMaxParcelArea,
		}}>
			{children}
		</AreasContext.Provider>
	)
}

AreasContext.displayName = "AreasContext";