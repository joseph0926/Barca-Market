import { IResponse } from '@/shared/interfaces/shared.interface';
import { axiosInstance } from '@/shared/utils/axios-instance';
import { useMutation } from '@tanstack/react-query';
import { ISellerDocument } from '../interfaces/seller.interface';

export const useSellerMutation = () => {
  const { mutateAsync: createSellerMutation, isPending: isCreateSellerLoading } = useMutation({
    mutationFn: async (body: ISellerDocument): Promise<IResponse> => {
      const { data } = await axiosInstance.post('/seller/create', body);
      return data;
    }
  });

  const { mutateAsync: updateSellerMutation, isPending: isUpdateSellerMutation } = useMutation({
    mutationFn: async ({ seller, sellerId }: { sellerId: string; seller: ISellerDocument }): Promise<IResponse> => {
      const { data } = await axiosInstance.put(`/seller/${sellerId}`, seller);
      return data;
    }
  });

  return {
    createSellerMutation,
    isCreateSellerLoading,
    updateSellerMutation,
    isUpdateSellerMutation
  };
};
