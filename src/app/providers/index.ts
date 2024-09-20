import { composeProviders } from './utils';
import { StoreProvider } from './store';
import { ThemeProvider } from './theme';


export const Provider = composeProviders([
  StoreProvider,
  ThemeProvider,
]);
