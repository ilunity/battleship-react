import React from 'react';
import { ProviderProps } from '../utils';
import { theme } from './theme.ts';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';


export const ThemeProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <StyledComponentsProvider theme={ theme }>
      { children }
    </StyledComponentsProvider>
  );
};
