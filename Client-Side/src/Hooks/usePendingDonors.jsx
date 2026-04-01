import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const usePendingDonors = (page = 1, limit = 10) => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({ page: 1, limit, total: 0, totalPages: 0 });
  const axiosSecure = useAxios();

  const fetchDonors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosSecure.get(`/donors/pending?page=${page}&limit=${limit}`);
      if (response.data?.success) {
        setDonors(response.data.data || []);
        setMeta(response.data.meta || { page, limit, total: 0, totalPages: 0 });
      } else {
        setError('Failed to fetch donors');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch donors');
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return { donors, loading, error, meta, refetch: fetchDonors };
};

export default usePendingDonors;
