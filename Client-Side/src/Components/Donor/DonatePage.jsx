import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle, FaPhoneAlt } from 'react-icons/fa';
import { LuDroplets, LuMapPinned, LuShieldCheck } from 'react-icons/lu';
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
  const [locationLoading, setLocationLoading] = useState({
    divisions: false,
    districts: false,
    upazilas: false,
  });

  useEffect(() => {
    document.title = 'Donate Blood | RedBridge';
  }, []);

  useEffect(() => {
    const loadDivisions = async () => {
      setLocationLoading((prev) => ({ ...prev, divisions: true }));
      try {
        const data = await loadBdDivisions(axiosInstance);
        setDivisions(data);
      } catch (error) {
        toast.error(getApiErrorMessage(error, 'Failed to load divisions'));
      } finally {
        setLocationLoading((prev) => ({ ...prev, divisions: false }));
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
      setLocationLoading((prev) => ({ ...prev, districts: true }));
      const data = await loadDistrictsByDivision(axiosInstance, division);
      setDistricts(data);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load districts'));
    } finally {
      setLocationLoading((prev) => ({ ...prev, districts: false }));
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
      setLocationLoading((prev) => ({ ...prev, upazilas: true }));
      const data = await loadUpazilasByDistrict(axiosInstance, district);
      setUpazilas(data);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load upazilas'));
    } finally {
      setLocationLoading((prev) => ({ ...prev, upazilas: false }));
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
      setForm((prev) => ({
        ...prev,
        phone: '',
        availability: true,
        location: { division: '', district: '', upazila: '', area: '' },
      }));
      setDistricts([]);
      setUpazilas([]);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to submit donor profile'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-2xl border border-error/20 bg-linear-to-r from-error/10 via-base-100 to-base-100 p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge badge-error badge-lg gap-2">
              <LuDroplets />
              Become a Verified Donor
            </span>
            <span className="badge badge-ghost gap-2">
              <LuShieldCheck />
              Admin approval required
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-black text-base-content sm:text-4xl">Create Your Donor Profile</h1>
          <p className="mt-2 max-w-3xl text-sm text-base-content/70 sm:text-base">
            Use your real blood group, mobile number, and Bangladesh location so nearby emergency requests can reach you quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="card border border-base-300 bg-base-100 shadow-xl lg:col-span-2 min-w-0">
            <div className="card-body space-y-4">
              <div className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-base-content/75">
                Ensure your information stays updated. This improves matching speed during urgent blood requests.
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="form-control min-w-0">
                  <span className="label-text mb-1 font-semibold">Blood Group</span>
                  <select
                    className="select select-bordered w-full bg-base-200"
                    value={form.bloodType}
                    onChange={(e) => setForm((prev) => ({ ...prev, bloodType: e.target.value }))}
                  >
                    {BLOOD_GROUPS.map((group) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </label>

                <label className="form-control min-w-0">
                  <span className="label-text mb-1 font-semibold">Mobile Number</span>
                  <input
                    className="input input-bordered w-full bg-base-200"
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="01XXXXXXXXX"
                    pattern="^(?:\+?88)?01[3-9]\d{8}$"
                    title="Use a valid Bangladeshi number, e.g. 017XXXXXXXX"
                    required
                  />
                </label>

                <label className="form-control min-w-0">
                  <span className="label-text mb-1 font-semibold">Division</span>
                  <select
                    className="select select-bordered w-full bg-base-200"
                    value={form.location.division}
                    onChange={(e) => handleDivisionChange(e.target.value)}
                    required
                    disabled={locationLoading.divisions}
                  >
                    <option value="">Select division</option>
                    {divisions.map((d) => (
                      <option key={d.division} value={d.division}>{d.division}</option>
                    ))}
                  </select>
                </label>

                <label className="form-control min-w-0">
                  <span className="label-text mb-1 font-semibold">District</span>
                  <select
                    className="select select-bordered w-full bg-base-200"
                    value={form.location.district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    required
                    disabled={!form.location.division || locationLoading.districts}
                  >
                    <option value="">Select district</option>
                    {districts.map((d) => (
                      <option key={d.district} value={d.district}>{d.district}</option>
                    ))}
                  </select>
                </label>

                <label className="form-control min-w-0">
                  <span className="label-text mb-1 font-semibold">Upazila</span>
                  <select
                    className="select select-bordered w-full bg-base-200"
                    value={form.location.upazila}
                    onChange={(e) => setForm((prev) => ({ ...prev, location: { ...prev.location, upazila: e.target.value } }))}
                    required
                    disabled={!form.location.district || locationLoading.upazilas}
                  >
                    <option value="">Select upazila</option>
                    {upazilas.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </label>

                <label className="form-control min-w-0">
                  <span className="label-text mb-1 font-semibold">Area (Optional)</span>
                  <input
                    className="input input-bordered w-full bg-base-200"
                    value={form.location.area}
                    onChange={(e) => setForm((prev) => ({ ...prev, location: { ...prev.location, area: e.target.value } }))}
                    placeholder="Road, Moholla, or landmark"
                  />
                </label>
              </div>

              <label className="cursor-pointer rounded-xl border border-base-300 bg-base-200/60 p-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={form.availability}
                  onChange={(e) => setForm((prev) => ({ ...prev, availability: e.target.checked }))}
                />
                <span className="font-medium text-base-content/85">I am currently available for blood donation</span>
              </label>

              <button disabled={loading} className="btn btn-error text-white w-full sm:w-auto">
                {loading ? 'Submitting...' : 'Submit Donor Profile'}
              </button>
            </div>
          </form>

          <aside className="space-y-4 min-w-0">
            <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
              <h3 className="text-xl font-bold mb-3">Profile Checklist</h3>
              <ul className="space-y-2 text-sm text-base-content/75">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-success" />
                  Use your active Bangladeshi mobile number.
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-success" />
                  Select exact division, district, and upazila.
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 text-success" />
                  Keep availability on if you can respond quickly.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 to-base-100 p-5 shadow-sm">
              <h3 className="text-lg font-bold">Emergency Contact Tip</h3>
              <p className="mt-2 text-sm text-base-content/70">
                If it is a critical case, contact nearby hospitals and blood banks immediately while waiting for donor responses.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-base-100 px-3 py-2 text-sm font-semibold shadow-sm">
                <FaPhoneAlt className="text-primary" />
                Keep your phone reachable
              </div>
            </div>

            {(locationLoading.divisions || locationLoading.districts || locationLoading.upazilas) && (
              <div className="alert alert-info text-sm">
                <span className="loading loading-spinner loading-xs"></span>
                Loading location data...
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default DonatePage;
