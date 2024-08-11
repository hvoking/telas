// App imports
import { MapboxProvider } from './mapbox';
import { LayersProvider } from './layers';
import { BasemapsProvider } from './basemaps';
import { MarkersProvider } from './markers';
import { ClustersProvider } from './clusters';

export const MapsProvider = ({children}: any) => {
  return (
    <MapboxProvider>
    <LayersProvider>
    <BasemapsProvider>
    <MarkersProvider>
    <ClustersProvider>
      {children}
    </ClustersProvider>
    </MarkersProvider>
    </BasemapsProvider>
    </LayersProvider>
    </MapboxProvider>
  )
}

MapsProvider.displayName="MapsProvider";