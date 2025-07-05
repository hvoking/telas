// App imports
import { LayersProvider } from './layers';
import { MarkersProvider } from './markers';
import { ClustersProvider } from './clusters';

export const MapsProvider = ({children}: any) => {
  return (
    <LayersProvider>
    <MarkersProvider>
    <ClustersProvider>
      {children}
    </ClustersProvider>
    </MarkersProvider>
    </LayersProvider>
  )
}

MapsProvider.displayName="MapsProvider";