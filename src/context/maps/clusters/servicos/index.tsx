// React imports
import { useContext, createContext } from 'react';

// Third party imports
import type { LayerProps } from 'react-map-gl';

const ServicosClustersContext: React.Context<any> = createContext(null);

export const useServicosClusters = () => {
  return (
    useContext(ServicosClustersContext)
  )
}

export const ServicosClustersProvider = ({children}: any) => {
  const servicosClusterLayer: LayerProps = {
    id: 'servicos-clusters',
    type: 'circle',
    source: 'servicos-clusters',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step', ['get', 'point_count'], 
        'rgba(0, 201, 126, 0.6)', 100, 
        'rgba(0, 201, 126, 0.8)', 750, 
        'rgba(0, 201, 126, 1)'
      ],
      'circle-radius': [
        'step', ['get', 'point_count'], 
        10, 100, 
        15, 750, 
        20
      ]
    }
  };

  const servicosClusterCountLayer: LayerProps = {
    id: 'servicos-cluster-count',
    type: 'symbol',
    source: 'servicos-clusters',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 12
    }
  };
  
  return (
    <ServicosClustersContext.Provider value={{ 
      servicosClusterLayer,
      servicosClusterCountLayer,
    }}>
      {children}
    </ServicosClustersContext.Provider>
  )
}

ServicosClustersContext.displayName="ServicosClustersContext";