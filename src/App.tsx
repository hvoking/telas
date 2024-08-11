// App imports
import { YuRoutes } from './routes';
import './styles.scss';

// Context imports
import { MainProvider } from './components/main/context';

// Third party imports
import { HashRouter as Router } from 'react-router-dom';

export const App = () => {
  return (
    <div className="App">
      <Router>
        <MainProvider>
          <YuRoutes/>
        </MainProvider>
      </Router>
    </div>
  );
}