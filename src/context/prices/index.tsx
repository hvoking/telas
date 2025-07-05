import { PricesSelectorsProvider } from './selectors';
import { PricesConstantsProvider } from './constants';

export const PricesProvider = ({children}: any) => {
  return (
    <PricesSelectorsProvider>
    <PricesConstantsProvider>
      {children}
    </PricesConstantsProvider>
    </PricesSelectorsProvider>
  )
}

PricesProvider.displayName="PricesProvider";