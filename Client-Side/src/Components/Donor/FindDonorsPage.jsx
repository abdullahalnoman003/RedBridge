import React, { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from '../../Hooks/useAxios';
import {
  loadDivisions as loadBdDivisions,
  loadDistrictsByDivision,
  loadUpazilasByDistrict,
} from '../../Utils/bdLocationApi';
import getApiErrorMessage from '../../Utils/getApiErrorMessage';
import { FaMapMarkerAlt, FaPhoneAlt, FaTint } from 'react-icons/fa';
import { LuDroplets, LuFilter, LuRefreshCw, LuSearch } from 'react-icons/lu';

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
  const [locationLoading, setLocationLoading] = useState({
    divisions: false,
    districts: false,
    upazilas: false,
  });

  useEffect(() => {
    document.title = 'Find Donors | RedBridge';
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

  const fetchDonors = useCallback(async (searchFilters) => {
    setLoading(true);
    setPage(1);

    try {
      const query = new URLSearchParams();
      Object.entries(searchFilters).forEach(([key, value]) => {
        if (value) query.append(key, value);
      });
      // Request maximum allowed limit to get all donors
      query.append('limit', '100');
      const res = await axiosInstance.get(`/donors?${query.toString()}`);
      setDonors(res?.data?.data || []);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to fetch donors'), { id: 'fetch-donors' });
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
      setLocationLoading((prev) => ({ ...prev, districts: true }));
      const data = await loadDistrictsByDivision(axiosInstance, value);
      setDistricts(data);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load districts'));
    } finally {
      setLocationLoading((prev) => ({ ...prev, districts: false }));
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
      setLocationLoading((prev) => ({ ...prev, upazilas: true }));
      const data = await loadUpazilasByDistrict(axiosInstance, value);
      setUpazilas(data);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load upazilas'));
    } finally {
      setLocationLoading((prev) => ({ ...prev, upazilas: false }));
    }
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setDistricts([]);
    setUpazilas([]);
    fetchDonors(INITIAL_FILTERS);
  };

  const buildDonorLocation = (donor) => {
    const upazila = donor?.location?.upazila;
    const district = donor?.location?.district;
    const division = donor?.location?.division;
    const area = donor?.location?.area;
    return [upazila, district, division, area].filter(Boolean).join(', ') || 'Location not provided';
  };

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 via-base-100 to-base-100 p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge badge-error badge-lg gap-2">
              <LuDroplets />
              Donor Search
            </span>
            <span className="badge badge-ghost gap-2">
              <LuFilter />
              Filter by blood group and location
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-black text-base-content sm:text-4xl">Find Blood Donors</h1>
          <p className="mt-2 text-sm text-base-content/70 sm:text-base">
            Discover verified donors across Bangladesh and connect quickly during urgent blood needs.
          </p>
        </div>

        <form
          className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-5"
          onSubmit={(event) => {
            event.preventDefault();
            fetchDonors(filters ?? INITIAL_FILTERS);
          }}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <select
              className="select select-bordered w-full bg-base-200"
              value={filters.bloodType}
              onChange={(e) => setFilters((prev) => ({ ...prev, bloodType: e.target.value }))}
            >
              <option value="">All Blood Groups</option>
              {BLOOD_GROUPS.map((group) => <option key={group} value={group}>{group}</option>)}
            </select>

            <select
              className="select select-bordered w-full bg-base-200"
              value={filters.division}
              onChange={(e) => handleDivisionChange(e.target.value)}
              disabled={locationLoading.divisions}
            >
              <option value="">All Divisions</option>
              {divisions.map((d) => <option key={d.division} value={d.division}>{d.division}</option>)}
            </select>

            <select
              className="select select-bordered w-full bg-base-200"
              value={filters.district}
              onChange={(e) => handleDistrictChange(e.target.value)}
              disabled={!filters.division || locationLoading.districts}
            >
              <option value="">All Districts</option>
              {districts.map((d) => <option key={d.district} value={d.district}>{d.district}</option>)}
            </select>

            <select
              className="select select-bordered w-full bg-base-200"
              value={filters.upazila}
              onChange={(e) => setFilters((prev) => ({ ...prev, upazila: e.target.value }))}
              disabled={!filters.district || locationLoading.upazilas}
            >
              <option value="">All Upazilas</option>
              {upazilas.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>

            <div className="flex gap-2">
              <button type="submit" className="btn buttonUI btn-error text-white flex-1" disabled={loading}>
                <LuSearch />
                Search
              </button>
              <button type="button" className="btn buttonUI btn-ghost border border-base-300" onClick={handleResetFilters} disabled={loading}>
                <LuRefreshCw />
              </button>
            </div>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-base-content/70">
          <p>Total matched donors: <span className="font-semibold text-base-content">{donors.length}</span></p>
          {(locationLoading.divisions || locationLoading.districts || locationLoading.upazilas) ? (
            <p className="inline-flex items-center gap-2">
              <span className="loading loading-spinner loading-xs"></span>
              Loading location options...
            </p>
          ) : null}
        </div>

        {loading ? <div className="py-12 text-center text-base-content/70">Loading donors...</div> : null}

        {!loading && pagedDonors.length === 0 ? (
          <div className="rounded-2xl border border-base-300 bg-base-100 py-12 text-center text-base-content/60">
            No donor found for selected filters.
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pagedDonors.map((donor) => (
            <article
              key={donor._id}
              className="group rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-primary to-error text-white font-bold text-lg shadow-md">
                    {(donor?.userId?.name || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-lg text-base-content leading-tight">
                      {donor?.userId?.name || 'Anonymous Donor'}
                    </h3>
                    <p className="text-xs text-base-content/60">Verified community donor</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full border border-error/20 bg-error/10 px-3 py-1 text-xs font-bold text-error">
                  <FaTint className="text-[11px]" /> {donor.bloodType}
                </span>
              </div>

              <div className="space-y-2 text-sm text-base-content/75">
                <p className="flex items-center gap-2">
                  <FaPhoneAlt className="text-error text-xs" />
                  <span className="font-medium">{donor.phone}</span>
                </p>
                <p className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-0.5 text-error text-xs" />
                  <span>{buildDonorLocation(donor)}</span>
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold border ${
                    donor.availability
                      ? 'bg-success/15 text-success border-success/25'
                      : 'bg-warning/15 text-warning border-warning/25'
                  }`}
                >
                  {donor.availability ? 'Available Now' : 'Currently Unavailable'}
                </span>

                <a
                  href={`tel:${donor.phone}`}
                  className="btn buttonUI btn-primary btn-xs"
                >
                  Call Donor
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button className="btn buttonUI btn-sm" disabled={page === 1} onClick={() => setPage((prev) => Math.max(1, prev - 1))}>Prev</button>
          <span className="text-sm text-base-content/75">Page {page} / {totalPages}</span>
          <button className="btn buttonUI btn-sm" disabled={page === totalPages} onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}>Next</button>
        </div>
      </div>
    </section>
  );
};

export default FindDonorsPage;
