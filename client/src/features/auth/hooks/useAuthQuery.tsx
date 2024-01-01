import { IResponse } from '@/shared/interfaces/shared.interface';
import { axiosInstance } from '@/shared/utils/axios-instance';
import { useQuery } from '@tanstack/react-query';

export const useAuthQuery = (query?: string, from?: string, size?: string, type?: string, gigId?: string) => {
  const { data: currentUserData, isError: currentUserError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async (): Promise<IResponse | null> => await axiosInstance.get('/auth/currentuser')
  });

  const {
    data: gigsByCategoryData,
    isPending: isGigsByCategoryLoading,
    isSuccess: isGigsByCategorySuccess,
    isError: isGigsByCategoryError
  } = useQuery({
    queryKey: ['gigUser'],
    queryFn: async (): Promise<IResponse> => await axiosInstance.get(`/auth/search/gig/${from}/${size}/${type}?${query}`)
  });

  const {
    data: gigByIdData,
    isPending: isGigByIdLoading,
    isSuccess: isGigByIdSuccess
  } = useQuery({
    queryKey: ['gigUser'],
    queryFn: async (): Promise<IResponse> => axiosInstance.get(`/auth/search/gig/${gigId}`)
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
