import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const STATS_PAGE_LIMIT = 100;

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

  const fetchAllPendingDonors = async () => {
    const first = await axiosSecure.get(`/donors/pending?page=1&limit=${STATS_PAGE_LIMIT}`);
    const firstItems = first.data?.data || [];
    const meta = first.data?.meta || {};
    const totalPages = meta.totalPages || 1;

    if (totalPages <= 1) {
      return { items: firstItems, total: meta.total || firstItems.length };
    }

    const restResponses = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) =>
        axiosSecure.get(`/donors/pending?page=${index + 2}&limit=${STATS_PAGE_LIMIT}`)
      )
    );

    const restItems = restResponses.flatMap((res) => res.data?.data || []);
    return {
      items: [...firstItems, ...restItems],
      total: meta.total || firstItems.length + restItems.length,
    };
  };

  const fetchAllApprovedVisibleDonors = async () => {
    const first = await axiosSecure.get(`/donors?page=1&limit=${STATS_PAGE_LIMIT}`);
    const firstItems = first.data?.data || [];
    const meta = first.data?.meta || {};
    const totalPages = meta.totalPages || 1;

    if (totalPages <= 1) {
      return { items: firstItems, total: meta.total || firstItems.length };
    }

    const restResponses = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) =>
        axiosSecure.get(`/donors?page=${index + 2}&limit=${STATS_PAGE_LIMIT}`)
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
      const [{ items: pendingDonors, total: pendingCount }, { items: approvedDonors, total: approvedCount }] =
        await Promise.all([fetchAllPendingDonors(), fetchAllApprovedVisibleDonors()]);

      const pendingAvailable = pendingDonors.filter((d) => d.availability === true).length;
      const pendingUnavailable = pendingDonors.filter((d) => d.availability === false).length;
      const approvedAvailable = approvedDonors.filter((d) => d.availability === true).length;

      setStats({
        totalDonors: pendingCount + approvedCount,
        approvedDonors: approvedCount,
        pendingDonors: pendingCount,
        rejectedDonors: 0,
        availableDonors: pendingAvailable + approvedAvailable,
        unavailableDonors: pendingUnavailable,
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
