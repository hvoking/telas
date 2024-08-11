// React imports
import { useCallback } from 'react';

// Context imports
import { useAreas } from '../../../../context/filters/areas';

// Third Party imports
import * as d3 from 'd3';

export const BrushRef = ({xScale, yScale, innerWidth, innerHeight}: any) => {
	const { setAreaMax, setAreaMin } = useAreas();

	const brushRef = useCallback((node: any) => {
      if (node !== null) {
        const brush = d3.brushX().extent([[0, 0], [innerWidth, innerHeight]])
        brush(d3.select(node));
        brush.on('end', (e) => {
            if (e.selection == null) {
                setAreaMin(30);
                setAreaMax(300);    
            }
            else {
                setAreaMin(parseInt(e.selection.map(xScale.invert)[0]));
                setAreaMax(parseInt(e.selection.map(xScale.invert)[1]));
            }
        })
      }
    }, [innerHeight, innerWidth]);

	return <g ref={brushRef}/>
}

BrushRef.displayName="BrushRef";