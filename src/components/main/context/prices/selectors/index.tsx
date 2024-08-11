// React imports
import { useState, useContext, createContext } from 'react';

const PricesSelectorsContext: React.Context<any> = createContext(null)

export const usePricesSelectors = () => {
	return (
		useContext(PricesSelectorsContext)
	)
}

export const PricesSelectorsProvider = ({children}: any) => {
	const [ activeEquipment, setActiveEquipment ] = useState("");
	const [ activeMean, setActiveMean ] = useState(true);
	const [ activeBrush, setActiveBrush ] = useState(true);
	const [ status, setStatus ] = useState(0);

	return (
		<PricesSelectorsContext.Provider value={{ 
			activeEquipment, setActiveEquipment,
			activeMean, setActiveMean,
			status, setStatus,
			activeBrush, setActiveBrush,
		}}>
			{children}
		</PricesSelectorsContext.Provider>
	)
}

PricesSelectorsContext.displayName = "PricesSelectorsContext";