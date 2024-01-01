import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Alert from '@/shared/Alert';
import { IResponse } from '@/shared/interfaces/shared.interface';
import { useAppDispatch } from '@/store/store';

import { AUTH_FETCH_STATUS } from '@/features/auth/interfaces/auth.interface';
import { addAuthUser } from '@/features/auth/reducers/auth.reducer';
import { useAuthMutation } from '../hooks/useAuthMutation';

const ConfirmEmail: FC = (): ReactElement => {
  const {verifyEmailMutation} = useAuthMutation()

  const [alertMessage, setAlertMessage] = useState<string>('');
  const [status, setStatus] = useState<string>(AUTH_FETCH_STATUS.IDLE);
  const [searchParams] = useSearchParams({});
  const dispatch = useAppDispatch();

  const onVerifyEmail = useCallback(async (): Promise<void> => {
    try {
      const result: IResponse = await verifyEmailMutation(`${searchParams.get('v_token')}`);
      setAlertMessage('Email verified successfully.');
      setStatus(AUTH_FETCH_STATUS.SUCCESS);
      dispatch(addAuthUser({ authInfo: result.user }));
    } catch (error) {
      setStatus(AUTH_FETCH_STATUS.ERROR);
      setAlertMessage(error?.data.message);
    }
  }, [dispatch, searchParams, verifyEmailMutation]);

  useEffect(() => {
    onVerifyEmail();
  }, [onVerifyEmail]);

  return (
    <div className="container mx-auto mt-20 flex flex-col items-center justify-center px-6 py-8 lg:py-0">
      <div className="w-[30%]">
        <Alert type={status} message={alertMessage} />
      </div>
      <Link
        to="/"
        className="mt-5 rounded bg-orange-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-orange-400 focus:outline-none md:px-4 md:py-2 md:text-base"
      >
        Continue to Home
      </Link>
    </div>
  );
};

export default ConfirmEmail;
