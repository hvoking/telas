// React imports
import { useContext, createContext } from 'react';

// Third party imports
import type { LayerProps } from 'react-map-gl';

const CnpjClustersContext: React.Context<any> = createContext(null);

export const useCnpjClusters = () => {
  return (
    useContext(CnpjClustersContext)
  )
}

export const CnpjClustersProvider = ({children}: any) => {
  const unclusteredPointLayer: LayerProps = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'cnpj-clusters',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': ['get', 'color'],
      'circle-radius': 5,
    }
  };
  
  return (
    <CnpjClustersContext.Provider value={{ 
      unclusteredPointLayer
    }}>
      {children}
    </CnpjClustersContext.Provider>
  )
}

CnpjClustersContext.displayName="CnpjClustersContext";