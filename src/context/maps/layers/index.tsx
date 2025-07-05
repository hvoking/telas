// App imports
import { PointsLayerProvider } from './grid/prices';
import { IsochroneLayerProvider } from './geojson/isoPolygon';

import { CitiesLayerProvider } from './geojson/cities';
import { ParcelsLayerProvider } from './parcels';

export const LayersProvider = ({children}: any) => {
  return (
    <IsochroneLayerProvider>
    <ParcelsLayerProvider>
    <CitiesLayerProvider>
    <PointsLayerProvider>
      {children}
    </PointsLayerProvider>
    </CitiesLayerProvider>
    </ParcelsLayerProvider>
    </IsochroneLayerProvider>
  )
}

LayersProvider.displayName="LayersProvider";