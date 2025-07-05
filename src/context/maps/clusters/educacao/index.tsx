// React imports
import { useContext, createContext } from 'react';

// Third party imports
import type { LayerProps } from 'react-map-gl';

const EducacaoClustersContext: React.Context<any> = createContext(null);

export const useEducacaoClusters = () => {
  return (
    useContext(EducacaoClustersContext)
  )
}

export const EducacaoClustersProvider = ({children}: any) => {
  const educacaoClusterLayer: LayerProps = {
    id: 'educacao-clusters',
    type: 'circle',
    source: 'educacao-clusters',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step', ['get', 'point_count'], 
        'rgba(255, 0, 0, 0.6)', 100, 
        'rgba(255, 0, 0, 0.8)', 750, 
        'rgba(255, 0, 0, 1)'
      ],
      'circle-radius': [
        'step', ['get', 'point_count'], 
        10, 100, 
        15, 750, 
        20
      ]
    }
  };

  const educacaoClusterCountLayer: LayerProps = {
    id: 'educacao-cluster-count',
    type: 'symbol',
    source: 'educacao-clusters',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 12
    }
  };
  
  return (
    <EducacaoClustersContext.Provider value={{ 
      educacaoClusterLayer,
      educacaoClusterCountLayer,
    }}>
      {children}
    </EducacaoClustersContext.Provider>
  )
}

EducacaoClustersContext.displayName="EducacaoClustersContext";