import { IResponse } from '@/shared/interfaces/shared.interface';
import { api } from '@/store/api';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    forgotPassword: build.mutation<IResponse, string>({
      query(email: string) {
        return {
          url: 'auth/forgot-password',
          method: 'PUT',
          body: { email }
        };
      },
      invalidatesTags: ['Auth']
    }),
    resetPassword: build.mutation<IResponse, { password: string; confirmPassword: string; token: string }>({
      query(data) {
        return {
          url: `auth/reset-password/${data.token}`,
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: ['Auth']
    })
  })
});

export const { useForgotPasswordMutation, useResetPasswordMutation } = authApi;
