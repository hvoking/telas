// React imports
import { useState, useContext, createContext } from 'react';

const MarkersContext: React.Context<any> = createContext(null)

export const useMarkers = () => {
  return (
    useContext(MarkersContext)
  )
}

export const MarkersProvider = ({children}: any) => {
  const [ publicSchoolsMarker, setPublicSchoolsMarker ] = useState(true);
  const [ privateSchoolsMarker, setPrivateSchoolsMarker ] = useState(true);
  const [ universitiesMarker, setUniversitiesMarker ] = useState(true);
  const [ busStopMarker, setBusStopMarker ] = useState(false);
  const [ busStationMarker, setBusStationMarker ] = useState(true);

  return (
    <MarkersContext.Provider value={{ 
      publicSchoolsMarker, setPublicSchoolsMarker,
      privateSchoolsMarker, setPrivateSchoolsMarker,
      universitiesMarker, setUniversitiesMarker,
      busStopMarker, setBusStopMarker,
      busStationMarker, setBusStationMarker
    }}>
      {children}
    </MarkersContext.Provider>
  )
}

MarkersContext.displayName = "MarkersContext";