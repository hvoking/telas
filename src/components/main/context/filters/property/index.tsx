// React imports
import { useState, useEffect, useContext, createContext } from 'react';

const PropertyTypeContext: React.Context<any> = createContext(null)

export const usePropertyType = () => {
	return (
		useContext(PropertyTypeContext)
	)
}

export const PropertyTypeProvider = ({children}: any) => {
	const [ businessTypeId, setBusinessTypeId ] = useState(1);
	const [ propertyTypeId, setPropertyTypeId ] = useState(1);

	const [ propertyName, setPropertyName ] = useState("apto");
	const [ businessName, setBusinessName ] = useState("venda");

	const [ rooms, setRooms ] = useState(3);
	const [ suites, setSuites ] = useState<number | null>(null);
	const [ garages, setGarages ] = useState<number | null>(null);
	const [ pool, setPool ] = useState<number | null>(null);
	const [ furnished, setFurnished ] = useState<number | null>(null);

	const propertyDict: any = {
		1: "apto",
		2: "casa",
	}

	const businessDict: any = {
		1: "venda",
		2: "locação",
	}

	useEffect(() => {
		setPropertyName(propertyDict[propertyTypeId]);
	}, [ propertyTypeId ]);

	useEffect(() => {
		setBusinessName(businessDict[businessTypeId]);
	}, [ businessTypeId ]);
	
	return (
		<PropertyTypeContext.Provider value={{
			rooms, setRooms, 
			suites, setSuites, 
			garages, setGarages,
			pool, setPool,
			furnished, setFurnished,
			propertyTypeId, setPropertyTypeId,
			propertyName, setPropertyName,
			businessTypeId, setBusinessTypeId, 
			businessName, setBusinessName,
			propertyDict, businessDict,
		}}>
			{children}
		</PropertyTypeContext.Provider>
	)
}

PropertyTypeContext.displayName = "PropertyTypeContext";