// React imports
import { useState, useContext, createContext } from 'react';

// Utils imports
import { cities, data } from 'utils/cities';

// Context imports
import { useMapboxSearchApi } from 'context/api/mapbox/search';
import { useIsoPolygonApi } from 'context/api/isoPolygon';
import { useGeo } from 'context/geo';

const SearchContext: React.Context<any> = createContext(null);

export const useSearch = () => {
	return (
		useContext(SearchContext)
	)
}

export const SearchProvider = ({children}: any) => {
	const { mapboxSearchData, setSearchText, setFinalSearchText } = useMapboxSearchApi();
	const { setInitialMarker } = useIsoPolygonApi();
	const { setPlaceCoordinates, setCityName, setCityId } = useGeo();

	const [ suggestionsActive, setSuggestionsActive ]= useState(false);
	const [ suggestionIndex, setSuggestionIndex ] = useState(0);

	const handleChange = (e: any) => {
		const query = e.target.value;
		setSearchText(query);

		if (query.length > 0) {
			setSuggestionsActive(true);
		}
		else {
			setSuggestionsActive(false)
		}
	};

	const handleClick = (e: any) => {
		const cityPattern = /[^,]*$/;
		const currentSearchValue = e.target.innerText;
		const match = currentSearchValue?.match(cityPattern)[0].replace(/^\s/, '');

		mapboxSearchData?.features.filter((item: any) => {
			const place_name = item.place_name_pt.replace(/[, - -] Santa .*/, '').toLowerCase()
			const place_coordinates = item.geometry.coordinates;
			if (place_name === currentSearchValue) {
				setPlaceCoordinates({
					longitude: place_coordinates[0], 
					latitude: place_coordinates[1]
				})
				setInitialMarker(false);
			}
		})

		setFinalSearchText(currentSearchValue);
		setSearchText(currentSearchValue);
		setSuggestionsActive(false);

		setCityName(cities[match]);
		setCityId(data[cities[match]]);
	};

	const handleKeyDown = (e: any) => {
		if (e.keyCode === 38) { // up arrow
			if (suggestionIndex === 0) {
				return;
			}
			setSuggestionIndex(suggestionIndex - 1);
		}
		else if (e.keyCode === 40) { // down arrow
			if (suggestionIndex - 1 === suggestions.length) {
				return
			}
			setSuggestionIndex(suggestionIndex + 1);
		}
		else if (e.keyCode === 13) { // enter
			const cityPattern = /[^,]*$/;
			const currentSearchValue: any = suggestions[suggestionIndex]
			const match = currentSearchValue && currentSearchValue.match(cityPattern)[0].replace(/^\s/, '');

			mapboxSearchData?.features.filter((item: any) => {
				const place_name = item.place_name_pt.replace(/[, - -] Santa .*/, '').toLowerCase()
				const place_coordinates = item.geometry.coordinates;
				if (place_name === currentSearchValue) {
					setPlaceCoordinates({
						longitude: place_coordinates[0], 
						latitude: place_coordinates[1]
					});
					setInitialMarker(false);
				}
			})

			setFinalSearchText(currentSearchValue);
			setSearchText(currentSearchValue);
			setSuggestionIndex(0);
			setSuggestionsActive(false);

			setCityName(cities[match]);
			setCityId(data[cities[match]]);
		}
		else if (e.keyCode === 27) {
			setSearchText("");
			setSuggestionIndex(0);
			setSuggestionsActive(false);
		}
	};

	const cleanSuggestions = () => {
		setSearchText("");
		setSuggestionIndex(0)
		setSuggestionsActive(false)
	}
	const suggestions = mapboxSearchData?.features.reduce((total: any, item: any) => {
		const place_name = item.place_name_pt.replace(/[, - -] Santa .*/, '').toLowerCase()
		if (Object.keys(cities).some(city => place_name.includes(city))) {
			total.push(place_name)
		}
		return total
	}, []);


	return (
		<SearchContext.Provider value={{
			handleChange,
			handleClick,
			handleKeyDown,
			cleanSuggestions,
			suggestionsActive, setSuggestionsActive,
			suggestionIndex, setSuggestionIndex,
			suggestions

		}}>
			{children}
		</SearchContext.Provider>
	)
}

SearchContext.displayName = "SearchContext";