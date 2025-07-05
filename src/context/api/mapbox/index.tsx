// Context imports
import { ReverseGeocodingApiProvider } from './reverse';
import { MapboxSearchApiProvider } from './search';

export const MapboxApiProvider = ({ children }: any) => {
  return (
    <MapboxSearchApiProvider>
    <ReverseGeocodingApiProvider>
      {children}
    </ReverseGeocodingApiProvider>
    </MapboxSearchApiProvider>
  )
}

MapboxApiProvider.displayName="MapboxApiProvider";