// App imports
import { SchoolsMarker } from './schools';
import { UniversitiesMarker } from './universities';
import { BusStation } from './bus/station';
import { BusStop } from './bus/stop';

// Context imports
import { useScroll } from '../../context/scroll'

export const Markers = () => {
	const { view1 } = useScroll();

	return (
		<>
			{view1 && 
				<>
					<UniversitiesMarker/>
					<BusStation/>
					<BusStop/>
					<SchoolsMarker/>
				</>
			}
		</>
	)
}

Markers.displayName="Markers";