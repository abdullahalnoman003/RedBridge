import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from '../../Hooks/useAxios';

const AdminUsers = () => {
  const axiosInstance = useAxios();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/users');
      setUsers(res.data?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [axiosInstance]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const updateRole = async (id, role) => {
    try {
      await axiosInstance.patch(`/users/${id}/role`, { role });
      toast.success('Role updated');
      loadUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Role update failed');
    }
  };

  if (loading) {
    return <div className="py-8">Loading users...</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl border">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-neutral'}`}>
                  {user.role}
                </span>
              </td>
              <td>
                <button
                  disabled={user.role === 'admin'}
                  className="btn btn-xs btn-outline"
                  onClick={() => updateRole(user._id, user.role === 'admin' ? 'donor' : 'admin')}
                >
                  Make {user.role === 'admin' ? 'Donor' : 'Admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
