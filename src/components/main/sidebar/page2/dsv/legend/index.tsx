// App imports
import { SVGWrapper } from '../svg';
import { Background } from './background';
import { Front } from './front';
import { DsvText } from './text/dsv';
import { PercentText } from './text/percent';

// Context imports
import { useDsvApi } from '../../../../context/api/imoveis/dsv';
import { usePropertyType } from '../../../../context/filters/property';
import { useDsvBarsSizes } from '../../../../context/sizes/tipologia/bars/dsv';

// Third party imports
import * as d3 from 'd3';

export const DsvLegend = () => {
	const { dsvData } = useDsvApi();
	const { rooms, suites, garages, setRooms, setSuites, setGarages } = usePropertyType();
	const { innerWidth } = useDsvBarsSizes();

	const currentType = `${rooms},${suites},${garages}`;

	let totalHeight = 0;

	const onClick = (item: any) => {
		const newItem = item.split(",")

		setRooms(newItem[0])
		setSuites(newItem[1])
		setGarages(newItem[2])
	}

	if (!dsvData) return <div>Loading...</div>

	const dsvCount = dsvData[`d${rooms}`].counts;
	const sumOfCounts = dsvData[`d${rooms}`].counts && d3.sum(Object.values(dsvData[`d${rooms}`].counts));

	const currentDsvCount = dsvCount &&  Object.keys(dsvCount).sort((a, b) => dsvCount[b] - dsvCount[a])
		
	return (
		<SVGWrapper>
			{sumOfCounts && currentDsvCount && currentDsvCount.map((item: any, index: number) => {
				const currentPercent = (dsvCount[item] / sumOfCounts) * 100;
				const currentHeight = 25;
				const currentGap = 5;
				const currentDifference = 15;

				totalHeight += currentHeight;

				return (
					<g key={index}>
						{currentPercent > 2 && 
							<>
							<Background
								item={item}
								currentPercent={currentPercent}
								innerWidth={innerWidth}
								totalHeight={totalHeight}
								currentHeight={currentHeight}
								currentGap={currentGap}
								currentDifference={currentDifference}
								currentType={currentType}
								onClick={onClick}
							/>
							<Front
								item={item}
								innerWidth={innerWidth}
								totalHeight={totalHeight}
								currentHeight={currentHeight}
								currentGap={currentGap}
								currentPercent={currentPercent}
								currentDifference={currentDifference}
								currentType={currentType}
								dsvData={dsvData}
								rooms={rooms}
								onClick={onClick}
								reducedCount={dsvCount}
								sumOfCounts={sumOfCounts}
							/>
							<DsvText
								item={item}
								totalHeight={totalHeight}
								currentHeight={currentHeight}
								currentType={currentType}
								onClick={onClick}
							/>
							<PercentText
								item={item}
								innerWidth={innerWidth}
								totalHeight={totalHeight}
								currentHeight={currentHeight}
								currentType={currentType}
								onClick={onClick}
								currentPercent={currentPercent}
							/>
						</>
					}
					</g>
				)
			})}
		</SVGWrapper>
	)
}

DsvLegend.displayName="DsvLegend";