import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';
import usePendingDonors from '../../Hooks/usePendingDonors';
import getApiErrorMessage from '../../Utils/getApiErrorMessage';

const PendingDonorsManagement = ({ onActionComplete }) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const { donors, loading, error, meta, refetch } = usePendingDonors(page, 10);
  const axiosSecure = useAxios();

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filteredDonors = donors.filter((donor) => {
    const matchesSearch =
      donor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodGroup = !bloodGroupFilter || donor.bloodGroup === bloodGroupFilter;
    return matchesSearch && matchesBloodGroup;
  });

  const handleApprove = async (donor) => {
    const result = await Swal.fire({
      title: 'Approve Donor?',
      text: `Approve ${donor.name} as a donor?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, approve',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    setActionLoading(donor._id);
    try {
      const response = await axiosSecure.patch(`/donors/${donor._id}/approve`);
      if (response.data?.success) {
        toast.success('Donor approved successfully!');
        refetch();
        onActionComplete?.();
      }
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Failed to approve donor'));
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (donor) => {
    const result = await Swal.fire({
      title: 'Reject Donor?',
      text: `Reject ${donor.name} as a donor?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, reject',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    setActionLoading(donor._id);
    try {
      const response = await axiosSecure.patch(`/donors/${donor._id}/reject`);
      if (response.data?.success) {
        toast.success('Donor rejected successfully!');
        refetch();
        onActionComplete?.();
      }
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Failed to reject donor'));
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (donor) => {
    const result = await Swal.fire({
      title: 'Delete Donor?',
      text: `Delete ${donor.name} permanently?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    setActionLoading(donor._id);
    try {
      const response = await axiosSecure.delete(`/donors/${donor._id}`);
      if (response.data?.success) {
        toast.success('Donor deleted successfully!');
        refetch();
        onActionComplete?.();
      }
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Failed to delete donor'));
    } finally {
      setActionLoading(null);
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
    <div className="bg-base-100 rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6">Pending Donors Management</h2>

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
          value={bloodGroupFilter}
          onChange={(e) => {
            setBloodGroupFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Blood Groups</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : filteredDonors.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No pending donors found</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mb-6">
            <table className="table table-compact w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Blood Group</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonors.map((donor) => (
                  <tr key={donor._id} className="hover:bg-base-200">
                    <td className="font-semibold">{donor.name}</td>
                    <td>{donor.email}</td>
                    <td>
                      <span className="badge badge-lg badge-error">{donor.bloodGroup}</span>
                    </td>
                    <td>{donor.phone}</td>
                    <td className="text-sm">{donor.location}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleApprove(donor)}
                          disabled={actionLoading === donor._id}
                        >
                          {actionLoading === donor._id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            '✓ Approve'
                          )}
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleReject(donor)}
                          disabled={actionLoading === donor._id}
                        >
                          {actionLoading === donor._id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            '✗ Reject'
                          )}
                        </button>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => handleDelete(donor)}
                          disabled={actionLoading === donor._id}
                        >
                          {actionLoading === donor._id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            '🗑 Delete'
                          )}
                        </button>
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

export default PendingDonorsManagement;
