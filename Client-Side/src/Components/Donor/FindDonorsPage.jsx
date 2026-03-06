import React, { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from '../../Hooks/useAxios';
import {
  loadDivisions as loadBdDivisions,
  loadDistrictsByDivision,
  loadUpazilasByDistrict,
} from '../../Utils/bdLocationApi';
import { FaPhoneAlt, FaMapMarkerAlt, FaTint } from 'react-icons/fa';

const PAGE_SIZE = 6;
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const INITIAL_FILTERS = { bloodType: '', division: '', district: '', upazila: '' };

const FindDonorsPage = () => {
  const axiosInstance = useAxios();
  const [filters, setFilters] = useState({ bloodType: '', division: '', district: '', upazila: '' });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    document.title = 'Find Donors | RedBridge';
  }, []);

  useEffect(() => {
    const loadDivisions = async () => {
      try {
        const data = await loadBdDivisions(axiosInstance);
        setDivisions(data);
      } catch {
        toast.error('Failed to load divisions');
      }
    };

    loadDivisions();
  }, [axiosInstance]);

  const fetchDonors = useCallback(async (searchFilters) => {
    setLoading(true);
    setPage(1);

    try {
      const query = new URLSearchParams();
      Object.entries(searchFilters).forEach(([key, value]) => {
        if (value) query.append(key, value);
      });
      const res = await axiosInstance.get(`/donors?${query.toString()}`);
      setDonors(res?.data?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch donors', { id: 'fetch-donors' });
    } finally {
      setLoading(false);
    }
  }, [axiosInstance]);

  useEffect(() => {
    fetchDonors(INITIAL_FILTERS);
  }, [fetchDonors]);

  const totalPages = Math.max(1, Math.ceil(donors.length / PAGE_SIZE));
  const pagedDonors = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return donors.slice(start, start + PAGE_SIZE);
  }, [donors, page]);

  const handleDivisionChange = async (value) => {
    const next = { ...filters, division: value, district: '', upazila: '' };
    setFilters(next);
    setUpazilas([]);

    if (!value) {
      setDistricts([]);
      return;
    }

    try {
      const data = await loadDistrictsByDivision(axiosInstance, value);
      setDistricts(data);
    } catch {
      toast.error('Failed to load districts');
    }
  };

  const handleDistrictChange = async (value) => {
    const next = { ...filters, district: value, upazila: '' };
    setFilters(next);

    if (!value) {
      setUpazilas([]);
      return;
    }

    try {
      const data = await loadUpazilasByDistrict(axiosInstance, value);
      setUpazilas(data);
    } catch {
      toast.error('Failed to load upazilas');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-5">Find Blood Donors</h1>

      <div className="grid md:grid-cols-5 gap-3 mb-4">
        <select className="select select-bordered" value={filters.bloodType} onChange={(e) => setFilters((prev) => ({ ...prev, bloodType: e.target.value }))}>
          <option value="">All Blood Groups</option>
          {BLOOD_GROUPS.map((group) => <option key={group} value={group}>{group}</option>)}
        </select>

        <select className="select select-bordered" value={filters.division} onChange={(e) => handleDivisionChange(e.target.value)}>
          <option value="">All Divisions</option>
          {divisions.map((d) => <option key={d.division} value={d.division}>{d.division}</option>)}
        </select>

        <select className="select select-bordered" value={filters.district} onChange={(e) => handleDistrictChange(e.target.value)}>
          <option value="">All Districts</option>
          {districts.map((d) => <option key={d.district} value={d.district}>{d.district}</option>)}
        </select>

        <select className="select select-bordered" value={filters.upazila} onChange={(e) => setFilters((prev) => ({ ...prev, upazila: e.target.value }))}>
          <option value="">All Upazilas</option>
          {upazilas.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>

        <button className="btn btn-error text-white" onClick={() => fetchDonors(filters ?? INITIAL_FILTERS)}>
          Search
        </button>
      </div>

      {loading ? <div className="py-12 text-center">Loading donors...</div> : null}

      {!loading && pagedDonors.length === 0 ? (
        <div className="py-12 text-center text-gray-500">No donor found for selected filters.</div>
      ) : null}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pagedDonors.map((donor) => (
          <article
            key={donor._id}
            className="group rounded-2xl border border-[#e7e3f2] bg-white p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#7d1747] to-[#d7265e] text-white grid place-items-center font-bold text-lg shadow-md">
                  {(donor?.userId?.name || 'A').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1a1a2e] leading-tight">
                    {donor?.userId?.name || 'Anonymous Donor'}
                  </h3>
                  <p className="text-xs text-[#7a7091]">Verified community donor</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 rounded-full bg-[#ffe6ee] px-3 py-1 text-xs font-bold text-[#a20f46] border border-[#ffd1e0]">
                <FaTint className="text-[11px]" /> {donor.bloodType}
              </span>
            </div>

            <div className="space-y-2 text-sm text-[#4f4666]">
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-[#d7265e] text-xs" />
                <span className="font-medium">{donor.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#d7265e] text-xs" />
                <span>
                  {donor?.location?.upazila}, {donor?.location?.district}, {donor?.location?.division}
                </span>
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold border ${
                  donor.availability
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                    : 'bg-amber-100 text-amber-700 border-amber-200'
                }`}
              >
                {donor.availability ? 'Available Now' : 'Currently Unavailable'}
              </span>

              <a
                href={`tel:${donor.phone}`}
                className="text-xs font-semibold text-[#7d1747] hover:text-[#d7265e] transition"
              >
                Call Donor
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 mt-8">
        <button className="btn btn-sm" disabled={page === 1} onClick={() => setPage((prev) => Math.max(1, prev - 1))}>Prev</button>
        <span className="text-sm">Page {page} / {totalPages}</span>
        <button className="btn btn-sm" disabled={page === totalPages} onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}>Next</button>
      </div>
    </section>
  );
};

export default FindDonorsPage;
