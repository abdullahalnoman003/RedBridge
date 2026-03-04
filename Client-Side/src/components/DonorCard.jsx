import { Link } from 'react-router-dom';

export default function DonorCard({ donor }) {
  const user = donor.userId;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden group hover:-translate-y-1">
      <div className="bg-dark px-5 py-4 flex items-center justify-between">
        <span className="text-white font-extrabold text-2xl">{donor.bloodType}</span>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            donor.availability
              ? 'bg-green-500/20 text-green-400'
              : 'bg-gray-500/20 text-gray-400'
          }`}
        >
          {donor.availability ? 'Available' : 'Unavailable'}
        </span>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-dark">
          {user?.name || 'Donor'}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {donor.location?.district}, {donor.location?.division}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {donor.phone}
        </div>
        <Link
          to={`/donors/${donor._id}`}
          className="inline-flex items-center gap-1 mt-2 text-sm font-semibold text-red-700 hover:text-red-800 transition-colors"
        >
          View Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
