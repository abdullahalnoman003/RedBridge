import React, { useMemo } from 'react';

const Card = ({ title, value }) => (
  <div className="bg-white border rounded-xl p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <h4 className="text-2xl font-bold mt-1">{value}</h4>
  </div>
);

const AdminStats = ({ users = [], donors = [] }) => {
  const stats = useMemo(() => {
    const adminCount = users.filter((u) => u.role === 'admin').length;
    const donorRoleCount = users.filter((u) => u.role === 'donor').length;
    const bloodBreakdown = donors.reduce((acc, item) => {
      acc[item.bloodType] = (acc[item.bloodType] || 0) + 1;
      return acc;
    }, {});

    return {
      totalUsers: users.length,
      adminCount,
      donorRoleCount,
      listedDonors: donors.length,
      bloodBreakdown,
    };
  }, [users, donors]);

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-4 gap-3">
        <Card title="Total Users" value={stats.totalUsers} />
        <Card title="Admin Users" value={stats.adminCount} />
        <Card title="Donor Role Users" value={stats.donorRoleCount} />
        <Card title="Listed Donors" value={stats.listedDonors} />
      </div>

      <div className="bg-white border rounded-xl p-4">
        <h3 className="font-semibold mb-2">Blood Group Distribution</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(stats.bloodBreakdown).length === 0 ? (
            <span className="text-sm text-gray-500">No donor data found.</span>
          ) : (
            Object.entries(stats.bloodBreakdown).map(([group, count]) => (
              <span key={group} className="badge badge-outline p-3">
                {group}: {count}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
