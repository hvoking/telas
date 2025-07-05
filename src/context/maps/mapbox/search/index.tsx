// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../../../context/filters/geo';

const MapboxSearchApiContext: React.Context<any> = createContext(null)

export const useMapboxSearchApi = () => {
	return (
		useContext(MapboxSearchApiContext)
	)
}

export const MapboxSearchApiProvider = ({children}: any) => {
	const [ mapboxSearchData, setMapboxSearchData ] = useState(null);
	const [ searchText, setSearchText ] = useState('');
	const [ finalSearchText, setFinalSearchText ] = useState('');
	const { markerCoordinates, cityName } = useGeo();

	useEffect(() => {
	  const fetchData = async () => {
	  	const temporarySearchText = searchText.replace(" ", "__")
	    const tempUrl = `
	    	https://api.mapbox.com/geocoding/v5/
	    	mapbox.places/
	    	${temporarySearchText}.json
	    	?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}
	    	&country=BR
	    	&language=pt
	    	&proximity=${markerCoordinates.longitude},${markerCoordinates.latitude}
	    `;
	    const url = tempUrl.replace(/\s/g, '').replace("__", " ");
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setMapboxSearchData(receivedData)
	  }
	  searchText && fetchData();
	}, [ searchText ]);

	return (
		<MapboxSearchApiContext.Provider value={{ 
			mapboxSearchData, 
			searchText, setSearchText, 
			finalSearchText, setFinalSearchText,
		}}>
			{children}
		</MapboxSearchApiContext.Provider>
	)
}

MapboxSearchApiContext.displayName = "MapboxSearchApiContext";