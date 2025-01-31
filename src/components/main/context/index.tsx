// App imports
import { PricesProvider } from './prices';
import { FiltersProvider } from './filters';
import { MapsProvider } from './maps';
import { ApiProvider } from './api';
import { ScrollProvider } from './scroll';
import { SizesProvider } from './sizes';

export const MainProvider = ({children}: any) => {
  return (
    <ScrollProvider>
    <FiltersProvider>
    <ApiProvider>
    <SizesProvider>
    <PricesProvider>
    <MapsProvider>
      {children}
    </MapsProvider>
    </PricesProvider>
    </SizesProvider>
    </ApiProvider>
    </FiltersProvider>
    </ScrollProvider>
  )
}

MainProvider.displayName="MainProvider";