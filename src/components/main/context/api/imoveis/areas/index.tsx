// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useIsoPolygonApi } from '../../isoPolygon';
import { usePropertyType } from '../../../filters/property';
import { useDates } from '../../../filters/dates';

const AreasApiContext: React.Context<any> = createContext(null)

export const useAreasApi = () => {
	return (
		useContext(AreasApiContext)
	)
}

export const AreasApiProvider = ({children}: any) => {
	const [ areasData, setAreasData ] = useState<any>(null);
	const { isoPolygonData } = useIsoPolygonApi();
	
	const { rooms, suites, garages, propertyTypeId, businessTypeId } = usePropertyType();
	const { startDate, finalDate } = useDates();
	
	useEffect(() => {
	  const fetchData = async () => {
	  	const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	areas_api
			?business_type_id=${businessTypeId}
	        &property_type_id=${propertyTypeId}
	        &rooms=${rooms}
	        &suites=${suites}
	        &garages=${garages}
	        &start_date=${startDate}
	        &final_date=${finalDate}
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setAreasData(receivedData);
	  }
	  isoPolygonData && fetchData();
	}, [ 
		isoPolygonData,
		businessTypeId, propertyTypeId, 
		rooms, suites, garages, 
		startDate, finalDate,
	]);

	return (
		<AreasApiContext.Provider value={{ areasData }}>
			{children}
		</AreasApiContext.Provider>
	)
}

AreasApiContext.displayName = "AreasApiContext";