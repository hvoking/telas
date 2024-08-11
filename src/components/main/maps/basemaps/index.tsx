// App imports
import './styles.scss';

// Context imports
import { useBasemaps } from '../../context/maps/basemaps';

export const BasemapsSelectors = () => {
	const { currentBasemap, setCurrentBasemap } = useBasemaps();

	return (
		<div className="basemaps-parent-wrapper">
			<img 
				className="basemaps-image"
				src={`static/components/maps/globe/dark.svg`}
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