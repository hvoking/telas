// App imports
import { PropertyTypeProvider } from './property';
import { DatesProvider } from './dates';
import { PricesProvider } from './prices';
import { AreasProvider } from './areas';
import { GeoProvider } from './geo';
import { ParcelDimensionsProvider } from './parcel';
import { CircleDimensionsProvider } from './circle';

export const FiltersProvider = ({children}: any) => {
  return (
    <PropertyTypeProvider>
    <GeoProvider>
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
    </GeoProvider>
    </PropertyTypeProvider>
  )
}

FiltersProvider.displayName="FiltersProvider";