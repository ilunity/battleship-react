import { ProviderProps } from '../utils';
import { DndProvider as ReactDndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const DndProvider: React.FC<ProviderProps> = ({ children }) => (
  <ReactDndProvider backend={ HTML5Backend }>
    { children }
  </ReactDndProvider>
);
