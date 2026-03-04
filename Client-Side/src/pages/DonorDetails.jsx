import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDonorById } from '../services/donor.service';
import Loader from '../components/Loader';

export default function DonorDetails() {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await getDonorById(id);
        setDonor(res.data?.data);
      } catch {
        setError('Donor not found');
      } finally {
        setLoading(false);
      }
    };
    fetchDonor();
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg mb-4">{error}</p>
        <Link to="/donors" className="text-red-700 hover:text-red-800 font-semibold">
          Back to Donors
        </Link>
      </div>
    );
  }

  const user = donor?.userId;

  return (
    <div>
      <div className="bg-dark py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/donors" className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm font-medium mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Donors
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-3xl font-extrabold">{user?.name || 'Donor'}</h1>
              <p className="text-gray-400 mt-1">{user?.email}</p>
            </div>
            <span className="bg-white text-red-700 font-extrabold text-3xl px-6 py-3 rounded-lg shadow-lg">
              {donor?.bloodType}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
              <p className="text-dark font-medium">{donor?.phone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Availability</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  donor?.availability
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {donor?.availability ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Division</p>
              <p className="text-dark font-medium">{donor?.location?.division}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">District</p>
              <p className="text-dark font-medium">{donor?.location?.district}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Upazila</p>
              <p className="text-dark font-medium">{donor?.location?.upazila}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Area</p>
              <p className="text-dark font-medium">{donor?.location?.area || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Status</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  donor?.status === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : donor?.status === 'rejected'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {donor?.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

