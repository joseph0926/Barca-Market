import { IResponse } from '@/shared/interfaces/shared.interface';
import { axiosInstance } from '@/shared/utils/axios-instance';
import { useQuery } from '@tanstack/react-query';

export const useBuyerQuery = (username?: string) => {
  const { data: currentBuyer, isPending: currentBuyerLoading } = useQuery({
    queryKey: ['buyer'],
    queryFn: async (): Promise<IResponse> => {
      const { data } = await axiosInstance.get('/buyer/username');
      return data;
    },
    retry: 1
  });

  const { data: buyerByUsername, isSuccess: buyerByUsernameSuccess } = useQuery({
    queryKey: ['buyer', username],
    queryFn: async (): Promise<IResponse> => {
      const { data } = await axiosInstance.get(`/buyer/${username}`);
      return data;
    },
    enabled: username !== undefined
  });

  const { data: buyerByEmail, isSuccess: buyerByEmailSuccess } = useQuery({
    queryKey: ['buyer'],
    queryFn: async (): Promise<IResponse> => {
      const { data } = await axiosInstance.get(`/buyer/email`);
      return data;
    }
  });

  return {
    currentBuyer,
    currentBuyerLoading,
    buyerByUsername,
    buyerByUsernameSuccess,
    buyerByEmail,
    buyerByEmailSuccess
  };
};
