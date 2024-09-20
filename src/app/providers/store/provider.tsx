import { store } from '../../../store';
import { Provider } from 'react-redux';
import { ProviderProps } from '../utils';


export const StoreProvider: React.FC<ProviderProps> = ({ children }) => (
  <Provider store={ store }>
    { children }
  </Provider>
);