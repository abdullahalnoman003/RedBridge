import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FiCheckCircle, FiMapPin, FiPhone, FiSearch, FiTrash2, FiXCircle } from 'react-icons/fi';
import { LuDroplets, LuListFilter } from 'react-icons/lu';
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

  const getDonorName = (donor) => donor?.userId?.name || donor?.name || 'Unknown';
  const getDonorEmail = (donor) => donor?.userId?.email || donor?.email || 'N/A';
  const getDonorBloodType = (donor) => donor?.bloodType || donor?.bloodGroup || 'N/A';
  const getDonorLocation = (donor) => {
    if (typeof donor?.location === 'string') {
      return donor.location;
    }

    const division = donor?.location?.division;
    const district = donor?.location?.district;
    const upazila = donor?.location?.upazila;
    const area = donor?.location?.area;
    return [upazila, district, division, area].filter(Boolean).join(', ') || 'N/A';
  };

  const filteredDonors = donors.filter((donor) => {
    const donorName = getDonorName(donor).toLowerCase();
    const donorEmail = getDonorEmail(donor).toLowerCase();
    const donorBloodType = getDonorBloodType(donor);

    const matchesSearch =
      donorName.includes(searchTerm.toLowerCase()) ||
      donorEmail.includes(searchTerm.toLowerCase());
    const matchesBloodGroup = !bloodGroupFilter || donorBloodType === bloodGroupFilter;
    return matchesSearch && matchesBloodGroup;
  });

  const handleApprove = async (donor) => {
    const result = await Swal.fire({
      title: 'Approve Donor?',
      text: `Approve ${getDonorName(donor)} as a donor?`,
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
      text: `Reject ${getDonorName(donor)} as a donor?`,
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
      text: `Delete ${getDonorName(donor)} permanently?`,
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
      // First reject to update user state from donor to user
      await axiosSecure.patch(`/donors/${donor._id}/reject`);
      
      // After deleting the donor
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
    <div className="mb-6 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-error/20 bg-linear-to-r from-error/10 via-base-100 to-base-100 px-4 py-3">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Pending Donors Management</h2>
          <p className="text-sm text-base-content/65">Review blood donor requests and keep the donor pool trusted.</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-error/15 text-error text-xl">
          <LuDroplets />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="input input-bordered flex items-center gap-2 focus-within:input-error">
          <FiSearch className="text-base-content/60" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="grow"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </label>
        <label className="select select-bordered flex items-center gap-2 focus-within:select-error">
          <LuListFilter className="text-base-content/60" />
          <select
            className="grow "
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
        </label>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : filteredDonors.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-base-content/55 text-lg">No pending donors found</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mb-6 rounded-xl border border-base-300">
            <table className="table table-compact w-full">
              <thead>
                <tr className="bg-base-200/80 text-base-content/80">
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
                  <tr key={donor._id} className="hover:bg-base-200/70 transition-colors">
                    <td className="font-semibold">{getDonorName(donor)}</td>
                    <td className="text-base-content/75">{getDonorEmail(donor)}</td>
                    <td>
                      <span className="badge badge-lg badge-error gap-1">
                        <LuDroplets />
                        {getDonorBloodType(donor)}
                      </span>
                    </td>
                    <td>
                      <span className="inline-flex font-bold items-center gap-1 text-sm text-base-content/80">
                        <FiPhone />
                        {donor.phone}
                      </span>
                    </td>
                    <td className="text-sm">
                      <span className="inline-flex items-start gap-1 text-base-content/75">
                        <FiMapPin className="mt-0.5 shrink-0" />
                        {getDonorLocation(donor)}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleApprove(donor)}
                          disabled={actionLoading === donor._id}
                        >
                          {actionLoading === donor._id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <FiCheckCircle />
                              Approve
                            </span>
                          )}
                        </button>
                        <button
                          className="btn btn-sm btn-warning p-[1.15rem]"
                          onClick={() => handleReject(donor)}
                          disabled={actionLoading === donor._id}
                        >
                          {actionLoading === donor._id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <FiXCircle />
                              Reject
                            </span>
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
                            <span className="flex items-center gap-1 p-1">
                              <FiTrash2 />
                              Delete
                            </span>
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
