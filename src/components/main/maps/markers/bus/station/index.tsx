// Third-party imports
import { Marker } from 'react-map-gl';

// Context imports
import { useBusApi } from '../../../../context/api/nearby/bus';
import { useMarkers } from '../../../../context/maps/markers';

export const BusStation = () => {
	const { busData } = useBusApi();
	const { busStationMarker } = useMarkers();

	if (!busData) return <></>

	return (
		<>
			{
				busStationMarker && busData[0].station.map((item: any, index: number) => {
					return (
						<div key={index}>
							<Marker
						      longitude={item.geometry.coordinates[0]}
						      latitude={item.geometry.coordinates[1]}
						      anchor="bottom"
						    >
								<img 
									style={{width: "15px"}} 
									src="static/components/maps/bus/bus_station.svg" 
									alt="bus"
								/>
						    </Marker>
					    </div>
					)
				})
			}
	    </>
	)
}

BusStation.displayName="BusStation";