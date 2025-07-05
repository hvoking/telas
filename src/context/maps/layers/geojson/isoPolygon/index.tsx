// React imports
import { useContext, createContext } from 'react';

// Context imports
import { useIsoPolygonApi } from '../../../../api/isoPolygon';
import { useScroll } from '../../../../scroll';

// Third-party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { GeoJsonLayer } from 'deck.gl';

const IsochroneLayerContext: React.Context<any> = createContext(null);

export const useIsochroneLayer = () => {
	return (
		useContext(IsochroneLayerContext)
	)
}

export const IsochroneLayerProvider = ({children}: any) => {
	const { isoPolygonData } = useIsoPolygonApi();
	const { view1, view2 } = useScroll();

	const isochroneLayer = isoPolygonData &&
		new GeoJsonLayer({
			id: 'iso-polygon-geojson',
			pickable: true,
			data: isoPolygonData.features[0].geometry,
			getFillColor: [222, 112, 112, 120],
			getLineColor: [126, 126, 132, 255],
			getLineWidth: 10,
			parameters: { depthTest: false },
			visible: view1,
		});

	return (
		<IsochroneLayerContext.Provider value={{ isochroneLayer }}>
			{children}
		</IsochroneLayerContext.Provider>
	)
}

IsochroneLayerContext.displayName = "IsochroneLayerContext";