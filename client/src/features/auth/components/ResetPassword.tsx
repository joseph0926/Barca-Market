import { ChangeEvent, FC, FormEvent, ReactElement, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Alert from '@/shared/Alert';
import Button from '@/shared/Button';
import Header from '@/shared/header/Header';
import Input from '@/shared/Input';
import { IResponse } from '@/shared/interfaces/shared.interface';

import { useAuthSchema } from '@/features/auth/hooks/useAuthSchema';
import { AUTH_FETCH_STATUS, IResetPassword } from '@/features/auth/interfaces/auth.interface';
import { resetPasswordSchema } from '@/features/auth/schemes/auth.schema';
import { useResetPasswordMutation } from '@/features/auth/services/auth.service';

const ResetPassword: FC = (): ReactElement => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [userInfo, setUserInfo] = useState<IResetPassword>({
    password: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState<string>(AUTH_FETCH_STATUS.IDLE);
  const [schemaValidation] = useAuthSchema({ schema: resetPasswordSchema, userInfo });
  const [searchParams] = useSearchParams({});
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onResetPassword = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const isValid: boolean = await schemaValidation();
      if (isValid) {
        const result: IResponse = await resetPassword({
          password: userInfo.password,
          confirmPassword: userInfo.confirmPassword,
          token: `${searchParams.get('token')}`
        }).unwrap();
        setAlertMessage(`${result.message}`);
        setStatus(AUTH_FETCH_STATUS.SUCCESS);
        setUserInfo({ password: '', confirmPassword: '' });
      }
    } catch (error) {
      setStatus(AUTH_FETCH_STATUS.ERROR);
      setAlertMessage(error?.data.message);
    }
  };

  return (
    <>
      <Header navClass="navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
      <div className="relative mx-auto mt-24 w-11/12 max-w-md rounded-lg bg-white md:w-2/3">
        <div className="relative px-5 py-5">
          <h2 className="mb-2 text-center text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-black">Reset Password</h2>
          {alertMessage && <Alert type={status} message={alertMessage} />}
          <form className="mt-4 space-y-4 md:space-y-5 lg:mt-5">
            <div>
              <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={userInfo.password}
                className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-orange-500/50 focus:outline-none"
                placeholder="Enter password"
                onChange={(event: ChangeEvent) => {
                  setUserInfo({ ...userInfo, password: (event.target as HTMLInputElement).value });
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={userInfo.confirmPassword}
                className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-orange-500/50 focus:outline-none"
                placeholder="Enter confirm password"
                onChange={(event: ChangeEvent) => {
                  setUserInfo({ ...userInfo, confirmPassword: (event.target as HTMLInputElement).value });
                }}
              />
            </div>
            <Button
              disabled={!userInfo.password || !userInfo.confirmPassword}
              className={`text-md block w-full cursor-pointer rounded bg-orange-500 px-8 py-2 text-center font-bold text-white hover:bg-orange-400 focus:outline-none ${
                !userInfo.password || !userInfo.confirmPassword ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              label={`${isLoading ? 'RESET PASSWORD IN PROGRESS...' : 'RESET PASSWORD'}`}
              onClick={onResetPassword}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
