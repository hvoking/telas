// React imports
import { useContext, createContext } from 'react';

// Context imports
import { useParcelsApi } from 'context/api/parcels';
import { useGeo } from 'context/geo';
import { useAreas } from 'context/filters/areas';
import { useScroll } from 'context/scroll';
import { useParcelDimensions } from 'context/filters/parcel';

// Third party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { PolygonLayer } from 'deck.gl';

const ParcelsLayerContext: React.Context<any> = createContext(null)

export const useParcelsLayer = () => {
	return (useContext(ParcelsLayerContext))
}

export const ParcelsLayerProvider = ({children}: any) => {
	const { parcelsData } = useParcelsApi();
	const { parcelId, setParcelId } = useGeo();
	const { leftPosition, rightPosition } = useParcelDimensions();
	const { view3 } = useScroll();

	const onClick = (e: any) => { 
		const parcelId = e.object.id;
		setParcelId(parcelId);
	}

	const filterParcelData = parcelsData && parcelsData.filter((item: any) => 
		item.area > leftPosition && 
		item.area < rightPosition
	)

	const parcelsLayer = parcelsData &&
			new PolygonLayer({
				id: 'parcels-layer',
				data: filterParcelData,
				pickable: true,
				getLineWidth: 1,
				getLineColor: (d: any) => [126, 126, 132, 180],
				highlightColor: [172, 208, 56, 50],
				autoHighlight: true,
				getPolygon: (d: any) => d.geometry.coordinates[0],
				getFillColor: (d: any) => 
					d.id === parcelId ? 
					[255, 255, 0, 255] :
					[126, 126, 132, 155],
				updateTriggers: {
					"getFillColor": [
						leftPosition, rightPosition, 
						parcelId
					], 
					"getLineColor": [
						leftPosition, rightPosition, 
						parcelId
					]},
				onClick: onClick,
				parameters: { depthTest: false },
				visible: view3
			});
	return (
		<ParcelsLayerContext.Provider value={{ parcelsLayer }}>
			{children}
		</ParcelsLayerContext.Provider>
	)
}

ParcelsLayerContext.displayName = "ParcelsLayerContext";