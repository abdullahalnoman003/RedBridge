import React from 'react';
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaTint,
  FaUser,
  FaUserCheck,
  FaUserShield,
  FaUsers,
} from 'react-icons/fa';
import { LuActivity } from 'react-icons/lu';
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
    <section className="mb-6 space-y-4">
      <div className="rounded-2xl border border-error/20 bg-linear-to-r from-error/10 via-base-100 to-base-100 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-error/15 text-error text-xl">
            <LuActivity />
          </div>
          <div>
            <h3 className="text-xl font-bold text-base-content">Live Blood Network Metrics</h3>
            <p className="text-sm text-base-content/65">
              Realtime visibility on users, donor verification, and donation readiness.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={userStats.totalUsers}
          icon={<FaUsers />}
          color="primary"
          loading={userLoading}
          subtitle="All users who registered"
        />
        <MetricCard
          title="Donors"
          value={donorStats.totalDonors}
          icon={ <FaUserCheck /> }
          color="secondary"
          loading={donorLoading}
          subtitle=" Total Verified Donors"
        />
        <MetricCard
          title="Pending Donors"
          value={donorStats.pendingDonors}
          icon={<FaClock />}
          color="warning"
          loading={donorLoading}
          subtitle="Users needed to verify"
        />
        <MetricCard
          title="Admin Users"
          value={userStats.adminUsers}
          icon={<FaUserShield />}
          color="info"
          loading={userLoading}
          subtitle="Management Members"
        />
        <MetricCard
          title="Total Donors"
          value={userStats.donorUsers}
          icon={<FaTint />}
          color="warning"
          loading={userLoading}
          subtitle="Total Applied Donors"
        />
        <MetricCard
          title="Regular Users"
          value={userStats.regularUsers}
          icon={<FaUser />}
          color="primary"
          loading={userLoading}
          subtitle="Logged in as User"
        />
        <MetricCard
          title="Available Donors"
          value={donorStats.availableDonors}
          icon={<FaCheckCircle />}
          color="success"
          loading={donorLoading}
          subtitle="Prepared to Donate"
        />
        <MetricCard
          title="Unavailable Donors"
          value={donorStats.unavailableDonors}
          icon={<FaTimesCircle />}
          color="error"
          loading={donorLoading}
          subtitle="Currently not available"
        />
      </div>
    </section>
  );
};

export default MetricsPanel;
