import { IResponse } from '@/shared/interfaces/shared.interface';
import { axiosInstance } from '@/shared/utils/axios-instance';
import { useMutation } from '@tanstack/react-query';
import { ISignInPayload, ISignUpPayload } from '@/features/auth/interfaces/auth.interface';

export const useAuthMutation = () => {
  const { mutateAsync: signupMutation, isPending: isSignupLoading } = useMutation({
    mutationFn: async (body: ISignUpPayload): Promise<IResponse> => await axiosInstance.post('/auth/signup', body)
  });

  const { mutateAsync: signinMutation, isPending: isSigninLoading } = useMutation({
    mutationFn: async (body: ISignInPayload): Promise<IResponse> => await axiosInstance.post('/auth/signin', body)
  });

  const { mutate: logoutMutation } = useMutation({
    mutationFn: async () => await axiosInstance.post('/auth/signout')
  });

  const { mutate: removeLoggedInUserMutation } = useMutation({
    mutationFn: async (username: string) => await axiosInstance.delete(`auth/logged-in-user/${username}`)
  });

  const { mutateAsync: resendEmailMutation } = useMutation({
    mutationFn: async (data: { userId: string; email: string }): Promise<IResponse> => await axiosInstance.post('/auth/resend-email', data)
  });

  const { mutateAsync: verifyEmailMutation } = useMutation({
    mutationFn: async (token: string): Promise<IResponse> => await axiosInstance.put('/auth/verify-email', { token })
  });

  return {
    signinMutation,
    signupMutation,
    logoutMutation,
    removeLoggedInUserMutation,
    resendEmailMutation,
    verifyEmailMutation,
    isSignupLoading,
    isSigninLoading
  };
};
