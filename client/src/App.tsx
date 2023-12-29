import { ReactElement, FC } from 'react';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import { ConfirmEmailPage, SearchPage, GigPage, HomePage, ResetPasswordPage, RootPage } from '@/pages';

const App: FC = (): ReactElement => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <RootPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'reset_password', element: <ResetPasswordPage /> },
        { path: 'confirm_email', element: <ConfirmEmailPage /> },
        { path: 'gig/:gigId/:title', element: <GigPage /> },
        { path: 'search/:type', element: <SearchPage /> }
      ]
    }
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
