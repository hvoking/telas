// App  imports
import { AxisText } from './text';
import { Lines } from './lines';
import { StrongLines } from './lines/StrongLines';

export const AxisBottom = ({ xScale, margin, innerWidth, innerHeight }: any) => {
	return (
		<>
			<Lines 
				margin={margin}
				xScale={xScale}
				innerWidth={innerWidth}
				innerHeight={innerHeight}
				yAxisOffset={10}
				areasLegendArray={Array.from({length: 28}, (_, i) => ((i)*10) + 30)}
				stroke="rgba(126, 126, 132, 0.8)"
				strokeWidth="1"
			/>
			<StrongLines 
				margin={margin}
				xScale={xScale}
				innerWidth={innerWidth}
				innerHeight={innerHeight}
				yAxisOffset={10} 
				areasLegendArray={Array.from({length: 10}, (_, i) => (i + 1)*30)}
				stroke="rgba(126, 126, 132, 1)"
				strokeWidth="1"
			/>
			<AxisText
				xScale={xScale}
				innerWidth={innerWidth}
				innerHeight={innerHeight}
				areasLegendArray={Array.from({length: 10}, (_, i) => (i + 1)*30)}
			/>
    	</>
	)
}

AxisBottom.displayName="AxisBottom";