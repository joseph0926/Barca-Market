import { IResponse } from '@/shared/interfaces/shared.interface';
import { axiosInstance } from '@/shared/utils/axios-instance';
import { useMutation } from '@tanstack/react-query';
import { ISignInPayload, ISignUpPayload } from '@/features/auth/interfaces/auth.interface';

export const useAuthMutation = () => {
  const { mutateAsync: signupMutation, isPending: isSignupLoading } = useMutation({
    mutationFn: async (body: ISignUpPayload): Promise<IResponse> => {
      const { data } = await axiosInstance.post('/auth/signup', body);
      return data;
    }
  });

  const { mutateAsync: signinMutation, isPending: isSigninLoading } = useMutation({
    mutationFn: async (body: ISignInPayload): Promise<IResponse> => {
      const { data } = await axiosInstance.post('/auth/signin', body);
      return data;
    }
  });

  const { mutate: logoutMutation } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post('/auth/signout');
      return data;
    }
  });

  const { mutate: removeLoggedInUserMutation } = useMutation({
    mutationFn: async (username: string) => {
      const { data } = await axiosInstance.delete(`auth/logged-in-user/${username}`);
      return data;
    }
  });

  const { mutateAsync: resendEmailMutation } = useMutation({
    mutationFn: async (body: { userId: string; email: string }): Promise<IResponse> => {
      const { data } = await axiosInstance.post('/auth/resend-email', body);
      return data;
    }
  });

  const { mutateAsync: verifyEmailMutation } = useMutation({
    mutationFn: async (token: string): Promise<IResponse> => {
      const { data } = await axiosInstance.put('/auth/verify-email', { token });
      return data;
    }
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
