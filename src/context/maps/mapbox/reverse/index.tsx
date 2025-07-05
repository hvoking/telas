// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { useGeo } from '../../../filters/geo';

const ReverseGeocodingApiContext: React.Context<any> = createContext(null)

export const useReverseGeocodingApi = () => {
	return (
		useContext(ReverseGeocodingApiContext)
	)
}

export const ReverseGeocodingApiProvider = ({children}: any) => {
	const { parcelId } = useGeo();
	const [ parcelsProperties, setParcelsProperties ] = useState<any>({});
	const [ geocodingLongitude, setGeocodingLongitude ] = useState<any>(null);
	const [ geocodingLatitude, setGeocodingLatitude ] = useState<any>(null);

	useEffect(() => {
	  const fetchData = async () => {
	    const tempUrl = `
	    	https://api.mapbox.com/geocoding/v5/
	    	mapbox.places/
	    	${geocodingLongitude},
	    	${geocodingLatitude}
	    	.json
	    	?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}
	    `;
	    const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    geocodingLongitude && setParcelsProperties({
	    	...parcelsProperties, [parcelId] : receivedData
	    });
	  }
	  fetchData();
	}, [ geocodingLongitude ]);

	return (
		<ReverseGeocodingApiContext.Provider value={{ 
			parcelsProperties, setParcelsProperties,
			setGeocodingLatitude, setGeocodingLongitude,
		}}>
			{children}
		</ReverseGeocodingApiContext.Provider>
	)
}

ReverseGeocodingApiContext.displayName = "ReverseGeocodingApiContext";