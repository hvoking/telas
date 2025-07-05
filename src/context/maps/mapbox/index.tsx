// React imports
import { useState, useRef, useEffect, useContext, createContext } from 'react';

// App imports
import * as Locations from './locations';

// Context imports
import { ReverseGeocodingApiProvider } from './reverse'
import { MapboxSearchApiProvider } from './search'
import { useGeo } from '../../filters/geo';

const MapboxContext: React.Context<any> = createContext(null);

export const useMapboxProperties = () => {
  return (
    useContext(MapboxContext)
  )
}

export const MapboxProvider = ({children}: any) => {
  const mapRef = useRef<any>();
  
  const { setMarker, setMarkerCoordinates } = useGeo();
  const [ viewport, setViewport ] = useState(Locations.blumenau);

  useEffect(() => {
    mapRef.current?.flyTo({
      center: [ viewport.longitude, viewport.latitude ],
      zoom: viewport.zoom,
      pitch: viewport.pitch,
      bearing: viewport.bearing,
      duration: 3000, 
      essential: true,
    });
    setMarker({
        longitude: viewport.longitude,
        latitude: viewport.latitude,
      });
    setMarkerCoordinates({
        longitude: viewport.longitude,
        latitude: viewport.latitude,
      });
  }, [ viewport ]);
  
  return (
    <MapboxSearchApiProvider>
    <ReverseGeocodingApiProvider>
    <MapboxContext.Provider value={{ mapRef, viewport, setViewport, Locations }}>
      {children}
    </MapboxContext.Provider>
    </ReverseGeocodingApiProvider>
    </MapboxSearchApiProvider>
  )
}

MapboxContext.displayName="MapboxContext";