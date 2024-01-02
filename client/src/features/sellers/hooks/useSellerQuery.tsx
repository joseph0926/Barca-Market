import { axiosInstance } from '@/shared/utils/axios-instance';
import { useQuery } from '@tanstack/react-query';

export const useSellerQuery = (username?: string, sellerId?: string, size?: string) => {
  const { data: sellerByUsername } = useQuery({
    queryKey: ['sellr', username],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/seller/username/${username}`);
      return data;
    },
    enabled: username !== undefined
  });

  const {
    data: sellerById,
    isPending: isSellerByIdLoading,
    isSuccess: isSellerByIdSuccess
  } = useQuery({
    queryKey: ['sellr', sellerId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/seller/id/${sellerId}`);
      return data;
    },
    enabled: sellerId !== undefined
  });

  const { data: randomSeller, isSuccess: isRandomSellerSuccess } = useQuery({
    queryKey: ['sellr', size],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/seller/random/${size}`);
      return data;
    },
    enabled: size !== undefined
  });

  return {
    sellerById,
    isSellerByIdLoading,
    isSellerByIdSuccess,
    sellerByUsername,
    randomSeller,
    isRandomSellerSuccess
  };
};
