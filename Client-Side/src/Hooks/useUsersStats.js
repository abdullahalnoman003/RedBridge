import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useUsersStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    adminUsers: 0,
    donorUsers: 0,
    regularUsers: 0,
  });
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxios();

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await axiosSecure.get('/users?page=1&limit=1000');
      const users = response.data?.data || [];
      const total = response.data?.meta?.total || 0;

      const adminCount = users.filter((u) => u.role === 'admin').length;
      const donorCount = users.filter((u) => u.role === 'donor').length;
      const regularCount = users.filter((u) => u.role === 'user').length;

      setStats({
        totalUsers: total,
        adminUsers: adminCount,
        donorUsers: donorCount,
        regularUsers: regularCount,
      });
    } catch (err) {
      console.error('Failed to fetch user stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { stats, loading, refetch: fetchStats };
};

export default useUsersStats;
