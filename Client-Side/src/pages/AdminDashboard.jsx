import { useState, useEffect } from 'react';
import { getAllUsers, updateUserRole } from '../services/user.service';
import { approveDonor, rejectDonor, deleteDonor } from '../services/donor.service';
import { getAllRequests, deleteRequest } from '../services/request.service';
import axiosInstance from '../services/axiosInstance';
import Loader from '../components/Loader';
import { ROLES } from '../types/user.types';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [usersRes, donorsRes, requestsRes] = await Promise.all([
        getAllUsers(),
        axiosInstance.get('/api/donors?status=all'),
        getAllRequests(),
      ]);
      setUsers(usersRes.data?.data || []);
      setDonors(donorsRes.data?.data || []);
      setRequests(requestsRes.data?.data || []);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRole(userId, role);
      toast.success('Role updated');
      fetchAll();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update role');
    }
  };

  const handleApprove = async (donorId) => {
    try {
      await approveDonor(donorId);
      toast.success('Donor approved');
      fetchAll();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to approve');
    }
  };

  const handleReject = async (donorId) => {
    try {
      await rejectDonor(donorId);
      toast.success('Donor rejected');
      fetchAll();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to reject');
    }
  };

  const handleDeleteDonor = async (donorId) => {
    try {
      await deleteDonor(donorId);
      toast.success('Donor deleted');
      fetchAll();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete');
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      await deleteRequest(requestId);
      toast.success('Request deleted');
      fetchAll();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete');
    }
  };

  if (loading) return <Loader />;

  const tabs = [
    { key: 'users', label: 'Users', count: users.length },
    { key: 'donors', label: 'Donors', count: donors.length },
    { key: 'requests', label: 'Requests', count: requests.length },
  ];

  return (
    <div>
      <div className="bg-dark py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">
            {users.length} Users · {donors.length} Donors · {requests.length} Requests
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-10">
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 sm:flex-none px-6 py-4 text-sm font-semibold transition-colors cursor-pointer ${
                  tab === t.key
                    ? 'text-red-700 border-b-2 border-red-700 bg-red-50/50'
                    : 'text-gray-500 hover:text-dark'
                }`}
              >
                {t.label}
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  tab === t.key ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {tab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-dark">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-dark bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          {ROLES.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-gray-400">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {tab === 'donors' && (
          <div className="space-y-4">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-dark text-white font-extrabold px-3 py-1 rounded-lg text-sm">
                      {donor.bloodType}
                    </span>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        donor.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : donor.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {donor.status}
                    </span>
                  </div>
                  <p className="text-dark font-semibold">{donor.userId?.name || 'Unknown'}</p>
                  <p className="text-sm text-gray-500">
                    {donor.phone} · {donor.location?.district}, {donor.location?.division}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {donor.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(donor._id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(donor._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDeleteDonor(donor._id)}
                    className="border-2 border-red-200 text-red-700 hover:bg-red-50 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {donors.length === 0 && (
              <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-10 text-center">
                <p className="text-gray-400">No donors found</p>
              </div>
            )}
          </div>
        )}

        {tab === 'requests' && (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-dark text-white font-extrabold px-3 py-1 rounded-lg text-sm">
                      {req.bloodType}
                    </span>
                  </div>
                  <p className="text-dark font-semibold">{req.requesterId?.name || 'Unknown'}</p>
                  <p className="text-sm text-gray-500">{req.location}</p>
                  <p className="text-sm text-gray-400 mt-1">{req.message}</p>
                </div>
                <button
                  onClick={() => handleDeleteRequest(req._id)}
                  className="border-2 border-red-200 text-red-700 hover:bg-red-50 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer self-start"
                >
                  Delete
                </button>
              </div>
            ))}
            {requests.length === 0 && (
              <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-10 text-center">
                <p className="text-gray-400">No requests found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
