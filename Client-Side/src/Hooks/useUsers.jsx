import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useUsers = (page = 1, limit = 10) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({ page: 1, limit, total: 0, totalPages: 0 });
  const axiosSecure = useAxios();

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosSecure.get(`/users?page=${page}&limit=${limit}`);
      if (response.data?.success) {
        setUsers(response.data.data || []);
        setMeta(response.data.meta || { page, limit, total: 0, totalPages: 0 });
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return { users, loading, error, meta, refetch: fetchUsers };
};

export default useUsers;
