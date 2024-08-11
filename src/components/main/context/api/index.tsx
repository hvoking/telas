// App imports
import { PolygonApiProvider } from './polygon';
import { GoogleApiProvider } from './google';
import { ImoveisApiProvider } from './imoveis';
import { IsoPolygonApiProvider } from './isoPolygon';
import { NearbyApiProvider } from './nearby';
import { ParcelsApiProvider } from './parcels';

export const ApiProvider = ({children}: any) => {
  return (
    <IsoPolygonApiProvider>
    <PolygonApiProvider>
    <NearbyApiProvider>
    <GoogleApiProvider>
    <ParcelsApiProvider>
    <ImoveisApiProvider>
      {children}
    </ImoveisApiProvider>
    </ParcelsApiProvider>
    </GoogleApiProvider>
    </NearbyApiProvider>
    </PolygonApiProvider>
    </IsoPolygonApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";