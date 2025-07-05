// Third party imports
import * as d3 from 'd3';

// Context imports
import { useAreas } from 'context/filters/areas'

interface AxisTextType {
	xScale: any
	innerWidth: any
	innerHeight: any
	areasLegendArray: any
}

export const AxisText = ({ xScale, innerWidth, innerHeight, areasLegendArray }: AxisTextType) => {
	const { areaMin, areaMax } = useAreas();
	
	const xScaleBand: any = d3.scaleBand()
		.domain(areasLegendArray)
		.range([0, innerWidth])

	return (
		<>
			{xScaleBand.domain().map((currentValue: number) => (
				<g
					key={currentValue}
					transform={`translate(${xScale(currentValue)},${innerHeight})`}
				>
					<text
						className="area-number"
						y={22}
						textAnchor="middle"
						fill={currentValue >= areaMin && currentValue <= areaMax ? "rgba(126, 126, 132, 1)": "rgba(77, 77, 77, 1)"}
						fontSize="0.8em"
					>
						{currentValue}
					</text>
				</g>
			))}
		</>
	)
}

AxisText.displayName="AxisText";