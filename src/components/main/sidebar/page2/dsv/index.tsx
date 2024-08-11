// App imports
import { DsvLegend } from './legend';
import './styles.scss';

export const Dsv = () => {
	return (
		<div className="dsv">
			<div className="sidebar-sub-title">dsv</div>
			<DsvLegend/>
		</div>
	)
} 

Dsv.displayName="Dsv";