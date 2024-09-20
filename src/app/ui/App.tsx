import { Router } from '../router';
import { Provider } from '../providers';


export const App: React.FC = () => {
  return (
    <Provider>
      <Router />
    </Provider>
  );
};
