// App imports
import { VarejoClustersProvider } from './varejo';
import { ServicosClustersProvider } from './servicos';
import { AlimentacaoClustersProvider } from './alimentacao';
import { EducacaoClustersProvider } from './educacao';
import { PesquisasClustersProvider } from './pesquisas';
import { CnpjClustersProvider } from './cnpj';

export const ClustersProvider = ({ children }: any) => {
  return (
    <CnpjClustersProvider>
    <VarejoClustersProvider>
    <ServicosClustersProvider>
    <AlimentacaoClustersProvider>
    <EducacaoClustersProvider>
    <PesquisasClustersProvider>
      {children}
    </PesquisasClustersProvider>
    </EducacaoClustersProvider>
    </AlimentacaoClustersProvider>
    </ServicosClustersProvider>
    </VarejoClustersProvider>
    </CnpjClustersProvider>
  )
}