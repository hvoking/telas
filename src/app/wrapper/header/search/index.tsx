// React imports
import { useState, useEffect, useRef } from 'react';

// App imports
import { Suggestions } from './suggestions';
import './styles.scss';

// Variable imports
import { cities, data } from 'utils/cities';

// Context imports
import { useMapboxSearchApi } from 'context/api/mapbox/search';
import { useIsoPolygonApi } from 'context/api/isoPolygon';
import { useGeo } from 'context/geo';

export const Search = ({ activeSearch, setActiveSearch }: any) => {
	const { Locations, viewport, setViewport, setCityName, setCityId } = useGeo();
	const { setInitialMarker } = useIsoPolygonApi();

	const { mapboxSearchData, searchText, setSearchText, setFinalSearchText } = useMapboxSearchApi();

	const suggestions = mapboxSearchData && mapboxSearchData.features.reduce((total: any, item: any) => {
		const place_name = item.place_name_pt.replace(/[, - -] Santa .*/, '').toLowerCase()
		if (Object.keys(cities).some(city => place_name.includes(city))) {
			total.push(place_name)
		}
		return total
	}, []);

	const [ value, setValue ] = useState('');
	const [ placeCoordinates, setPlaceCoordinates ] = useState<any>(null);
	const [ suggestionIndex, setSuggestionIndex ] = useState(0);
	const [ suggestionsActive, setSuggestionsActive ]= useState(false);

	const inputRef = useRef<any>(null);

	useEffect(() => {
		setViewport({...viewport, ...placeCoordinates});
	}, [ placeCoordinates ])

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
		const match = currentSearchValue && currentSearchValue.match(cityPattern)[0].replace(/^\s/, '');

		mapboxSearchData && mapboxSearchData.features.filter((item: any) => {
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
		// up arrow
		if (e.keyCode === 38) {
			if (suggestionIndex === 0) {
				return;
			}
			setSuggestionIndex(suggestionIndex - 1);
		}
		// down arrow
		else if (e.keyCode === 40) {
			if (suggestionIndex - 1 === suggestions.length) {
				return
			}
			setSuggestionIndex(suggestionIndex + 1);
		}
		// enter
		else if (e.keyCode === 13) {
			const cityPattern = /[^,]*$/;
			const currentSearchValue: any = suggestions[suggestionIndex]
			const match = currentSearchValue && currentSearchValue.match(cityPattern)[0].replace(/^\s/, '');

			mapboxSearchData && mapboxSearchData.features.filter((item: any) => {
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
		setValue("")
		setSearchText("");
		setSuggestionIndex(0)
		setSuggestionsActive(false)
	}

	return (
		<div className="auto-complete">
			<img 
				className="header-search-icon"
				src={process.env.PUBLIC_URL + "/static/icons/search.svg"}
				alt="search-icon"
				onClick={() => setActiveSearch((prev: boolean) => !prev)}
			/>
			{activeSearch && 
				<>
					<input 
						className="maps-input"
						type="text" 
						placeholder="pesquise um lugar..."
						value={searchText}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						spellCheck={false}
						ref={inputRef}
					/>
					<div className="cancel-cross-wrapper">
						<img
							className="cancel-cross"
							src={process.env.PUBLIC_URL + "/static/icons/search.svg"}
							alt="search-icon"
							onClick={cleanSuggestions}
						/>
					</div>
					{suggestionsActive && suggestions &&
						<Suggestions 
							suggestions={suggestions} 
							suggestionIndex={suggestionIndex} 
							handleClick={handleClick}
						/>
					}
				</>
			}
		</div>
	)
}

Search.displayName="Search";