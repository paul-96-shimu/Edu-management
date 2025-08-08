import { useQuery } from '@tanstack/react-query';
import UseAxios from './UseAxios';
import CustomHooks from './CustomHooks';


const useRole = () => {
  const { user, loading: userLoading } = CustomHooks();
  const axiosSecure = UseAxios();

  const {
    data: role,
    isLoading: roleLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ['user', 'role', user?.email],
    enabled: !!user?.email && !userLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return {
    role: role || 'student',
    roleLoading,
    isError,
    error,
    refetch,
  };
};

export default useRole;
