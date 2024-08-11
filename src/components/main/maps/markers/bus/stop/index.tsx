// Third-party imports
import { Marker } from 'react-map-gl';

// Context imports
import { useBusApi } from '../../../../context/api/nearby/bus';
import { useMarkers } from '../../../../context/maps/markers';

export const BusStop = () => {
	const { busData } = useBusApi();
	const { busStopMarker } = useMarkers();

	if (!busData) return <></>
	  
	return (
		<>
			{
				busStopMarker && busData && busData[0].bus_stop.map((item: any) => {
					return (
						<Marker
					      longitude={item.geometry.coordinates[0]}
					      latitude={item.geometry.coordinates[1]}
					      anchor="bottom"
					    >
							<img 
								style={{width: "7px"}} 
								src="static/components/maps/bus/bus_stop.svg" 
								alt="bus"
							/>
					    </Marker>
					)
				})
			}
	    </>
	)
}

BusStop.displayName="BusStop";