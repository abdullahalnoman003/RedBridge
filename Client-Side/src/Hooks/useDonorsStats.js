import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useDonorsStats = () => {
  const [stats, setStats] = useState({
    totalDonors: 0,
    approvedDonors: 0,
    pendingDonors: 0,
    rejectedDonors: 0,
    availableDonors: 0,
    unavailableDonors: 0,
  });
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxios();

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Fetch pending donors to get count
      const pendingRes = await axiosSecure.get('/donors/pending?page=1&limit=1000');
      const pendingCount = pendingRes.data?.meta?.total || 0;
      const pendingDonors = pendingRes.data?.data || [];

      // Count available/unavailable from pending
      const available = pendingDonors.filter((d) => d.availability === true).length;
      const unavailable = pendingDonors.filter((d) => d.availability === false).length;

      setStats({
        totalDonors: pendingCount,
        approvedDonors: 0, // Could be calculated from another endpoint if available
        pendingDonors: pendingCount,
        rejectedDonors: 0,
        availableDonors: available,
        unavailableDonors: unavailable,
      });
    } catch (err) {
      console.error('Failed to fetch donor stats:', err);
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

export default useDonorsStats;
