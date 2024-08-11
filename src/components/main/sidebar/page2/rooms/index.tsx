// App imports
import { RoomsGauge } from './gauge';
import { RoomsLegend } from './legend';
import './styles.scss';

export const Rooms = () => {
	return (
		<div className="rooms">
			<div className="sidebar-sub-title">dormitórios</div>
			<div className="rooms-wrapper">
				<RoomsLegend/>
				<RoomsGauge/>
			</div>
		</div>
	)
} 

Rooms.displayName="Rooms";