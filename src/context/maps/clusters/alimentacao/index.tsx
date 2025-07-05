// React imports
import { useContext, createContext } from 'react';

const AlimentacaoClustersContext: React.Context<any> = createContext(null);

export const useAlimentacaoClusters = () => {
  return (
    useContext(AlimentacaoClustersContext)
  )
}

export const AlimentacaoClustersProvider = ({children}: any) => {
  const alimentacaoClusterLayer: any = {
    id: 'alimentacao-clusters',
    type: 'circle',
    source: 'alimentacao-clusters',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step', ['get', 'point_count'], 
        'rgba(255, 173, 158, 0.6)', 100, 
        'rgba(255, 173, 158, 0.8)', 750, 
        'rgba(255, 173, 158, 1)'
      ],
      'circle-radius': [
        'step', ['get', 'point_count'], 
        10, 100, 
        15, 750, 
        20
      ]
    }
  };

  const alimentacaoClusterCountLayer: any = {
    id: 'alimentacao-cluster-count',
    type: 'symbol',
    source: 'alimentacao-clusters',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 12
    }
  };
  
  return (
    <AlimentacaoClustersContext.Provider value={{ 
      alimentacaoClusterLayer,
      alimentacaoClusterCountLayer,
    }}>
      {children}
    </AlimentacaoClustersContext.Provider>
  )
}

AlimentacaoClustersContext.displayName="AlimentacaoClustersContext";