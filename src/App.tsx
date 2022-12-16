// 3rd Party Imports
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
//Components
import AuthorizedRoute from './components/AuthorizedRoute';
import RootLayout from './components/layout/RootLayout';
//Pages
import ErrorPage from './pages/ErrorPage';
import HomePage, { loader as rootLoader } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' id='root' element={<RootLayout />} loader={rootLoader} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<HomePage />} />

          <Route path='/' element={<AuthorizedRoute requireGuest />}>
            <Route
              path='signup'
              element={<SignUpPage />}
              // loader={signupLoader}
              // action={signupAction}
            />
            <Route
              path='login'
              element={<LoginPage />}
              // loader={loginLoader}
              // action={loginAction}
            />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
