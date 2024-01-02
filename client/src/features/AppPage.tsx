import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import HomeHeader from '@/shared/header/HomeHeader';
import { getDataFromLocalStorage, getDataFromSessionStorage, saveToSessionStorage } from '@/shared/utils/utils.service';
import { socket } from 'src/sockets/socket.service';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { IReduxState } from '@/store/store.interface';

import { addAuthUser } from './auth/reducers/auth.reducer';
import { addBuyer } from './buyer/reducers/buyer.reducer';
import Home from './home/components/Home';
import Index from './index/Index';
import { addSeller } from './sellers/reducers/seller.reducer';
import { useGetSellerByUsernameQuery } from './sellers/services/seller.service';
import { useAuthLogout } from './auth/hooks/useAuthLogout';
import { useAuthQuery } from './auth/hooks/useAuthQuery';
import { useBuyerQuery } from './buyer/hooks/useBuyerQuery';

const AppPage: FC = (): ReactElement => {
  const { logoutFn } = useAuthLogout();
  const { currentUserData } = useAuthQuery();
  const { currentBuyer } = useBuyerQuery();

  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const appLogout = useAppSelector((state: IReduxState) => state.logout);
  const showCategoryContainer = useAppSelector((state: IReduxState) => state.showCategoryContainer);
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { data: sellerData } = useGetSellerByUsernameQuery(`${authUser.username}`, {
    skip: authUser.id === null
  });

  const checkUser = useCallback(async () => {
    try {
      if (currentUserData && currentUserData.user && !appLogout) {
        setTokenIsValid(true);
        dispatch(addAuthUser({ authInfo: currentUserData.user }));
        dispatch(addBuyer(currentBuyer?.buyer));
        dispatch(addSeller(sellerData?.seller));
        saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));
        const becomeASeller = getDataFromLocalStorage('becomeASeller');
        if (becomeASeller) {
          navigate('/seller_onboarding');
        }
        if (authUser.username !== null) {
          socket.emit('loggedInUsers', authUser.username);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentUserData, navigate, dispatch, appLogout, authUser.username, currentBuyer, sellerData]);

  const isLoggedIn = getDataFromSessionStorage('isLoggedIn');
  const logoutUser = useCallback(async () => {
    if (!isLoggedIn) {
      setTokenIsValid(false);
      logoutFn(dispatch, navigate);
    }
  }, [dispatch, navigate, isLoggedIn]);

  useEffect(() => {
    checkUser();
    logoutUser();
  }, [checkUser, logoutUser]);

  if (authUser) {
    return !tokenIsValid && !authUser.id ? (
      <Index />
    ) : (
      <>
        (
        <>
          <HomeHeader showCategoryContainer={showCategoryContainer} />
          <Home />
        </>
        )
      </>
    );
  } else {
    return <Index />;
  }
};

export default AppPage;
