import React from 'react';
import MetricCard from './MetricCard';
import useDonorsStats from '../../Hooks/useDonorsStats';
import useUsersStats from '../../Hooks/useUsersStats';

const MetricsPanel = ({ refetchTrigger }) => {
  const { stats: donorStats, loading: donorLoading, refetch: refetchDonors } = useDonorsStats();
  const { stats: userStats, loading: userLoading, refetch: refetchUsers } = useUsersStats();

  React.useEffect(() => {
    refetchDonors();
    refetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTrigger]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        title="Total Users"
        value={userStats.totalUsers}
        icon="👥"
        color="primary"
        loading={userLoading}
      />
      <MetricCard
        title="Total Donors"
        value={donorStats.totalDonors}
        icon="🩸"
        color="error"
        loading={donorLoading}
      />
      <MetricCard
        title="Pending Donors"
        value={donorStats.pendingDonors}
        icon="⏳"
        color="warning"
        loading={donorLoading}
      />
      <MetricCard
        title="Admin Users"
        value={userStats.adminUsers}
        icon="🔐"
        color="info"
        loading={userLoading}
      />
      <MetricCard
        title="Donor Users"
        value={userStats.donorUsers}
        icon="🩹"
        color="success"
        loading={userLoading}
      />
      <MetricCard
        title="Regular Users"
        value={userStats.regularUsers}
        icon="👤"
        color="secondary"
        loading={userLoading}
      />
      <MetricCard
        title="Available Donors"
        value={donorStats.availableDonors}
        icon="✅"
        color="success"
        loading={donorLoading}
      />
      <MetricCard
        title="Unavailable Donors"
        value={donorStats.unavailableDonors}
        icon="❌"
        color="error"
        loading={donorLoading}
      />
    </div>
  );
};

export default MetricsPanel;
