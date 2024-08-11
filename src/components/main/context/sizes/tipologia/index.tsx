// App imports
import { RoomsBarsSizesProvider } from './bars/rooms';
import { RoomsGaugeSizesProvider } from './gauge/rooms';
import { DsvBarsSizesProvider } from './bars/dsv';

export const TipologiaSizesProvider = ({ children }: any) => {
	return (
		<RoomsBarsSizesProvider>
		<RoomsGaugeSizesProvider>
		<DsvBarsSizesProvider>
			{children}			
		</DsvBarsSizesProvider>
		</RoomsGaugeSizesProvider>
		</RoomsBarsSizesProvider>
	)
}

TipologiaSizesProvider.displayName="TipologiaSizesProvider"