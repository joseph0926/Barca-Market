import { FC, ReactElement, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AppRouter from './AppRoutes';
import useBeforeWindowUnload from '@/hooks/useBeforeWindowUnload';
import { socketService } from './sockets/socket.service';

const App: FC = (): ReactElement => {
  useBeforeWindowUnload();

  useEffect(() => {
    socketService.setupSocketConnection();
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="relative flex min-h-screen w-screen flex-col">
          <AppRouter />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
