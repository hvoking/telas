// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { cnpjProperties } from './properties';

// Context imports
import { useIsoPolygonApi } from '../../isoPolygon';

const CnpjApiContext: React.Context<any> = createContext(null)

export const useCnpjApi = () => {
	return (
		useContext(CnpjApiContext)
	)
}

export const CnpjApiProvider = ({children}: any) => {
	const { isoPolygonData } = useIsoPolygonApi();
	const [ cnpjData, setCnpjData ] = useState<any>(null);
	const [ cnpjCountsData, setCnpjCountsData ] = useState<any>(null);

	useEffect(() => {
	  const fetchData = async () => {
	    const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	cnpj_api
	    `;
	    const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setCnpjData(receivedData[0][0].cnpj_properties);
	    setCnpjCountsData(receivedData[0][0].cnpj_counts);
	  }
	  isoPolygonData && fetchData();
	}, [ isoPolygonData	]);

	const getLabel: any = (object: any, value: any) => {
		const currentKey: any = Object.keys(object).find(
			key => object[key].label === value
		)
		if (object[currentKey]) {
			return currentKey
		}
		return false
	}

	const filteredCounts = cnpjCountsData && 
		cnpjCountsData.reduce((total: any, item: any) => {
			const entries: any = Object.entries(item);
			const currentKey = getLabel(cnpjProperties, entries[0][0]);
			if (currentKey) {
				total[currentKey] = entries[0][1]
				return total
			}
			return total
		}, {});

	return (
		<CnpjApiContext.Provider value={{ cnpjData, cnpjProperties, filteredCounts }}>
			{children}
		</CnpjApiContext.Provider>
	)
}

CnpjApiContext.displayName = "CnpjApiContext";