import React from 'react';
import { LayoutProps } from './Layout.types';
import { LayoutContainer, LayoutWrapper } from './Layout.styles.ts';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <LayoutWrapper>
        { children }
      </LayoutWrapper>
    </LayoutContainer>
  );
};
