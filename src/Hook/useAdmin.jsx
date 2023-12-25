import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useAdmin = () => {
  const { user, isAuthenticated } = useAuth(); // Assume isAuthenticated is a boolean indicating whether the user is authenticated
  const [axiosSecure] = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ['isAdmin', user?.email],
    queryFn: async () => {
      if (isAuthenticated && user) {
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        console.log('is admin response', res);
        return res.data.admin;
      } else {
        // Handle the case where user is not authenticated
        return false;
      }
    },
    enabled: isAuthenticated && user, // Only enable the query when the user is authenticated
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;