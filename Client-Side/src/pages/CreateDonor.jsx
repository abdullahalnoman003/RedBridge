import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDonor } from '../services/donor.service';
import axiosInstance from '../services/axiosInstance';
import { BLOOD_TYPES } from '../types/donor.types';
import toast from 'react-hot-toast';

export default function CreateDonor() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [form, setForm] = useState({
    bloodType: '',
    phone: '',
    division: '',
    district: '',
    upazila: '',
    area: '',
  });

  useEffect(() => {
    axiosInstance
      .get('/api/locations/divisions')
      .then((res) => setDivisions(res.data?.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (form.division) {
      axiosInstance
        .get(`/api/locations/districts/${form.division}`)
        .then((res) => {
          setDistricts(res.data?.data || []);
          setUpazilas([]);
          setForm((prev) => ({ ...prev, district: '', upazila: '' }));
        })
        .catch(() => {});
    }
  }, [form.division]);

  useEffect(() => {
    if (form.district) {
      const found = districts.find((d) => d.district === form.district);
      if (found) {
        setUpazilas(found.upazilla || []);
        setForm((prev) => ({ ...prev, upazila: '' }));
      }
    }
  }, [form.district, districts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createDonor({
        bloodType: form.bloodType,
        phone: form.phone,
        location: {
          division: form.division,
          district: form.district,
          upazila: form.upazila,
          area: form.area,
        },
      });
      toast.success('Donor profile created. Awaiting approval.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to create donor profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-dark py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Become a Donor</h1>
          <p className="text-gray-400">Fill in your details to register as a blood donor</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-10">
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">Blood Type</label>
              <select
                name="bloodType"
                required
                value={form.bloodType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
              >
                <option value="">Select blood type</option>
                {BLOOD_TYPES.map((bt) => (
                  <option key={bt} value={bt}>
                    {bt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">Phone Number</label>
              <input
                type="text"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
                placeholder="01XXXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">Division</label>
              <select
                name="division"
                required
                value={form.division}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
              >
                <option value="">Select division</option>
                {divisions.map((d) => (
                  <option key={d.division} value={d.division}>
                    {d.division}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">District</label>
              <select
                name="district"
                required
                value={form.district}
                onChange={handleChange}
                disabled={!form.division}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
              >
                <option value="">Select district</option>
                {districts.map((d) => (
                  <option key={d.district} value={d.district}>
                    {d.district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">Upazila</label>
              <select
                name="upazila"
                required
                value={form.upazila}
                onChange={handleChange}
                disabled={!form.district}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
              >
                <option value="">Select upazila</option>
                {upazilas.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">Area (optional)</label>
              <input
                type="text"
                name="area"
                value={form.area}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
                placeholder="Your specific area"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 hover:bg-red-800 disabled:bg-red-300 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
            >
              {loading ? 'Submitting...' : 'Register as Donor'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
