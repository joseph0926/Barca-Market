import { deleteFromLocalStorage, getDataFromSessionStorage, saveToSessionStorage } from '@/shared/utils/utils.service';
import { Dispatch } from '@reduxjs/toolkit';
import { useAuthMutation } from './useAuthMutation';
import { api } from '@/store/api';
import { logout } from '@/features/auth/reducers/logout.reducer';
import { useQueryClient } from '@tanstack/react-query';
import { clearAuthUser } from '../reducers/auth.reducer';

export const useAuthLogout = () => {
  const queryClient = useQueryClient();

  const { logoutMutation, removeLoggedInUserMutation } = useAuthMutation();

  const logoutFn = (dispatch: Dispatch) => {
    const loggedInUsername: string = getDataFromSessionStorage('loggedInuser');
    logout(true);
    if (loggedInUsername) {
      removeLoggedInUserMutation(loggedInUsername);
    }
    dispatch(api.util.resetApiState());
    logoutMutation();
    queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    saveToSessionStorage(JSON.stringify(false), JSON.stringify(''));
    dispatch(clearAuthUser());
    deleteFromLocalStorage('becomeASeller');
  };

  return { logoutFn };
};
