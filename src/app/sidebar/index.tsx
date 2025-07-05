// App imports
import { Page1 } from './page1';
import { Page2 } from './page2';
import { Page3 } from './page3';
import { Page4 } from './page4';
import './styles.scss';
import './scrollbar.scss';

export const Sidebar = () => {
	return (
		<div className="sidebar-pages">
			<Page1/>
			<Page2/>
			<Page3/>
			<Page4/>
		</div>
	)
}

Sidebar.displayName="Sidebar";