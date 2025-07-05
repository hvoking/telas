// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useIsoPolygonApi } from '../../isoPolygon';
import { usePropertyType } from '../../../filters/property';
import { useAreas } from '../../../filters/areas';

const DsvApiContext: React.Context<any> = createContext(null)

export const useDsvApi = () => {
	return (
		useContext(DsvApiContext)
	)
}

export const DsvApiProvider = ({children}: any) => {
	const { isoPolygonData } = useIsoPolygonApi();
	const { businessTypeId, propertyTypeId } = usePropertyType();
	const { areaMin, areaMax } = useAreas();
	
	const [ dsvData, setDsvData ] = useState<any>(null);
	
	useEffect(() => {
	  const fetchData = async () => {
	  	const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	dsv_api
			?business_type_id=${businessTypeId}
			&property_type_id=${propertyTypeId}
	    	&area_min=${areaMin}
	    	&area_max=${areaMax}
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setDsvData(receivedData);
	  }
	  isoPolygonData && fetchData();
	}, [ 
		isoPolygonData, 
		businessTypeId, propertyTypeId, 
		areaMin, areaMax 
	]);

	return (
		<DsvApiContext.Provider value={{ dsvData }}>
			{children}
		</DsvApiContext.Provider>
	)
}

DsvApiContext.displayName = "DsvApiContext";