import { useState, useEffect } from 'react';
import { getAllDonors } from '../services/donor.service';
import axiosInstance from '../services/axiosInstance';
import DonorCard from '../components/DonorCard';
import Loader from '../components/Loader';
import { BLOOD_TYPES } from '../types/donor.types';

export default function DonorList() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bloodType, setBloodType] = useState('');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/api/locations/divisions')
      .then((res) => setDivisions(res.data?.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (division) {
      axiosInstance
        .get(`/api/locations/districts/${division}`)
        .then((res) => setDistricts(res.data?.data || []))
        .catch(() => {});
    } else {
      setDistricts([]);
      setDistrict('');
    }
  }, [division]);

  useEffect(() => {
    fetchDonors();
  }, [bloodType, district]);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const params = {};
      if (bloodType) params.bloodType = bloodType;
      if (district) params.district = district;
      const res = await getAllDonors(params);
      setDonors(res.data?.data || []);
    } catch {
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-dark py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Find Blood Donors</h1>
          <p className="text-gray-400">Search for available donors by blood type and location</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">Blood Type</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
              >
                <option value="">All Blood Types</option>
                {BLOOD_TYPES.map((bt) => (
                  <option key={bt} value={bt}>
                    {bt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">Division</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
              >
                <option value="">All Divisions</option>
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
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-dark bg-gray-50"
                disabled={!division}
              >
                <option value="">All Districts</option>
                {districts.map((d) => (
                  <option key={d.district} value={d.district}>
                    {d.district}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <Loader />
        ) : donors.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg font-medium">No donors found matching your criteria</p>
            <p className="text-gray-300 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.map((donor) => (
              <DonorCard key={donor._id} donor={donor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
