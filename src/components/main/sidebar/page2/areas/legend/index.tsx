// Context imports
import { useAreas } from '../../../../context/filters/areas';

export const AreasLegend = () => {
	const { areaMin, setAreaMin, areaMax, setAreaMax } = useAreas();

	const onChangeMin = (e: any) => {
		const currentValue = e.target.value;
		if (currentValue >= 0 && currentValue < areaMax) {
			setAreaMin(currentValue)
		}
	}
	const onChangeMax = (e: any) => {
		const currentValue = e.target.value;
		setAreaMax(currentValue)
	}

	return (
		<div className="areas-legend-wrapper">
			<div className="sidebar-sub-title">área útil</div>
			<div></div>
			<div className="areas-input-wrapper">
				<div className="areas-input-title">de:</div>
				<input className="areas-input" value={areaMin} onChange={onChangeMin}/>
			</div>
			<div className="areas-input-wrapper">
				<div className="areas-input-title">
					até:
				</div>
				<input className="areas-input" value={areaMax} onChange={onChangeMax}/>
			</div>
		</div>
	)
}

AreasLegend.displayName="AreasLegend";