// React imports
import { useEffect, useRef } from 'react';

// App imports
import { Info } from './info';
import { SvgMap } from './svgMap';
import './styles.scss';

// Context imports
import { useScroll } from '../../context/scroll';

export const Page1 = () => {
	const scroll1Ref = useRef<any>(null);
	const { view1, setView1, scroll1, setScroll1, setScroll2 } = useScroll();

	useEffect(() => {
		const executeTopScroll = (currentRef: any, setState: any) => {
		  let target = currentRef.current;
		  target.parentNode.scrollTop = target.parentNode.height;
		  setState(false);
		};
		  executeTopScroll(scroll1Ref, setScroll1)
	}, [ scroll1, view1 ]);

	const onWheel = (e: any) => {
		if(e.deltaY >= 0){
			setScroll2((prev: any) => !prev)
		} else {
			setScroll1(true)
			setView1(true)
		}
	}

	return (
		<div
			className="page1-wrapper" 
			ref={scroll1Ref} 
			onWheel={onWheel} 
		>
			<Info/>
			<SvgMap/>
		</div>
	)
}

Page1.displayName="Page1";