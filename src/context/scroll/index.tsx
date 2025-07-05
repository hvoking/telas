// React imports
import { useState, useEffect, useContext, createContext } from 'react';

const ScrollContext: React.Context<any> = createContext(null)

export const useScroll = () => {
	return (
		useContext(ScrollContext)
	)
}

export const ScrollProvider = ({children}: any) => {
	const [ scroll1, setScroll1 ] = useState(true);
	const [ scroll2, setScroll2 ] = useState(false);
	const [ scroll3, setScroll3 ] = useState(false);
	const [ scroll4, setScroll4 ] = useState(false);

	const [ view1, setView1 ] = useState(true);
	const [ view2, setView2 ] = useState(false);
	const [ view3, setView3 ] = useState(false);
	const [ view4, setView4 ] = useState(false);

	// View 1
	useEffect(() => {
		setView1(true);
	}, [scroll1]);

	useEffect(() => {
		setView1(false);
	}, [scroll2, scroll3, scroll4]);

	// View 2
	useEffect(() => {
		setView2(true);
	}, [scroll2]);

	useEffect(() => {
		setView2(false);
	}, [scroll1, scroll3, scroll4]);

	// View 3
	useEffect(() => {
		setView3(true);
	}, [scroll3]);

	useEffect(() => {
		setView3(false);
	}, [scroll1, scroll2, scroll4]);

	// View 4
	useEffect(() => {
		setView4(true);
	}, [scroll4]);

	useEffect(() => {
		setView4(false);
	}, [scroll1, scroll2, scroll3]);

	return (
		<ScrollContext.Provider value={{ 
			scroll1, setScroll1,
			scroll2, setScroll2,
			scroll3, setScroll3,
			scroll4, setScroll4,
			view1, setView1,
			view2, setView2,
			view3, setView3,
			view4, setView4,
		}}>
			{children}
		</ScrollContext.Provider>
	)
}

ScrollContext.displayName = "ScrollContext";