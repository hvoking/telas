// App imports
import { BusApiProvider } from './bus';
import { SchoolsApiProvider } from './schools';
import { UniversitiesApiProvider } from './universities';
import { CnpjApiProvider } from './cnpj';

export const NearbyApiProvider = ({children}: any) => {
  return (
    <CnpjApiProvider>
    <BusApiProvider>
    <SchoolsApiProvider>
    <UniversitiesApiProvider>
      {children}
    </UniversitiesApiProvider>
    </SchoolsApiProvider>
    </BusApiProvider>
    </CnpjApiProvider>
  )
}

NearbyApiProvider.displayName="NearbyApiProvider";