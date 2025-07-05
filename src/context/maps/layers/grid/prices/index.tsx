// React imports
import { useContext, createContext } from 'react';

// Context imports
import { usePrices } from '../../../../filters/prices';
import { useScroll } from '../../../../scroll';
import { usePropertyType } from '../../../../filters/property';
import { usePricesApi } from '../../../../api/imoveis/prices';

// Third party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { GridCellLayer } from 'deck.gl';

const PointsLayerContext: React.Context<any> = createContext(null)

export const usePointsLayer = () => {
	return (
		useContext(PointsLayerContext)
	)
}

export const PointsLayerProvider = ({children}: any) => {
	const { unitPrice } = usePrices();
	const { businessTypeId, currentPropertyId } = usePropertyType();
	const { pricesData } = usePricesApi();
	const { view2 } = useScroll();

	const pointsLayer = pricesData &&
		new GridCellLayer({
		    id: 'prices-layer',
		    data: pricesData,
		    cellSize: 10,
		    pickable: true,
		    visible: view2,
		    getPosition: (d: any) => d.geometry.coordinates,
		    material: false,
			getElevation: (d: any) => 
				unitPrice === "price" ? 
				d.price / 400 : 
				d.unit_price / 4,
		    elevationScale: businessTypeId === 1 ? 0.05 : 10,
		    getFillColor: (d: any) => 
		    	currentPropertyId && currentPropertyId === d.property_id ?
		    	[255, 255, 0, 255] :
		    	[57, 181, 74, 120]
		  });
	return (
		<PointsLayerContext.Provider value={{ pointsLayer }}>
			{children}
		</PointsLayerContext.Provider>
	)
}

PointsLayerContext.displayName = "PointsLayerContext";