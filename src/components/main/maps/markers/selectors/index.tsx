// App imports
import './styles.scss';

// Context imports
import { useMarkers } from '../../../context/maps/markers'

export const MarkersSelectors = () => {
	const { 
		publicSchoolsMarker, setPublicSchoolsMarker, 
		privateSchoolsMarker, setPrivateSchoolsMarker, 
		universitiesMarker, setUniversitiesMarker, 
		busStopMarker, setBusStopMarker, 
		busStationMarker, setBusStationMarker,
	} = useMarkers();

	const onClick = (setState: any) => {
		setState((prev: any) => !prev)
	}

	return (
		<div className="markers-selectors-wrapper">
			<div 
				className="markers-selectors-item"
				onClick={() => onClick(setBusStationMarker)}
			>
				<img 
					className="markers-selectors-image"
					src="static/components/maps/bus/bus_station.svg" 
					alt="bus-station"
				/>
				<div style={{ color: !busStationMarker ? "rgba(126, 126, 132, 1)" : ""}}>
					terminais de ônibus
				</div>
			</div>
			<div 
				className="markers-selectors-item"
				onClick={() => onClick(setBusStopMarker)}
			>
				<img 
					className="markers-selectors-image"
					src="static/components/maps/bus/bus_stop.svg" 
					alt="bus-stop"
					style={{width: "13px", paddingLeft: "2px"}}
				/>
				<div style={{paddingLeft: "4px", color: !busStopMarker ? "rgba(126, 126, 132, 1)" : ""}}>
					ponto de ônibus
				</div>
			</div>
			<div 
				className="markers-selectors-item"
				onClick={() => onClick(setPrivateSchoolsMarker)}
			>
				<img 
					className="markers-selectors-image"
					src="static/components/maps/schools/private_schools.svg" 
					alt="private-school"
				/>
				<div style={{ color: !privateSchoolsMarker ? "rgba(126, 126, 132, 1)" : ""}}>
					escolas privadas
				</div>
			</div>
			<div 
				className="markers-selectors-item"
				onClick={() => onClick(setPublicSchoolsMarker)}
			>	
				<img 
					className="markers-selectors-image"
					src="static/components/maps/schools/public_schools.svg" 
					alt="public-school"
				/>
				<div style={{ color: !publicSchoolsMarker ? "rgba(126, 126, 132, 1)" : ""}}>
					escolas publicas
				</div>
			</div>
			<div 
				className="markers-selectors-item"
				onClick={() => onClick(setUniversitiesMarker)}
			>	
				<img 
					className="markers-selectors-image"
					src="static/components/maps/universities/universities.svg" 
					alt="public-school"
				/>
				<div style={{ color: !universitiesMarker ? "rgba(126, 126, 132, 1)" : ""}}>
					universidades
				</div>
			</div>
		</div>
	)
}

MarkersSelectors.displayName="MarkersSelectors";