// React imports
import { useEffect, useRef } from 'react';

// App imports
import { Left } from './left';
import './styles.scss';

// Context imports
import { useScroll } from 'context/scroll';

export const Page3 = () => {
	const scroll4Ref = useRef<any>(null);
	const { view3, scroll3, setScroll2, setScroll3, setScroll4, setView2, setView4 } = useScroll();

	useEffect(() => {
		const executeScroll = (currentRef: any, setState: any) => {
			currentRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'start'
			});
			setState(false);
		}
		if (scroll3 || view3) {executeScroll(scroll4Ref, setScroll3)}
	}, [ scroll3, view3 ]);
	
	const onWheel = (e: any) => {
		if(e.deltaY >= 0){
			setScroll4((prev: any) => !prev)
			setView4(true)
		} else {
			setScroll2((prev: any) => !prev)
			setView2(true)
		}
	}

	return (
		<div onWheel={onWheel} ref={scroll4Ref} className="page3-wrapper">
			<Left/>
		</div>
	)
}

Page3.displayName="Page3";