import { FC, ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';
import HomeHeader from '@/shared/header/HomeHeader';
import { saveToSessionStorage } from '@/shared/utils/utils.service';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { IReduxState } from '@/store/store.interface';

import { addAuthUser } from './auth/reducers/auth.reducer';
import { useAuthLogout } from './auth/hooks/useAuthLogout';
import { useAuthQuery } from './auth/hooks/useAuthQuery';

export interface IProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }): ReactElement => {
  const { logoutFn } = useAuthLogout();
  const { currentUserData, currentUserError } = useAuthQuery();

  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const showCategoryContainer = useAppSelector((state: IReduxState) => state.showCategoryContainer);
  const header = useAppSelector((state: IReduxState) => state.header);
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const checkUser = useCallback(async () => {
    if (currentUserData && currentUserData.user) {
      setTokenIsValid(true);
      dispatch(addAuthUser({ authInfo: currentUserData.user }));
      saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));
    }

    if (currentUserError) {
      setTokenIsValid(false);
      logoutFn(dispatch);
      navigate('/');
    }
  }, [currentUserData, dispatch, navigate, currentUserError, authUser.username]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  if ((currentUserData && currentUserData.user) || authUser) {
    if (tokenIsValid) {
      return (
        <>
          {header && header === 'home' && <HomeHeader showCategoryContainer={showCategoryContainer} />}
          {children}
        </>
      );
    } else {
      return <></>;
    }
  } else {
    return <>{<Navigate to="/" />}</>;
  }
};

export default ProtectedRoute;
