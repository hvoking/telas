// App imports
import { PolygonApiProvider } from './polygon';
import { GoogleApiProvider } from './google';
import { ImoveisApiProvider } from './imoveis';
import { IsoPolygonApiProvider } from './isoPolygon';
import { ParcelsApiProvider } from './parcels';

export const ApiProvider = ({children}: any) => {
  return (
    <IsoPolygonApiProvider>
    <PolygonApiProvider>
    <GoogleApiProvider>
    <ParcelsApiProvider>
    <ImoveisApiProvider>
      {children}
    </ImoveisApiProvider>
    </ParcelsApiProvider>
    </GoogleApiProvider>
    </PolygonApiProvider>
    </IsoPolygonApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";