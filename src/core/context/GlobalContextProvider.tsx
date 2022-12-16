import { FC, PropsWithChildren, useEffect, useMemo } from 'react';
import { GlobalContext, useGlobalReducer } from './initialContextState';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { GlobalActionKeys } from './action';

export const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useGlobalReducer();

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  // Listen for auth state changes (is user logged in or out)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: GlobalActionKeys.UpdateUser, payload: user });
    });
    return () => unsubscribe();
  }, [dispatch]);

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};
