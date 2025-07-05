// React imports
import { useCallback } from 'react';

// App imports
import { MapControllers } from './controllers';
import { MapHeader } from './header';
import { BasemapsSelectors } from './basemaps';
import { RadioSelector } from './controllers/radio';
import { Search } from './search';
import './styles.scss';

// Layers imports
import { useIsochroneLayer } from 'context/maps/layers/geojson/isoPolygon';
import { useCitiesLayer } from 'context/maps/layers/geojson/cities';
import { usePointsLayer } from 'context/maps/layers/grid/prices';
import { useParcelsLayer } from 'context/maps/layers/parcels';

// Context imports
import { useGeo } from 'context/geo';
import { useIsoPolygonApi } from 'context/api/isoPolygon'

// Third-party imports
import { Map, useControl } from 'react-map-gl/mapbox';
import { DeckProps } from '@deck.gl/core/typed';
import { MapboxOverlay } from '@deck.gl/mapbox/typed';
import 'mapbox-gl/dist/mapbox-gl.css';

const DeckGLOverlay = (props: DeckProps) => {
  const deck = useControl<any>(() => new MapboxOverlay(props));
  deck.setProps(props);
  return null;
}

export const Layout = () => {
	const { mapRef, viewport, setMarker, setMarkerCoordinates, mapStyle } = useGeo();
	const { setInitialMarker } = useIsoPolygonApi();

	// Layers
	const { isochroneLayer } = useIsochroneLayer();
	const { citiesLayer } = useCitiesLayer();
	const { parcelsLayer } = useParcelsLayer();
	const { pointsLayer } = usePointsLayer();

	const layers: any = [ 
		citiesLayer, 
		isochroneLayer, 
		parcelsLayer, 
		pointsLayer, 
	];

	const onDblClick = useCallback((event: any) => {
		const { lng: longitude, lat: latitude } = event.lngLat;
		setInitialMarker(false);
		setMarkerCoordinates({ longitude, latitude });
		setMarker({ longitude, latitude });
	}, []); 

	return (
		<div className="maps">
			<MapHeader/>
			<Search/>
			<Map
				ref={mapRef}
				initialViewState={viewport}
				// interactiveLayerIds={[clusterLayer.id]}
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
				mapStyle={mapStyle}
				onDblClick={onDblClick}
				doubleClickZoom={false}
				preserveDrawingBuffer={true}
			>
				<DeckGLOverlay 
					layers={layers} 
					glOptions={{preserveDrawingBuffer: true}}
				/>
				<MapControllers/>
			</Map>
			<BasemapsSelectors/>
			<RadioSelector/>
		</div>
	)
}

Layout.displayName="Layout";