// React imports
import { useContext, createContext } from 'react';

const CnpjClustersContext: React.Context<any> = createContext(null);

export const useCnpjClusters = () => {
  return (
    useContext(CnpjClustersContext)
  )
}

export const CnpjClustersProvider = ({children}: any) => {
  const unclusteredPointLayer: any = {
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