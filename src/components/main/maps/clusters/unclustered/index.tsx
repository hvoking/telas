// Contex imports
import { useCnpjClusters } from '../../../context/maps/clusters/cnpj';

// Third party imports
import { Source, Layer } from 'react-map-gl';

export const Unclustered = ({ cnpjData, getColor, getLabel, cnpjProperties }: any) => {
	const { unclusteredPointLayer } = useCnpjClusters();

	const geojsonPoints: any = cnpjData && cnpjData.reduce((total: any, item: any) => {
		total.push({
			type: "Feature",
			properties: {
				cluster: false,
		        color: getColor(cnpjProperties, item.cnae_divisao),
		        label: getLabel(cnpjProperties, item.cnae_divisao)
	    	},
		    geometry: { 
		    	type: "Point", 
		    	coordinates: [ 
		    		item.geometry.coordinates[0], 
		    		item.geometry.coordinates[1] 
		    	] 
		    }
		});
		return total
	}, []);

	const geojsonWrapper: any = geojsonPoints && {
		"type": "FeatureCollection",
		"features": geojsonPoints
	}

	return (
		<Source
		  id="cnpj-clusters"
		  type="geojson"
		  data={geojsonWrapper}
		  cluster={true}
		  clusterMaxZoom={14}
		  clusterRadius={100}
		  clusterProperties={{
		  	'color': ['get', 'color'],
		  	'label': ['get', 'label'],
		  }}
		>
		  <Layer {...unclusteredPointLayer}/>
		</Source>
	)
}

Unclustered.displayName="Unclustered";