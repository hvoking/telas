// React imports
import { useEffect, useRef } from 'react';

// App imports
import { Rooms } from './rooms';
import { Dsv } from './dsv';
import { Areas } from './areas';
import './styles.scss';

// Context imports
import { useScroll } from 'context/scroll';

export const Page2 = () => {
	const scroll2Ref = useRef<any>(null);
	const { view2, scroll2, setScroll1, setScroll2, setScroll3, setView1, setView3 } = useScroll();

	useEffect(() => {
		const executeScroll = (currentRef: any, setState: any) => {
			currentRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'start'
			});
			setState(false);
		}
		if (scroll2 || view2) {executeScroll(scroll2Ref, setScroll2)}
	}, [ scroll2, view2 ]);

	const onWheel = (e: any) => {
		if(e.deltaY >= 0){
			setScroll3((prev: any) => !prev)
			setView3(true)
		} else {
			setScroll1((prev: any) => !prev)
			setView1(true)
		}
	}
	
	return (
		<div 
			className="page2-wrapper"
			ref={scroll2Ref} 
			onWheel={onWheel} 
		>
			<Rooms/>
			<Dsv/>
			<Areas/>
		</div>
	)
}

Page2.displayName="Page2";