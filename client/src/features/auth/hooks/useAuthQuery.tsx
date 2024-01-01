import { IResponse } from '@/shared/interfaces/shared.interface';
import { axiosInstance } from '@/shared/utils/axios-instance';
import { useQuery } from '@tanstack/react-query';

export const useAuthQuery = (query?: string, from?: string, size?: string, type?: string, gigId?: string) => {
  const { data: currentUserData, isError: currentUserError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async (): Promise<IResponse | null> => {
      const { data } = await axiosInstance.get('/auth/currentuser');
      return data;
    }
  });

  const {
    data: gigsByCategoryData,
    isPending: isGigsByCategoryLoading,
    isSuccess: isGigsByCategorySuccess,
    isError: isGigsByCategoryError
  } = useQuery({
    queryKey: ['gigUser'],
    queryFn: async (): Promise<IResponse> => {
      const { data } = await axiosInstance.get(`/auth/search/gig/${from}/${size}/${type}?${query}`);
      return data;
    }
  });

  const {
    data: gigByIdData,
    isPending: isGigByIdLoading,
    isSuccess: isGigByIdSuccess
  } = useQuery({
    queryKey: ['gigUser'],
    queryFn: async (): Promise<IResponse> => {
      const { data } = await axiosInstance.get(`/auth/search/gig/${gigId}`);
      return data;
    }
  });

  return {
    currentUserData,
    currentUserError,
    gigsByCategoryData,
    isGigsByCategoryError,
    isGigsByCategoryLoading,
    isGigsByCategorySuccess,
    gigByIdData,
    isGigByIdLoading,
    isGigByIdSuccess
  };
};
