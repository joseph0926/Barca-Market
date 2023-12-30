import { useEffect } from 'react';
import { socket } from '@/sockets/socket.service';

import { getDataFromSessionStorage } from '@/shared/utils/utils.service';

const useBeforeWindowUnload = (): void => {
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      const loggedInUsername: string = getDataFromSessionStorage('loggedInUser');
      socket.emit('removeLoggedInUser', loggedInUsername);
    });
  }, []);
};

export default useBeforeWindowUnload;
