// App imports
import { IsoDropdown } from './iso';
import { FiltersDropdown } from './type';
import './styles.scss';

// Context imports
import { useIsoPolygonApi } from 'context/api/isoPolygon';
import { usePropertyType } from 'context/filters/property'

export const Dropdown = () => {
	const { 
		routingProfile, setRoutingProfile, 
		contoursType, setContoursType, 
		contoursMinutes, contoursMeters, 
		setContoursMinutes, setContoursMeters 
	} = useIsoPolygonApi();

	const { 
		propertyName, businessName, 
		setPropertyTypeId, setBusinessTypeId, 
		propertyDict, businessDict 
	} = usePropertyType();

	const basePath = process.env.PUBLIC_URL + "/static/mobility/";

	const transportListOfValues: any = {
		"walking": basePath + "walking-active.svg",
		"cycling": basePath + "cycling-active.svg",
		"driving": basePath + "driving-active.svg"
	}

	const timeListOfValues: any = {
		"minutes": basePath + "minutes-active.svg",
		"meters": basePath + "meters-active.svg",
	}

	const minutesDict: any = {
		"5": "5 min",
		"15": "15 min",
		"30": "30 min",
		"45": "45 min",
		"60": "60 min",
	}
	const metersDict: any = {
		1000: "1 km",
		2000: "2 km",
		5000: "5 km",
	}

	return (
		<>
			<IsoDropdown
				listOfValues = {transportListOfValues}
				currentState={routingProfile}
				setState={setRoutingProfile}
			/>
			<IsoDropdown
				listOfValues = {timeListOfValues}
				currentState={contoursType}
				setState={setContoursType}
			/>
			<FiltersDropdown
				imoveisDict={contoursType === "minutes" ? minutesDict : metersDict}
				propertyName={contoursType === "minutes" ? `${contoursMinutes} min` : `${contoursMeters / 1000} km`}
				setPropertyTypeId={contoursType === "minutes" ? setContoursMinutes : setContoursMeters}
			/>
			<FiltersDropdown
				imoveisDict={propertyDict}
				propertyName={propertyName}
				setPropertyTypeId={setPropertyTypeId}
			/>
			<FiltersDropdown
				imoveisDict = {businessDict}
				propertyName={businessName}
				setPropertyTypeId={setBusinessTypeId}
			/>
		</>
	)
}

Dropdown.displayName="Dropdown";