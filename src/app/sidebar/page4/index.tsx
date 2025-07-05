// React imports
import { useEffect, useRef } from 'react';

// App imports
import './styles.scss';

// Context imports
import { useScroll } from 'context/scroll';

export const Page4 = () => {
	const scroll4Ref = useRef<any>(null);
	const { view4, scroll4, setScroll3, setScroll4, setView4 } = useScroll();

	useEffect(() => {
		const executeScroll = (currentRef: any, setState: any) => {
			currentRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'start'
			});
			setState(false);
		}
		if (scroll4 || view4) {executeScroll(scroll4Ref, setScroll4)}
	}, [ scroll4, view4 ]);

	const onWheel = (e: any) => {
		if(e.deltaY <= 0){
			setScroll3((prev: any) => !prev)
		} else {
			setScroll4(true)
			setView4(true)
		}
	}

	return (
		<div 
			onWheel={onWheel} 
			ref={scroll4Ref} 
		>
		</div>
	)
}

Page4.displayName="Page4";