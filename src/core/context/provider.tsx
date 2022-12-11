import { FC, PropsWithChildren, useMemo } from 'react';
import { GlobalContext, useGlobalReducer } from './initial';

export const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useGlobalReducer();

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};
