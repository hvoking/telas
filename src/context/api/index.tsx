// App imports
import { PolygonApiProvider } from './polygon';
import { GoogleApiProvider } from './google';
import { MapboxApiProvider } from './mapbox';
import { ImoveisApiProvider } from './imoveis';
import { IsoPolygonApiProvider } from './isoPolygon';
import { ParcelsApiProvider } from './parcels';

export const ApiProvider = ({children}: any) => {
  return (
    <IsoPolygonApiProvider>
    <PolygonApiProvider>
    <GoogleApiProvider>
    <MapboxApiProvider>
    <ParcelsApiProvider>
    <ImoveisApiProvider>
      {children}
    </ImoveisApiProvider>
    </ParcelsApiProvider>
    </MapboxApiProvider>
    </GoogleApiProvider>
    </PolygonApiProvider>
    </IsoPolygonApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";