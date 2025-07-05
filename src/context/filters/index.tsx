// App imports
import { PropertyTypeProvider } from './property';
import { DatesProvider } from './dates';
import { PricesProvider } from './prices';
import { AreasProvider } from './areas';
import { ParcelDimensionsProvider } from './parcel';
import { CircleDimensionsProvider } from './circle';

export const FiltersProvider = ({children}: any) => {
  return (
    <PropertyTypeProvider>
    <DatesProvider>
    <PricesProvider>
    <AreasProvider>
    <ParcelDimensionsProvider>
    <CircleDimensionsProvider>
      {children}
    </CircleDimensionsProvider>
    </ParcelDimensionsProvider>
    </AreasProvider>
    </PricesProvider>
    </DatesProvider>
    </PropertyTypeProvider>
  )
}

FiltersProvider.displayName="FiltersProvider";