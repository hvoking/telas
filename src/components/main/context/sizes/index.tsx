// App imports
import { IsoPolygonSizesProvider } from './isoPolygon';
import { TipologiaSizesProvider } from './tipologia';
import { PricesSizesProvider } from './prices';
import { AreasSizesProvider } from './areas';
import { LeftSizesProvider } from './left';

export const SizesProvider = ({children}: any) => {
  return (
   
    <AreasSizesProvider>
    <IsoPolygonSizesProvider>
    <TipologiaSizesProvider>
    <PricesSizesProvider>
    <LeftSizesProvider>
      {children}
    </LeftSizesProvider>
    </PricesSizesProvider>
    </TipologiaSizesProvider>
    </IsoPolygonSizesProvider>
    </AreasSizesProvider>
   
  )
}

SizesProvider.displayName="SizesProvider";