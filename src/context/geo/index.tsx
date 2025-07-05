// React imports
import { useState, useRef, useEffect, useContext, createContext } from 'react';

// App imports
import * as Locations from './locations';

const GeoContext: React.Context<any> = createContext(null);

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

	const [ mapStyle, setMapStyle ] = useState("mapbox://styles/hvoking/clrwzn1jo015q01nl53664m2c");
	const mapRef = useRef<any>();
	  
	  const [ viewport, setViewport ] = useState(Locations.blumenau);

	  useEffect(() => {
	    mapRef.current?.flyTo({
	      center: [ viewport.longitude, viewport.latitude ],
	      zoom: viewport.zoom,
	      pitch: viewport.pitch,
	      bearing: viewport.bearing,
	      duration: 3000, 
	      essential: true,
	    });
	    setMarker({
	        longitude: viewport.longitude,
	        latitude: viewport.latitude,
	      });
	    setMarkerCoordinates({
	        longitude: viewport.longitude,
	        latitude: viewport.latitude,
	      });
	  }, [ viewport ]);

	return (
		<GeoContext.Provider value={{
			mapRef, viewport, setViewport, Locations, mapStyle, setMapStyle,
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