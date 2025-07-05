// App imports
import './styles.scss';

// Context imports
import { useGeo } from 'context/geo';

export const BasemapsSelectors = () => {
	const { currentBasemap, setCurrentBasemap } = useGeo();

	return (
		<div className="basemaps-parent-wrapper">
			<img 
				className="basemaps-image"
				src={process.env.PUBLIC_URL + "/static/icons/globe.svg"}
				alt="dark"
				onClick={() => {
					currentBasemap === "mapbox://styles/mapbox/dark-v10" ?
					setCurrentBasemap("mapbox://styles/mapbox/satellite-v9") :
					setCurrentBasemap("mapbox://styles/mapbox/dark-v10")
				}}
			/>
		</div>
	)
}

BasemapsSelectors.displayName="BasemapsSelectors";