// App imports
import { SVGWrapper } from './svg';

// Context imports
import { usePolygonApi } from '../../../context/api/polygon';
import { useIsoPolygonApi } from '../../../context/api/isoPolygon';
import { useIsoPolygonSizes } from '../../../context/sizes/isoPolygon';

// Third-party imports
import * as d3 from 'd3';

export const SvgMap = () => {
	const { polygonData } = usePolygonApi();
	const { isoPolygonData } = useIsoPolygonApi();
	const { innerWidth, innerHeight } = useIsoPolygonSizes();

	if (!polygonData || !polygonData[0] || !polygonData[0].city_geom) return (<></>)

	const city = polygonData[0].city_geom[0];
	const polygon = isoPolygonData.features[0].geometry;

	const projection = d3.geoIdentity()
		.reflectY(true)
		.fitSize([ innerWidth, innerHeight ], city)

	const path = d3.geoPath(projection);

	return (
		<SVGWrapper>
			<g>
				<path
					fill="rgba(126, 126, 132, 0.1)"
					stroke="rgba(255, 255, 255, 1)"
					strokeWidth={0.2}
					className="feature" 
					d={`${path(city)}`}
				/>
				<path
					fill="rgba(222, 112, 112, 0.4)"
					stroke="rgba(255, 255, 255, 1)" 
					strokeWidth={0.3}
					className="feature" 
					d={`${path(polygon)}`}
				/>
			</g>
		</SVGWrapper>
	)
}

SvgMap.displayName="SvgMap";