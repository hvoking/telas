// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useIsoPolygonApi } from '../../isoPolygon';

const SchoolsApiContext: React.Context<any> = createContext(null)

export const useSchoolsApi = () => {
	return (
		useContext(SchoolsApiContext)
	)
}

export const SchoolsApiProvider = ({children}: any) => {
	const { isoPolygonData } = useIsoPolygonApi();
	const [ schoolsData, setSchoolsData ] = useState<any>(null);

	useEffect(() => {
	  const fetchData = async () => {
	  	const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	schools_api
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setSchoolsData(receivedData[0]);
	  }
	  isoPolygonData && fetchData();
	}, [ isoPolygonData ]);

	return (
		<SchoolsApiContext.Provider value={{ schoolsData }}>
			{children}
		</SchoolsApiContext.Provider>
	)
}

SchoolsApiContext.displayName = "SchoolsApiContext";