import { FC, PropsWithChildren } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../core/context/initialContextState';

const getCookieValue = (name: string): string | undefined | null => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop();

const setCookie = (name: string, value: string | null, expires?: string | number) =>
  (document.cookie = `${name}=${value};path=/;maxAge=${expires || 1000 * 60 * 60 * 24}`);

type AuthorizedRouteProps = PropsWithChildren<{
  requireAuthorization?: boolean;
  requireGuest?: boolean;
}>;

const AuthorizedRoute: FC<AuthorizedRouteProps> = ({ requireAuthorization, requireGuest }) => {
  const location = useLocation();
  const { state } = useGlobalContext();

  if (requireAuthorization && !state.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (requireGuest && state.user) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default AuthorizedRoute;
