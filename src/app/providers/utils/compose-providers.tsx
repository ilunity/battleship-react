import { ProviderProps } from './types.ts';

export const composeProviders = (providers: React.FC<ProviderProps>[]) =>
  providers.reduce((Prev, Curr) => ({ children }) => (
    <Prev>
      <Curr>{ children } </Curr>
    </Prev>
  ));
