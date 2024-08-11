// Context imports
import { useCnpjApi } from '../../context/api/nearby/cnpj';
import { usePesquisasClusters } from '../../context/maps/clusters/pesquisas';
import { useAlimentacaoClusters } from '../../context/maps/clusters/alimentacao';
import { useEducacaoClusters } from '../../context/maps/clusters/educacao';
import { useServicosClusters } from '../../context/maps/clusters/servicos';
import { useVarejoClusters } from '../../context/maps/clusters/varejo';

// App imports
import { Unclustered } from './unclustered';
import { Clustered } from './clustered';

export const Clusters = () => {
	const { cnpjData, cnpjProperties } = useCnpjApi();
	const { pesquisasClusterLayer, pesquisasClusterCountLayer } = usePesquisasClusters();
	const { alimentacaoClusterLayer, alimentacaoClusterCountLayer } = useAlimentacaoClusters();
	const { educacaoClusterLayer, educacaoClusterCountLayer } = useEducacaoClusters();
	const { servicosClusterLayer, servicosClusterCountLayer } = useServicosClusters();
	const { varejoClusterLayer, varejoClusterCountLayer } = useVarejoClusters();

	const getColor: any = (object: any, value: any) => {
		const currentKey: any = Object.keys(object).find(
			key => object[key].label === value
		)
		if (object[currentKey]) {
			return object[currentKey].color
		}
		return "rgba(255, 255, 255, 0)"
	}

	const getLabel: any = (object: any, value: any) => {
		const currentKey: any = Object.keys(object).find(
			key => object[key].label === value
		)
		if (object[currentKey]) {
			return currentKey
		}
		return false
	}

	return (
		<>
			<Unclustered 
				cnpjData={cnpjData} 
				getColor={getColor} 
				getLabel={getLabel} 
				cnpjProperties={cnpjProperties}
			/>
			<Clustered
				cnpjData={cnpjData} 
				cnpjProperties={cnpjProperties} 
				getLabel={getLabel}
				label="pesquisa"
				clusterLayer={pesquisasClusterLayer}
				countLayer={pesquisasClusterCountLayer}
			/>
			<Clustered
				cnpjData={cnpjData} 
				cnpjProperties={cnpjProperties} 
				getLabel={getLabel}
				label="alimentacao"
				clusterLayer={alimentacaoClusterLayer}
				countLayer={alimentacaoClusterCountLayer}
			/>
			<Clustered
				cnpjData={cnpjData} 
				cnpjProperties={cnpjProperties} 
				getLabel={getLabel}
				label="educacao"
				clusterLayer={educacaoClusterLayer}
				countLayer={educacaoClusterCountLayer}
			/>
			<Clustered
				cnpjData={cnpjData} 
				cnpjProperties={cnpjProperties} 
				getLabel={getLabel}
				label="servicos"
				clusterLayer={servicosClusterLayer}
				countLayer={servicosClusterCountLayer}
			/>
			<Clustered
				cnpjData={cnpjData} 
				cnpjProperties={cnpjProperties} 
				getLabel={getLabel}
				label="varejo"
				clusterLayer={varejoClusterLayer}
				countLayer={varejoClusterCountLayer}
			/>
		</>
	)
}

Clusters.displayName="Clusters";