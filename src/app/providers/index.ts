import { composeProviders } from './utils';
import { StoreProvider } from './store';
import { ThemeProvider } from './theme';
import { DndProvider } from './drag-and-drop';


export const Provider = composeProviders([
  StoreProvider,
  ThemeProvider,
  DndProvider,
]);
