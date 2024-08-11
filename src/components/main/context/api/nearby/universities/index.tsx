// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useIsoPolygonApi } from '../../isoPolygon';

const UniversitiesApiContext: React.Context<any> = createContext(null)

export const useUniversitiesApi = () => {
	return (
		useContext(UniversitiesApiContext)
	)
}

export const UniversitiesApiProvider = ({children}: any) => {
	const { isoPolygonData } = useIsoPolygonApi();
	const [ universitiesData, setUniversitiesData ] = useState<any>(null);

	useEffect(() => {
	  const fetchData = async () => {
	  	const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	universities_api
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setUniversitiesData(receivedData[0]);
	  }
	  isoPolygonData && fetchData();
	}, [isoPolygonData]);

	return (
		<UniversitiesApiContext.Provider value={{ universitiesData }}>
			{children}
		</UniversitiesApiContext.Provider>
	)
}

UniversitiesApiContext.displayName = "UniversitiesApiContext";