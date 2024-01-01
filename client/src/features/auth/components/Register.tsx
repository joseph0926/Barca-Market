import { ChangeEvent, FC, ReactElement, useRef, useState } from 'react';
import { FaCamera, FaChevronLeft, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import Alert from '@/shared/Alert';
import Button from '@/shared/Button';
import Dropdown from '@/shared/Dropdown';
import { updateCategoryContainer } from '@/shared/header/reducers/category.reducer';
import { updateHeader } from '@/shared/header/reducers/header.reducer';
import Input from '@/shared/Input';
import { IModalBgProps } from '@/shared/interfaces/modal.interface';
import ModalBg from '@/shared/modals/ModalBg';
import { IResponse } from '@/shared/interfaces/shared.interface';
import { checkImage, readAsBase64 } from '@/shared/utils/image-utils.service';
import { countriesList, saveToSessionStorage } from '@/shared/utils/utils.service';
import { useAppDispatch } from '@/store/store';

import { useAuthSchema } from '@/features/auth/hooks/useAuthSchema';
import { ISignUpPayload } from '@/features/auth/interfaces/auth.interface';
import { addAuthUser } from '@/features/auth/reducers/auth.reducer';
import { updateLogout } from '@/features/auth/reducers/logout.reducer';
import { registerUserSchema } from '@/features/auth/schemes/auth.schema';
import { useAuthMutation } from '../hooks/useAuthMutation';

const RegisterModal: FC<IModalBgProps> = ({ onClose, onToggle }): ReactElement => {
  const { isSignupLoading, signupMutation } = useAuthMutation();

  const [step, setStep] = useState<number>(1);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [country, setCountry] = useState<string>('Select Country');
  const [passwordType, setPasswordType] = useState<string>('password');
  const [profileImage, setProfileImage] = useState<string>('https://placehold.co/330x220?text=Profile+Image');
  const [showImageSelect, setShowImageSelect] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<ISignUpPayload>({
    username: '',
    password: '',
    email: '',
    country: '',
    profileImage: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [schemaValidation] = useAuthSchema({ schema: registerUserSchema, userInfo });

  const handleFileChange = async (event: ChangeEvent): Promise<void> => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (target.files) {
      const file: File = target.files[0];
      const isValid = checkImage(file, 'image');
      if (isValid) {
        const dataImage: string | ArrayBuffer | null = await readAsBase64(file);
        setProfileImage(`${dataImage}`);
        setUserInfo({ ...userInfo, profileImage: `${dataImage}` });
      }
      setShowImageSelect(false);
    }
  };

  const onRegisterUser = async (): Promise<void> => {
    try {
      const isValid: boolean = await schemaValidation();
      if (isValid) {
        const result: IResponse = await signupMutation(userInfo);
        setAlertMessage('');
        dispatch(addAuthUser({ authInfo: result.user }));
        dispatch(updateLogout(false));
        dispatch(updateHeader('home'));
        dispatch(updateCategoryContainer(true));
        saveToSessionStorage(JSON.stringify(true), JSON.stringify(result.user?.username));
      }
    } catch (error) {
      setAlertMessage(error?.data.message);
    }
  };

  return (
    <ModalBg>
      <div className="relative top-[10%] mx-auto w-11/12 max-w-md rounded bg-white md:w-2/3">
        <div className="relative px-5 py-5">
          <div className="flex justify-between text-2xl font-bold text-gray-600">
            {step > 1 && (
              <Button
                className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
                role="button"
                onClick={() => setStep(step - 1)}
                label={<FaChevronLeft className="icon icon-tabler icon-tabler-x" />}
              />
            )}
            <h1 className="flex w-full justify-center">Join Barca</h1>
            <Button
              className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
              role="button"
              onClick={onClose}
              label={<FaTimes className="icon icon-tabler icon-tabler-x" />}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-center px-5 py-5">
          <ol className="flex w-full">
            <li className="flex w-full items-center text-white after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-orange-500 after:content-[''] dark:after:border-orange-500">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 font-bold lg:h-12 lg:w-12 dark:bg-orange-500">
                1
              </span>
            </li>
            <li className="flex items-center">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white lg:h-12 lg:w-12 ${
                  step === 2 ? 'bg-orange-500 dark:bg-orange-500' : 'bg-orange-300/50 dark:bg-orange-300/50'
                }`}
              >
                2
              </span>
            </li>
          </ol>
        </div>
        <div className="px-5">{alertMessage && <Alert type="error" message={alertMessage} />}</div>

        {step === 1 && (
          <div className="relative px-5 py-5">
            <div>
              <label htmlFor="username" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                value={userInfo.username}
                className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-orange-500/50 focus:outline-none"
                placeholder="Enter username"
                onChange={(event: ChangeEvent) => {
                  setUserInfo({ ...userInfo, username: (event.target as HTMLInputElement).value });
                }}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userInfo.email}
                className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-orange-500/50 focus:outline-none"
                placeholder="Enter email"
                onChange={(event: ChangeEvent) => {
                  setUserInfo({ ...userInfo, email: (event.target as HTMLInputElement).value });
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Password
              </label>
              <div className="relative mb-5 mt-2">
                <div className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600">
                  {passwordType === 'password' ? (
                    <FaEyeSlash onClick={() => setPasswordType('text')} className="icon icon-tabler icon-tabler-info-circle" />
                  ) : (
                    <FaEye onClick={() => setPasswordType('password')} className="icon icon-tabler icon-tabler-info-circle" />
                  )}
                </div>
                <Input
                  id="password"
                  name="password"
                  type={passwordType}
                  value={userInfo.password}
                  className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-orange-500/50 focus:outline-none"
                  placeholder="Enter password"
                  onChange={(event: ChangeEvent) => {
                    setUserInfo({ ...userInfo, password: (event.target as HTMLInputElement).value });
                  }}
                />
              </div>
            </div>
            <Button
              disabled={!userInfo.username || !userInfo.email || !userInfo.password}
              className={`text-md block w-full cursor-pointer rounded bg-orange-500 px-8 py-2 text-center font-bold text-white hover:bg-orange-400 focus:outline-none ${
                !userInfo.username || !userInfo.email || !userInfo.password ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              label="Continue"
              onClick={() => setStep(2)}
            />
          </div>
        )}

        {step === 2 && (
          <div className="relative px-5 py-5">
            <div className="h-24">
              <label htmlFor="country" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Country
              </label>
              <div id="country" className="relative mb-5 mt-2">
                <Dropdown
                  text={country}
                  maxHeight="200"
                  mainClassNames="absolute bg-white z-50"
                  showSearchInput={true}
                  values={countriesList()}
                  setValue={setCountry}
                  onClick={(item: string) => {
                    setCountry(item);
                    setUserInfo({ ...userInfo, country: item });
                  }}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="profileImage" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Profile Picture
              </label>
              <div
                onMouseEnter={() => setShowImageSelect(true)}
                onMouseLeave={() => setShowImageSelect(false)}
                className="relative mb-5 mt-2 w-[20%] cursor-pointer"
              >
                {profileImage && (
                  <img
                    id="profileImage"
                    src={profileImage}
                    alt="Profile Picture"
                    className="left-0 top-0 h-20 w-20 rounded-full bg-white object-cover"
                  />
                )}
                {!profileImage && (
                  <div className="left-0 top-0 flex h-20 w-20 cursor-pointer justify-center rounded-full bg-[#dee1e7]"></div>
                )}
                {showImageSelect && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute left-0 top-0 flex h-20 w-20 cursor-pointer justify-center rounded-full bg-[#dee1e7]"
                  >
                    <FaCamera className="flex self-center" />
                  </div>
                )}
                <Input
                  name="image"
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <Button
              disabled={!userInfo.country || !userInfo.profileImage}
              className={`text-md block w-full cursor-pointer rounded bg-orange-500 px-8 py-2 text-center font-bold text-white hover:bg-orange-400 focus:outline-none ${
                !userInfo.country || !userInfo.profileImage ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              label={`${isSignupLoading ? 'SIGNUP IN PROGRESS...' : 'SIGNUP'}`}
              onClick={onRegisterUser}
            />
          </div>
        )}

        <hr />
        <div className="px-5 py-4">
          <div className="ml-2 flex w-full justify-center text-sm font-medium">
            <div className="flex justify-center">
              Already a memeber?{' '}
              <p
                onClick={() => {
                  if (onToggle) {
                    onToggle(true);
                  }
                }}
                className="ml-2 flex cursor-pointer text-red-600 hover:underline"
              >
                Sign In
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalBg>
  );
};

export default RegisterModal;
