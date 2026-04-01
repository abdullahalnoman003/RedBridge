import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';
import useUsers from '../../Hooks/useUsers';
import getApiErrorMessage from '../../Utils/getApiErrorMessage';

const UserManagement = ({ onActionComplete }) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const { users, loading, error, meta, refetch } = useUsers(page, 10);
  const axiosSecure = useAxios();

  const roles = ['admin', 'donor', 'user'];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = async (user, newRole) => {
    if (newRole === user.role) {
      toast.info('User already has this role');
      return;
    }

    const result = await Swal.fire({
      title: 'Change User Role?',
      text: `Change ${user.name}'s role from "${user.role}" to "${newRole}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, change role',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    setActionLoading(user._id);
    try {
      const response = await axiosSecure.patch(`/users/${user._id}/role`, { role: newRole });
      if (response.data?.success) {
        toast.success(`Role updated to "${newRole}"!`);
        refetch();
        onActionComplete?.();
      }
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Failed to update user role'));
    } finally {
      setActionLoading(null);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'badge-info';
      case 'donor':
        return 'badge-success';
      default:
        return 'badge-secondary';
    }
  };

  if (error) {
    return (
      <div className="alert alert-error mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m8-8a8 8 0 110 16 8 8 0 010-16z"
          />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="select select-bordered"
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No users found</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mb-6">
            <table className="table table-compact w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Current Role</th>
                  <th>Change Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-base-200">
                    <td className="font-semibold">{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge badge-lg ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        {roles.map((role) => (
                          <button
                            key={role}
                            className={`btn btn-xs ${
                              user.role === role
                                ? 'btn-disabled'
                                : 'btn-outline'
                            }`}
                            onClick={() => handleRoleChange(user, role)}
                            disabled={actionLoading === user._id || user.role === role}
                          >
                            {actionLoading === user._id ? (
                              <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                              role.charAt(0).toUpperCase() + role.slice(1)
                            )}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {meta.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <button
                className="btn btn-sm"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="px-4 py-2 flex items-center">
                Page {page} of {meta.totalPages}
              </span>
              <button
                className="btn btn-sm"
                onClick={() => setPage(Math.min(meta.totalPages, page + 1))}
                disabled={page === meta.totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserManagement;
