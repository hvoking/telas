// React imports
import { useContext, createContext } from 'react';

const VarejoClustersContext: React.Context<any> = createContext(null);

export const useVarejoClusters = () => {
  return (
    useContext(VarejoClustersContext)
  )
}

export const VarejoClustersProvider = ({children}: any) => {
  const varejoClusterLayer: any = {
    id: 'varejo-clusters',
    type: 'circle',
    source: 'varejo-clusters',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step', ['get', 'point_count'], 
        'rgba(253, 188, 85, 0.6)', 100, 
        'rgba(253, 188, 85, 0.8)', 750, 
        'rgba(253, 188, 85, 1)'
      ],
      'circle-radius': [
        'step', ['get', 'point_count'], 
        10, 100, 
        15, 750, 
        20
      ]
    }
  };

  const varejoClusterCountLayer: any = {
    id: 'varejo-cluster-count',
    type: 'symbol',
    source: 'varejo-clusters',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 12
    }
  };

  // const unclusteredPointLayer: any = {
  //   id: 'unclustered-point',
  //   type: 'circle',
  //   source: 'cnpj-clusters',
  //   filter: ['!', ['has', 'point_count']],
  //   paint: {
  //     'circle-color': ['get', 'color'],
  //     'circle-radius': 5,
  //   }
  // };
  
  return (
    <VarejoClustersContext.Provider value={{ 
      varejoClusterLayer,
      varejoClusterCountLayer,
      // unclusteredPointLayer
    }}>
      {children}
    </VarejoClustersContext.Provider>
  )
}

VarejoClustersContext.displayName="VarejoClustersContext";