import { deleteFromLocalStorage, getDataFromSessionStorage, saveToSessionStorage } from '@/shared/utils/utils.service';
import { Dispatch } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { useAuthMutation } from './useAuthMutation';
import { api } from '@/store/api';
import { logout } from '@/features/auth/reducers/logout.reducer';

export const useAuthLogout = () => {
  const { logoutMutation, removeLoggedInUserMutation } = useAuthMutation();

  const logoutFn = (dispatch: Dispatch, navigate: NavigateFunction) => {
    const loggedInUsername: string = getDataFromSessionStorage('loggedInuser');
    logout(true);
    if (loggedInUsername) {
      removeLoggedInUserMutation(loggedInUsername);
    }
    dispatch(api.util.resetApiState());
    logoutMutation();
    saveToSessionStorage(JSON.stringify(false), JSON.stringify(''));
    deleteFromLocalStorage('becomeASeller');
    navigate('/');
  };

  return { logoutFn };
};
