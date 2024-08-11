// React imports
import { useState, useEffect } from 'react';

// App imports
import './styles.scss';

// Context imports
import { useMapboxProperties } from '../../context/maps/mapbox';
import { useIsoPolygonApi } from '../../context/api/isoPolygon';

// Third party imports
import { NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';

export const MapControllers = () => {
	const { viewport, setViewport } = useMapboxProperties();
	const { setInitialMarker } = useIsoPolygonApi();

	const [ placeCoordinates, setPlaceCoordinates ] = useState<any>(null);

	useEffect(() => {
		setViewport({...viewport, ...placeCoordinates});
	}, [ placeCoordinates ]);

	return (
		<>
			<NavigationControl/>
			<GeolocateControl 
				showAccuracyCircle={false} 
				showUserLocation={false}
				positionOptions= {{enableHighAccuracy: true}}
				onGeolocate={(e: any) => {
					setPlaceCoordinates({
						longitude: e.coords.longitude, 
						latitude: e.coords.latitude
					})
					setInitialMarker(false);
				}}
			/>
			<FullscreenControl style={{position: "absolute", top: "130px"}}/>
		</>
	)
}

MapControllers.displayName="MapControllers";