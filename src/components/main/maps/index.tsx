// React imports
import { useCallback } from 'react';

// App imports
import { Pin } from './markers/pin';
import { MarkersSelectors } from './markers/selectors';
import { Markers } from './markers';
import { MapControllers } from './controllers';
import { MapHeader } from './header';
import { BasemapsSelectors } from './basemaps';
import { RadioSelector } from './controllers/radio';
import { Clusters } from './clusters';
import './styles.scss';

// Layers imports
import { useIsochroneLayer } from '../context/maps/layers/geojson/isoPolygon';

import { useCitiesLayer } from '../context/maps/layers/geojson/cities';

import { usePointsLayer } from '../context/maps/layers/grid/prices';

import { useParcelsLayer } from '../context/maps/layers/parcels';

// Context imports
import { useMapboxProperties } from '../context/maps/mapbox';
import { useBasemaps } from '../context/maps/basemaps';
import { useGeo } from '../context/filters/geo';
import { useScroll } from '../context/scroll';
import { useIsoPolygonApi } from '../context/api/isoPolygon'

// Third-party imports
import { Map, useControl } from 'react-map-gl';
import { DeckProps } from '@deck.gl/core/typed';
import { MapboxOverlay } from '@deck.gl/mapbox/typed';
import 'mapbox-gl/dist/mapbox-gl.css';

const DeckGLOverlay = (props: DeckProps) => {
  const deck = useControl<any>(() => new MapboxOverlay(props));
  deck.setProps(props);
  return null;
}

export const Maps = () => {
	const { mapRef, viewport } = useMapboxProperties();
	const { currentBasemap } = useBasemaps();
	const { setMarker, setMarkerCoordinates } = useGeo();
	const { setInitialMarker } = useIsoPolygonApi();
	const { view1, view4 } = useScroll();

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
		const lng = event.lngLat.lng;
		const lat = event.lngLat.lat;
		setInitialMarker(false);
		setMarkerCoordinates({ longitude: lng, latitude: lat });
		setMarker({ longitude: lng, latitude: lat });
	}, []); 

	return (
		<div className="maps">
			<MapHeader/>
			<Map
				ref={mapRef}
				initialViewState={viewport}
				// interactiveLayerIds={[clusterLayer.id]}
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
				mapStyle={currentBasemap}
				onDblClick={onDblClick}
				doubleClickZoom={false}
				preserveDrawingBuffer={true}
			>
				<DeckGLOverlay 
					layers={layers} 
					glOptions={{preserveDrawingBuffer: true}}
				/>
				<Pin/>
				<Markers/>
				<MapControllers/>
				{view4 && <Clusters/>}
			</Map>
			<BasemapsSelectors/>
			<RadioSelector/>
			{view1 && <MarkersSelectors/>}
		</div>
	)
}

Maps.displayName="Maps";