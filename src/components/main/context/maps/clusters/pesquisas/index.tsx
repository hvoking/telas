// React imports
import { useContext, createContext } from 'react';

// Third party imports
import type { LayerProps } from 'react-map-gl';

const PesquisasClustersContext: React.Context<any> = createContext(null);

export const usePesquisasClusters = () => {
  return (
    useContext(PesquisasClustersContext)
  )
}

export const PesquisasClustersProvider = ({children}: any) => {
  const pesquisasClusterLayer: LayerProps = {
    id: 'pesquisa-clusters',
    type: 'circle',
    source: 'pesquisa-clusters',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step', ['get', 'point_count'], 
        'rgba(51, 106, 239, 0.6)', 100, 
        'rgba(51, 106, 239, 0.8)', 750, 
        'rgba(51, 106, 239, 1)'
      ],
      'circle-radius': [
        'step', ['get', 'point_count'], 
        10, 100, 
        15, 750, 
        20
      ]
    }
  };

  const pesquisasClusterCountLayer: LayerProps = {
    id: 'pesquisa-cluster-count',
    type: 'symbol',
    source: 'pesquisa-clusters',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 12
    }
  };
  
  return (
    <PesquisasClustersContext.Provider value={{ 
      pesquisasClusterLayer,
      pesquisasClusterCountLayer,
    }}>
      {children}
    </PesquisasClustersContext.Provider>
  )
}

PesquisasClustersContext.displayName="PesquisasClustersContext";