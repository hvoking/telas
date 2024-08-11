// App imports
import './styles.scss';

// Context imports
import { useDsvApi } from '../../../../context/api/imoveis/dsv';
import { useRoomsApi } from '../../../../context/api/imoveis/rooms';
import { usePropertyType } from '../../../../context/filters/property';

const roomsColors: any = {
	1: 'rgba(109, 86, 166, 1)',
	2: 'rgba(84, 181, 103, 1)',
	3: 'rgba(65, 145, 198, 1)',
	4: 'rgba(254, 162, 90, 1)',
	5: 'rgba(254, 0, 23, 1)',
}

export const RoomsLegend = () => {
	const { dsvData } = useDsvApi();
	const { roomsData } = useRoomsApi();
	const { rooms, setRooms, setSuites, setGarages } = usePropertyType();

	if (!dsvData || !roomsData) return <div>Loading...</div>

	const onClick = (item: any) => {
		item && setRooms(item);
		const obj = dsvData[`d${item}`].counts;
		const maxRooms = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b).split(',');

		setRooms(parseInt(maxRooms[0]))
		setSuites(parseInt(maxRooms[1]))
		setGarages(parseInt(maxRooms[2]))
	}

	const sortedRooms = Object.keys(roomsData).sort((a, b) => roomsData[b] - roomsData[a]);
		
	return (
		<div className="rooms-legend-wrapper">
			{
				sortedRooms.map((item: any, index: number) => {
					const currentPercent = roomsData[item] ? roomsData[item] : 0
					return (
						<div key={index}>
						{currentPercent > 1 && 
							<div
								className="rooms-legend-item"
								style={{
									backgroundColor: 
										roomsData && String(rooms) === item ?
										roomsColors[item] :
										String(roomsColors[item]).replace('1)', '0.4)')
								}}
								onClick={() => onClick(item)}
							>
								<div
									className="rooms-legend-text"
									style={{
										color: 
											String(rooms) === item ? 
											"rgba(255, 255, 255, 1)" : 
											"rgba(126, 126, 132, 1)",
									}}
								>
									{item} dorm
								</div>
							</div>
						}
					</div>
				)
			})}
		</div>
	)
}

RoomsLegend.displayName="RoomsLegend";