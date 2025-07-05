// App imports
import { PricesProvider } from './prices';
import { FiltersProvider } from './filters';
import { MapsProvider } from './maps';
import { ApiProvider } from './api';
import { ScrollProvider } from './scroll';
import { SizesProvider } from './sizes';
import { GeoProvider } from './geo';
import { SearchProvider } from './search';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <ScrollProvider>
    <FiltersProvider>
    <ApiProvider>
    <SearchProvider>
    <SizesProvider>
    <PricesProvider>
    <MapsProvider>
      {children}
    </MapsProvider>
    </PricesProvider>
    </SizesProvider>
    </SearchProvider>
    </ApiProvider>
    </FiltersProvider>
    </ScrollProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";