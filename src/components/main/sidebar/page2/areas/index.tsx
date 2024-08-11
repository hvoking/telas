// App imports
import { SVGWrapper } from './svg';
import { AreaSlider } from './slider';
import { AxisBottom } from './bottom';
import { AreasLegend } from './legend';
import { BrushRef } from './brush';
import './styles.scss';

// Context imports
import { useAreasApi } from '../../../context/api/imoveis/areas';
import { useAreasSizes } from '../../../context/sizes/areas';

// Third party imports
import * as d3 from 'd3';

export const Areas = () => {
	const { areasData } = useAreasApi();
	const { margin, innerWidth, innerHeight } = useAreasSizes();

	const xScale: any = d3.scaleLinear()
		.domain([30, 300])
		.range([0, innerWidth])

	const yScale: any = (percentage: any) => d3.scaleLinear()
		.domain([0, percentage])
		.range([0, innerHeight - 25])

	const maxPercentage: any = areasData && d3.max(Object.values(areasData.areas_percentage));

	return (
		<div className="areas-wrapper">
			<AreasLegend/>
			<SVGWrapper>
			  <AreaSlider
				xScale={xScale}
				yScale={maxPercentage && yScale(maxPercentage)}
				margin={margin}
				innerWidth={innerWidth}
				innerHeight={innerHeight}
				data={areasData}
			  />
			  <BrushRef
	            xScale={xScale}
	            yScale={yScale}
	            innerWidth={innerWidth}
	            innerHeight={innerHeight}
	          />
		  	  <AxisBottom
		  	  	xScale={xScale}
		  	  	margin={margin}
		  	  	innerWidth={innerWidth}
		  	  	innerHeight={innerHeight}
		  	  />
		  </SVGWrapper>
	  </div>
	)
}

Areas.displayName="Areas";