import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from '../../Hooks/useAxios';

const AdminDonorActions = () => {
  const axiosInstance = useAxios();
  const [donors, setDonors] = useState([]);
  const [donorId, setDonorId] = useState('');

  const loadDonors = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/donors');
      setDonors(res.data?.data || []);
    } catch {
      toast.error('Failed to load donors');
    }
  }, [axiosInstance]);

  useEffect(() => {
    // Initial data load for admin table.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDonors();
  }, [loadDonors]);

  const runAction = async (action, idFromList) => {
    const id = idFromList || donorId.trim();
    if (!id) {
      toast.error('Donor ID is required');
      return;
    }

    try {
      if (action === 'approve') {
        await axiosInstance.patch(`/donors/${id}/approve`);
      }
      if (action === 'reject') {
        await axiosInstance.patch(`/donors/${id}/reject`);
      }
      if (action === 'delete') {
        await axiosInstance.delete(`/donors/${id}`);
      }
      toast.success(`Donor ${action} successful`);
      setDonorId('');
      loadDonors();
    } catch (error) {
      toast.error(error?.response?.data?.message || `Failed to ${action} donor`);
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-white border rounded-xl p-4">
        <h3 className="font-semibold mb-2">Donor Moderation by Donor ID</h3>
        <p className="text-sm text-gray-500 mb-3">Use this when you have a donor id from DB/logs.</p>
        <div className="flex flex-wrap gap-2">
          <input
            className="input input-bordered flex-1 min-w-[220px]"
            value={donorId}
            onChange={(e) => setDonorId(e.target.value)}
            placeholder="Enter donor ObjectId"
          />
          <button className="btn btn-success btn-sm" onClick={() => runAction('approve')}>Approve</button>
          <button className="btn btn-warning btn-sm" onClick={() => runAction('reject')}>Reject</button>
          <button className="btn btn-error btn-sm text-white" onClick={() => runAction('delete')}>Delete</button>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4">
        <h3 className="font-semibold mb-3">Approved Donor List (from public endpoint)</h3>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Blood</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor._id}>
                  <td className="max-w-[180px] truncate" title={donor._id}>{donor._id}</td>
                  <td>{donor?.userId?.name || 'N/A'}</td>
                  <td>{donor.bloodType}</td>
                  <td>{donor.status}</td>
                  <td className="flex gap-1">
                    <button className="btn btn-xs btn-success" onClick={() => runAction('approve', donor._id)}>Approve</button>
                    <button className="btn btn-xs btn-warning" onClick={() => runAction('reject', donor._id)}>Reject</button>
                    <button className="btn btn-xs btn-error text-white" onClick={() => runAction('delete', donor._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDonorActions;
