// Third-party imports
import { Marker } from 'react-map-gl';

// Context imports
import { useUniversitiesApi } from '../../../context/api/nearby/universities';
import { useMarkers } from '../../../context/maps/markers';

export const UniversitiesMarker = () => {
	const { universitiesData } = useUniversitiesApi();
	const { universitiesMarker } = useMarkers();

	if (!universitiesData) return <></>
	  
	return (
		<>
			{
				universitiesMarker && universitiesData.map((item: any, index: any) => {
					return (
						<div key={index}>
							<Marker
						      longitude={item.geometry.coordinates[0]}
						      latitude={item.geometry.coordinates[1]}
						      anchor="bottom"
						    >
								<img 
									style={{width: "15px"}} 
									src="static/components/maps/universities/universities.svg" 
									alt="Universities"
								/>
						    </Marker>
					    </div>
					)
				})
			}
	    </>
	)
}

UniversitiesMarker.displayName="UniversitiesMarker";