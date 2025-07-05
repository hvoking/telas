// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../filters/geo';

const IsoPolygonApiContext: React.Context<any> = createContext(null)

export const useIsoPolygonApi = () => {
	return (
		useContext(IsoPolygonApiContext)
	)
}

export const IsoPolygonApiProvider = ({children}: any) => {
	const { markerCoordinates } = useGeo();

	const [ routingProfile, setRoutingProfile ] = useState("cycling");
	const [ contoursType, setContoursType ] = useState("minutes");
	const [ contoursMinutes, setContoursMinutes ] = useState(15);
	const [ contoursMeters, setContoursMeters ] = useState(1000);
	const [ initialMarker, setInitialMarker ] = useState(true);
	const [ isoPolygonData, setIsoPolygonData ] = useState<any>(null);

	useEffect(() => {
		const currentContoursType = contoursType === "minutes" ? contoursMinutes : contoursMeters;
		
		const fetchData = async () => {
		    const tempUrl = `
		    	https://api.mapbox.com/isochrone/v1/mapbox/
		    	${routingProfile}/
		    	${markerCoordinates.longitude}%2C
		    	${markerCoordinates.latitude}
		    	?contours_${contoursType}=${currentContoursType}
		    	&polygons=true
		    	&denoise=1
		    	&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}
		    `;
		    const url = tempUrl.replace(/\s/g, '');
		    const res = await fetch(url);
		    const receivedData = await res.json();
		    setIsoPolygonData(receivedData);
		}
		!initialMarker && fetchData();
	}, [ initialMarker, markerCoordinates, routingProfile, contoursType, contoursMinutes, contoursMeters ]);

	return (
		<IsoPolygonApiContext.Provider value={{ 
			initialMarker, setInitialMarker,
			contoursType, setContoursType,
			contoursMeters, setContoursMeters,
			isoPolygonData,
			routingProfile, setRoutingProfile,
			contoursMinutes, setContoursMinutes,
		}}>
			{children}
		</IsoPolygonApiContext.Provider>
	)
}

IsoPolygonApiContext.displayName = "IsoPolygonApiContext";