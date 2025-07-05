import { useState, useContext, createContext } from 'react';

const GeoContext: React.Context<any> = createContext(null)

export const useGeo = () => {
	return (
		useContext(GeoContext)
	)
}

export const GeoProvider = ({children}: any) => {
	const [ cityName, setCityName ] = useState<any>("blumenau");
	const [ cityId, setCityId ] = useState<any>(37);
	const [ parcelId, setParcelId ] = useState(41351);
	const [ parcelsObject, setParcelsObject ] = useState<any>({});
	const [ marker, setMarker ] = useState({ 
		latitude: -26.905141661134657, 
		longitude: -49.08110549040376 
	});
	const [ markerCoordinates, setMarkerCoordinates ] = useState({ 
		latitude: -26.905141661134657, 
		longitude: -49.08110549040376 
	});

	return (
		<GeoContext.Provider value={{
			cityName, setCityName, 
			cityId, setCityId, 
			marker, setMarker,
			markerCoordinates, setMarkerCoordinates,
			parcelId, setParcelId,
			parcelsObject, setParcelsObject,
		}}>
			{children}
		</GeoContext.Provider>
	)
}

GeoContext.displayName = "GeoContext";