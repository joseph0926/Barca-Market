import { FC, ReactElement, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AppRouter from './AppRoutes';
import useBeforeWindowUnload from '@/hooks/useBeforeWindowUnload';
import { socketService } from './sockets/socket.service';

const App: FC = (): ReactElement => {
  useBeforeWindowUnload();

  const queryClient = new QueryClient();

  useEffect(() => {
    socketService.setupSocketConnection();
  }, []);

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <div className="relative flex min-h-screen w-screen flex-col">
            <AppRouter />
            <ToastContainer />
          </div>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
