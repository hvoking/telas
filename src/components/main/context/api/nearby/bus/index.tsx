// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useIsoPolygonApi } from '../../isoPolygon';

const BusApiContext: React.Context<any> = createContext(null)

export const useBusApi = () => {
	return (
		useContext(BusApiContext)
	)
}

export const BusApiProvider = ({children}: any) => {
	const { isoPolygonData } = useIsoPolygonApi();
	const [ busData, setBusData ] = useState<any>(null);

	useEffect(() => {
	  const fetchData = async () => {
	  	const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	bus_api
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setBusData(receivedData[0]);
	  }
	  isoPolygonData && fetchData();
	}, [ isoPolygonData ]);

	return (
		<BusApiContext.Provider value={{ busData }}>
			{children}
		</BusApiContext.Provider>
	)
}

BusApiContext.displayName = "BusApiContext";