// Third-party imports
import { Marker } from 'react-map-gl';

// Context imports
import { useSchoolsApi } from '../../../context/api/nearby/schools';
import { useMarkers } from '../../../context/maps/markers';

export const SchoolsMarker = () => {
	const { schoolsData } = useSchoolsApi();
	const { publicSchoolsMarker, privateSchoolsMarker } = useMarkers();

	if (!schoolsData) return <></>

	return (
		<>
			{
				schoolsData[0].schools_points.map((item: any, index: any) => {
					return (
						<div key={index}>
							<Marker
								longitude={item.geometry.coordinates[0]}
								latitude={item.geometry.coordinates[1]}
								anchor="bottom"
						    >
								{privateSchoolsMarker && item.type === "Privada" && <img 
									style={{width: "10px"}} 
									src={"static/components/maps/schools/private_schools.svg"}
									alt="Schools"
								/>}
								{publicSchoolsMarker && item.type !== "Privada" && <img 
									style={{width: "10px"}} 
									src={"static/components/maps/schools/public_schools.svg"}
									alt="Schools"
								/>}
						    </Marker>
					    </div>
					)
				})
			}
	    </>
	)
}

SchoolsMarker.displayName="SchoolsMarker";