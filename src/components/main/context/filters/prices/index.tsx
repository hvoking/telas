import { useState, useContext, createContext } from 'react';

const PricesContext: React.Context<any> = createContext(null)

export const usePrices = () => {
	return (
		useContext(PricesContext)
	)
}

export const PricesProvider = ({children}: any) => {
	const [ unitPrice, setUnitPrice ] = useState("unit_price");
	const [ priceMin, setPriceMin ] = useState(0);
	const [ priceMax, setPriceMax ] = useState(6000000);
	const [ statusPriceMin, setStatusPriceMin ] = useState(0);
	const [ statusPriceMax, setStatusPriceMax ] = useState(6000000);

	return (
		<PricesContext.Provider value={{
			priceMin, setPriceMin, 
			priceMax, setPriceMax,
			unitPrice, setUnitPrice,
			statusPriceMin, setStatusPriceMin,
			statusPriceMax, setStatusPriceMax,
		}}>
			{children}
		</PricesContext.Provider>
	)
}

PricesContext.displayName = "PricesContext";