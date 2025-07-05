// React imports
import { useContext, createContext } from 'react';

// Third Party imports
import * as d3 from 'd3';

const PricesContext: React.Context<any> = createContext(null)

export const usePricesConstants = () => {
	return (
		useContext(PricesContext)
	)
}

export const PricesConstantsProvider = ({children}: any) => {
	const xAxisTickFormat = d3.timeFormat("%m");
	const topAxisFormat = d3.timeFormat("%Y");

	const siFormat = (tickValue: any) => d3.format(".2s")(tickValue).replace('G', 'B');

	const yAxisTickFormat = (tickValue: any) => siFormat(tickValue).replace('G', 'B');

	const datesFormat = d3.timeFormat("%d-%m-%Y");
	

	return (
		<PricesContext.Provider value={{
			xAxisTickFormat, yAxisTickFormat, 
			topAxisFormat, datesFormat
		}}>
			{children}
		</PricesContext.Provider>
	)
}

PricesContext.displayName = "PricesContext";