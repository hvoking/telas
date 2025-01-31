// React imports
import { useCallback } from 'react';

// App imports
import './styles.scss';

// Context imports
import { useGeo } from '../../../context/filters/geo';
import { useIsoPolygonApi } from '../../../context/api/isoPolygon';

// Third-party imports
import { Marker } from 'react-map-gl';

export const Pin = () => {
	const { initialMarker, setInitialMarker } = useIsoPolygonApi();
	const { marker, setMarker, setMarkerCoordinates } = useGeo();

	const onMarkerDrag = useCallback((event: any) => {
		setMarker({
			longitude: event.lngLat.lng,
			latitude: event.lngLat.lat
		});
	}, []);

	const onMarkerDragEnd = useCallback((event: any) => {
		setInitialMarker(false);
		setMarkerCoordinates({
			longitude: event.lngLat.lng,
			latitude: event.lngLat.lat
		});
	}, []);
	  
	return (
		<>
			<Marker
		      longitude={marker.longitude}
		      latitude={marker.latitude}
		      anchor="bottom"
		      draggable
		      onDrag={onMarkerDrag}
		      onDragEnd={onMarkerDragEnd}
		    >
		      <img 
			      style={{width: "25px"}} 
			      src="static/components/maps/marker.svg" 
			      alt="marker"
		     />
		    </Marker>
		    {initialMarker && 
				<div className="initial-marker-text">
					Arraste o marcador ou pesquise um lugar
				</div>
			}
		</>
	)
}

Pin.displayName="Pin";