import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
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
    )
  );

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
