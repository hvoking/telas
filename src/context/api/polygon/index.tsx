// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from 'context/geo';
import { useIsoPolygonApi } from 'context/api/isoPolygon';

const PolygonApiContext: React.Context<any> = createContext(null)

export const usePolygonApi = () => {
	return (
		useContext(PolygonApiContext)
	)
}

export const PolygonApiProvider = ({children}: any) => {
	const { markerCoordinates } = useGeo();
	const { isoPolygonData } = useIsoPolygonApi();

	const [ polygonData, setPolygonData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${process.env.REACT_APP_API_URL}/polygon_api`, {
					method: "POST",
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({ 
						"polygon": JSON.stringify(isoPolygonData.features[0].geometry),
						"longitude": JSON.stringify(markerCoordinates.longitude),
						"latitude": JSON.stringify(markerCoordinates.latitude),
						"schema": "limites",
						"table": "municipios_br",
					}),
				});
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				const receivedData = await res.json();
				setPolygonData(receivedData[0]);
			}
			catch (error) {
	    		console.error("Error fetching address:", error);
	    		return null;
	    	}
		}
		isoPolygonData && fetchData();
	}, [ isoPolygonData ]);

	return (
		<PolygonApiContext.Provider value={{ polygonData }}>
			{children}
		</PolygonApiContext.Provider>
	)
}

PolygonApiContext.displayName = "PolygonApiContext";