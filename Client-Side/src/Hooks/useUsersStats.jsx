import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const STATS_PAGE_LIMIT = 100;

const useUsersStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    adminUsers: 0,
    donorUsers: 0,
    regularUsers: 0,
  });
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxios();

  const fetchAllUsers = async () => {
    const first = await axiosSecure.get(`/users?page=1&limit=${STATS_PAGE_LIMIT}`);
    const firstItems = first.data?.data || [];
    const meta = first.data?.meta || {};
    const totalPages = meta.totalPages || 1;

    if (totalPages <= 1) {
      return { items: firstItems, total: meta.total || firstItems.length };
    }

    const restResponses = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) =>
        axiosSecure.get(`/users?page=${index + 2}&limit=${STATS_PAGE_LIMIT}`)
      )
    );

    const restItems = restResponses.flatMap((res) => res.data?.data || []);
    return {
      items: [...firstItems, ...restItems],
      total: meta.total || firstItems.length + restItems.length,
    };
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { items: users, total } = await fetchAllUsers();

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
