import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from '../../Hooks/useAxios';
import {
  loadDivisions as loadBdDivisions,
  loadDistrictsByDivision,
  loadUpazilasByDistrict,
} from '../../Utils/bdLocationApi';
import getApiErrorMessage from '../../Utils/getApiErrorMessage';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const DonatePage = () => {
  const axiosInstance = useAxios();
  const [form, setForm] = useState({
    bloodType: 'O+',
    phone: '',
    availability: true,
    location: {
      division: '',
      district: '',
      upazila: '',
      area: '',
    },
  });

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Donate Blood | RedBridge';
  }, []);

  useEffect(() => {
    const loadDivisions = async () => {
      try {
        const data = await loadBdDivisions(axiosInstance);
        setDivisions(data);
      } catch (error) {
        toast.error(getApiErrorMessage(error, 'Failed to load divisions'));
      }
    };

    loadDivisions();
  }, [axiosInstance]);

  const handleDivisionChange = async (division) => {
    setForm((prev) => ({
      ...prev,
      location: { ...prev.location, division, district: '', upazila: '' },
    }));
    setUpazilas([]);

    if (!division) {
      setDistricts([]);
      return;
    }

    try {
      const data = await loadDistrictsByDivision(axiosInstance, division);
      setDistricts(data);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load districts'));
    }
  };

  const handleDistrictChange = async (district) => {
    setForm((prev) => ({
      ...prev,
      location: { ...prev.location, district, upazila: '' },
    }));

    if (!district) {
      setUpazilas([]);
      return;
    }

    try {
      const data = await loadUpazilasByDistrict(axiosInstance, district);
      setUpazilas(data);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load upazilas'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        bloodType: form.bloodType,
        phone: form.phone,
        availability: form.availability,
        location: form.location,
      };

      const res = await axiosInstance.post('/donors', payload);
      const donorId = res?.data?.data?._id;
      if (donorId) {
        localStorage.setItem('myDonorId', donorId);
      }

      toast.success('Donor profile submitted. Waiting for admin approval.');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to submit donor profile'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Create Donor Profile</h1>
      <p className="text-sm text-gray-500 mb-6">Use your real location and phone so emergency requests can reach you quickly.</p>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 bg-white p-5 rounded-xl border">
        <label className="form-control">
          <span className="label-text mb-1">Blood Group</span>
          <select
            className="select select-bordered"
            value={form.bloodType}
            onChange={(e) => setForm((prev) => ({ ...prev, bloodType: e.target.value }))}
          >
            {BLOOD_GROUPS.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </label>

        <label className="form-control">
          <span className="label-text mb-1">Phone</span>
          <input
            className="input input-bordered"
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="017xxxxxxxx"
            required
          />
        </label>

        <label className="form-control">
          <span className="label-text mb-1">Division</span>
          <select
            className="select select-bordered"
            value={form.location.division}
            onChange={(e) => handleDivisionChange(e.target.value)}
            required
          >
            <option value="">Select division</option>
            {divisions.map((d) => (
              <option key={d.division} value={d.division}>{d.division}</option>
            ))}
          </select>
        </label>

        <label className="form-control">
          <span className="label-text mb-1">District</span>
          <select
            className="select select-bordered"
            value={form.location.district}
            onChange={(e) => handleDistrictChange(e.target.value)}
            required
          >
            <option value="">Select district</option>
            {districts.map((d) => (
              <option key={d.district} value={d.district}>{d.district}</option>
            ))}
          </select>
        </label>

        <label className="form-control">
          <span className="label-text mb-1">Upazila</span>
          <select
            className="select select-bordered"
            value={form.location.upazila}
            onChange={(e) => setForm((prev) => ({ ...prev, location: { ...prev.location, upazila: e.target.value } }))}
            required
          >
            <option value="">Select upazila</option>
            {upazilas.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </label>

        <label className="form-control">
          <span className="label-text mb-1">Area (optional)</span>
          <input
            className="input input-bordered"
            value={form.location.area}
            onChange={(e) => setForm((prev) => ({ ...prev, location: { ...prev.location, area: e.target.value } }))}
            placeholder="Road/Block"
          />
        </label>

        <label className="cursor-pointer flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            className="checkbox"
            checked={form.availability}
            onChange={(e) => setForm((prev) => ({ ...prev, availability: e.target.checked }))}
          />
          <span>Available for donation now</span>
        </label>

        <button disabled={loading} className="btn btn-error md:col-span-2 text-white">
          {loading ? 'Submitting...' : 'Submit Donor Profile'}
        </button>
      </form>
    </section>
  );
};

export default DonatePage;
