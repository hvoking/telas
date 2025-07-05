// App imports
import { SVGWrapper } from './svg';
import { Text } from './text';
import { Circle } from './circle';

// Context imports
import { useDsvApi } from 'context/api/imoveis/dsv';
import { useRoomsApi } from 'context/api/imoveis/rooms';
import { usePropertyType } from 'context/filters/property';
import { useRoomsGaugeSizes } from 'context/sizes/tipologia/gauge/rooms';

// Third party imports
import * as d3 from 'd3';

const roomsCounter: any = {
	5: 'rgba(254, 0, 23, 1)',
	4: 'rgba(254, 162, 90, 1)',
	3: 'rgba(65, 145, 198, 1)',
	2: 'rgba(84, 181, 103, 1)',
	1: 'rgba(109, 86, 166, 1)',
}

export const RoomsGauge = () => {
	const { dsvData } = useDsvApi();
	const { roomsData } = useRoomsApi();

	const { rooms, setRooms, setSuites, setGarages } = usePropertyType();
	const { innerWidth, innerHeight } = useRoomsGaugeSizes();

	let totalCircunference = 0;

	const radius = d3.min([innerWidth, innerHeight]) / 2;
	const strokeWidth = radius * 0.3;
	const innerRadius = radius - ( strokeWidth / 2 );

	const circumference = innerRadius * 2 * Math.PI;

	const onClick = (item: any) => {
		item && setRooms(item);
		const obj = dsvData[`d${item}`].counts;
		const maxRooms = dsvData && Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b).split(',');

		setRooms(parseInt(maxRooms[0]))
		setSuites(null)
		setGarages(null)
	}

	if (!dsvData || !roomsData) return <div>Loading...</div>
		
	return (
		<SVGWrapper>
			{Object.keys(roomsData).map((item: any, index: number) => {
				const currentPercent = roomsData[item] ? roomsData[item] : 0
				const currentCircunference = Math.round(circumference * currentPercent/100)

				if (currentCircunference) {
					totalCircunference += currentCircunference;
				}

				return (
					<g key={index}>
						<Text 
							innerWidth={innerWidth}
							innerHeight={innerHeight}
							rooms={rooms}
							roomsData={roomsData}
						/>
						{currentCircunference && roomsCounter[item] &&
							<Circle
								innerWidth={innerWidth}
								innerHeight={innerHeight}
								innerRadius={innerRadius}
								rooms={rooms}
								item={item}
								roomsCounter={roomsCounter}
								strokeWidth={strokeWidth}
								currentCircunference={currentCircunference}
								circumference={circumference}
								totalCircunference={totalCircunference}
								onClick={onClick}
							/>
						 }
					</g>
				)
			})}
		</SVGWrapper>
	)
}

RoomsGauge.displayName="RoomsGauge";