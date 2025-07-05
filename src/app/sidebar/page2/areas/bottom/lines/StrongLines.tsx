// Context imports
import { useAreas } from 'context/filters/areas';

// Third party imports
import * as d3 from 'd3'

interface StrongLinesType {
  xScale: any
  innerWidth: any
  yAxisOffset: any
  innerHeight: any
  margin: any
  areasLegendArray: any
  stroke: string
  strokeWidth: string
}

export const StrongLines = (
  { 
    xScale,
    innerWidth,
    yAxisOffset, 
    innerHeight, 
    margin,
    areasLegendArray,
    stroke,
    strokeWidth,
  }: StrongLinesType) => {
    const { areaMin, areaMax } = useAreas();

    const xScaleBand: any = d3.scaleBand()
      .domain(areasLegendArray)
      .range([0, innerWidth])
  return (
    <>
    {xScaleBand.domain().map((currentValue: number) => (
      <g 
        key={currentValue} 
        className="bar-tick"
        transform={`
            translate(
              ${xScale(currentValue)}, 
              ${innerHeight}
            )
        `}
      >
        <line
          x1={0}
          x2={0}
          y1={0}
          y2={8}
          stroke={currentValue >= areaMin && currentValue <= areaMax ? "rgba(126, 126, 132, 1)" : "rgba(77, 77, 77, 1)"}
          strokeWidth={strokeWidth}
        />
      </g>
      ))}
    </>
    )}