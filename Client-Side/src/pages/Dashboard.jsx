import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import axiosInstance from '../services/axiosInstance';
import { updateDonor } from '../services/donor.service';
import Loader from '../components/Loader';
import { BLOOD_TYPES } from '../types/donor.types';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { dbUser, firebaseUser } = useAuth();
  const role = useRole();
  const [donorProfile, setDonorProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    bloodType: '',
    phone: '',
    availability: true,
    division: '',
    district: '',
    upazila: '',
    area: '',
  });

  useEffect(() => {
    fetchDonorProfile();
  }, [dbUser]);

  const fetchDonorProfile = async () => {
    if (!dbUser) {
      setLoading(false);
      return;
    }
    try {
      const res = await axiosInstance.get('/api/donors?status=all');
      const donors = res.data?.data || [];
      const myProfile = donors.find(
        (d) => d.userId?._id === dbUser._id || d.userId === dbUser._id
      );
      if (myProfile) {
        setDonorProfile(myProfile);
        setForm({
          bloodType: myProfile.bloodType || '',
          phone: myProfile.phone || '',
          availability: myProfile.availability ?? true,
          division: myProfile.location?.division || '',
          district: myProfile.location?.district || '',
          upazila: myProfile.location?.upazila || '',
          area: myProfile.location?.area || '',
        });
      }
    } catch (err) {
      console.error('Error fetching donor profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDonor(donorProfile._id, {
        bloodType: form.bloodType,
        phone: form.phone,
        availability: form.availability,
        location: {
          division: form.division,
          district: form.district,
          upazila: form.upazila,
          area: form.area,
        },
      });
      toast.success('Profile updated successfully');
      setEditing(false);
      fetchDonorProfile();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="bg-dark py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Welcome, {dbUser?.name || firebaseUser?.displayName || 'User'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-10 space-y-6">
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-dark mb-4">Account Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Name</p>
              <p className="text-dark font-medium">{dbUser?.name || firebaseUser?.displayName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</p>
              <p className="text-dark font-medium">{dbUser?.email || firebaseUser?.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Role</p>
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold capitalize">
                {role || 'requester'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/create-donor"
            className="bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Become a Donor
          </Link>
          <Link
            to="/create-request"
            className="border-2 border-dark text-dark hover:bg-dark hover:text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Request Blood
          </Link>
          {role === 'admin' && (
            <Link
              to="/admin"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Admin Panel
            </Link>
          )}
        </div>

        {donorProfile && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-dark">My Donor Profile</h2>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    donorProfile.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : donorProfile.status === 'rejected'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {donorProfile.status}
                </span>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="text-sm text-red-700 hover:text-red-800 font-semibold cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {editing ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Blood Type</label>
                    <select
                      name="bloodType"
                      value={form.bloodType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
                    >
                      {BLOOD_TYPES.map((bt) => (
                        <option key={bt} value={bt}>
                          {bt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Division</label>
                    <input
                      type="text"
                      name="division"
                      value={form.division}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">District</label>
                    <input
                      type="text"
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Upazila</label>
                    <input
                      type="text"
                      name="upazila"
                      value={form.upazila}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Area</label>
                    <input
                      type="text"
                      name="area"
                      value={form.area}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="availability"
                    id="availability"
                    checked={form.availability}
                    onChange={handleChange}
                    className="w-4 h-4 text-red-700 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="availability" className="text-sm text-dark font-medium">
                    Available for donation
                  </label>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-red-700 hover:bg-red-800 disabled:bg-red-300 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Blood Type</p>
                  <p className="text-dark font-extrabold text-2xl">{donorProfile.bloodType}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-dark font-medium">{donorProfile.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-dark font-medium">
                    {donorProfile.location?.upazila}, {donorProfile.location?.district},{' '}
                    {donorProfile.location?.division}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Availability</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      donorProfile.availability
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {donorProfile.availability ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
