// React imports
import { useState, useEffect, useContext, createContext } from 'react';


// App imports
import { datesFormat } from 'utils/constants';

// Context imports
import { useIsoPolygonApi } from 'context/api/isoPolygon';
import { usePropertyType } from 'context/filters/property';
import { useDates } from 'context/filters/dates';

const PricesApiContext: React.Context<any> = createContext(null)

export const usePricesApi = () => {
	return (
		useContext(PricesApiContext)
	)
}

export const PricesApiProvider = ({children}: any) => {
	const { isoPolygonData } = useIsoPolygonApi();
	const { rooms, suites, garages, businessTypeId, propertyTypeId } = usePropertyType();
	const { dates } = useDates();
	
	const [ pricesData, setPricesData ] = useState<any>(null);
	
	useEffect(() => {
	  const fetchData = async () => {
	  	const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	prices_api
			?business_type_id=${businessTypeId}
	    	&property_type_id=${propertyTypeId}
	    	&rooms=${rooms}
	    	&suites=${suites}
	    	&garages=${garages}
	    	&start_date=${datesFormat(dates[0])}
    		&final_date=${datesFormat(dates[1])}
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	  	try {
		    const res = await fetch(url);
		    if (!res.ok) {
		    	throw new Error(`HTTP error! status: ${res.status}`);
		    }
		    const receivedData = await res.json();
		    setPricesData(receivedData[0]);
	    }
        catch (error) {
    		console.error("Error fetching address:", error);
    		return null;
    	}
	  }
	  isoPolygonData && fetchData();
	}, [ 
		isoPolygonData, 
		businessTypeId, propertyTypeId, 
		rooms, suites, garages, 
	]);

	return (
		<PricesApiContext.Provider value={{ pricesData }}>
			{children}
		</PricesApiContext.Provider>
	)
}

PricesApiContext.displayName = "PricesApiContext";