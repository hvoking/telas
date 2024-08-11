// React imports
import { useContext, createContext } from 'react';

// Context imports
import { usePolygonApi } from '../../../../api/polygon';

// Third-party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { GeoJsonLayer } from 'deck.gl';

const CitiesLayerContext: React.Context<any> = createContext(null);

export const useCitiesLayer = () => {
	return (
		useContext(CitiesLayerContext)
	)
}

export const CitiesLayerProvider = ({children}: any) => {
	const { polygonData } = usePolygonApi();

	const city = polygonData && polygonData[0].city_geom;

	const citiesLayer = polygonData && city.map((item: any, index: number) => {
		return new GeoJsonLayer({
			id: `cities-geojson-${index}`,
			pickable: true,
			data: item,
			getFillColor: [126, 126, 132, 40],
			getLineColor: [126, 126, 132, 255],
			getLineWidth: 10,
			parameters: {
				depthTest: false
			},
		})
	})

	return (
		<CitiesLayerContext.Provider value={{ citiesLayer }}>
			{children}
		</CitiesLayerContext.Provider>
	)
}

CitiesLayerContext.displayName = "CitiesLayerContext";