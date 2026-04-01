import React, { useState } from 'react';
import MetricsPanel from '../../Components/Admin/MetricsPanel';
import PendingDonorsManagement from '../../Components/Admin/PendingDonorsManagement';
import UserManagement from '../../Components/Admin/UserManagement';

const AdminLayout = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleActionComplete = () => {
        // Trigger refresh for metrics cards
        setRefreshTrigger((prev) => prev + 1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Manage donors, users, and system metrics</p>
                </div>

                {/* Metrics Panel */}
                <MetricsPanel refetchTrigger={refreshTrigger} />

                {/* Content Grid */}
                <div className="space-y-6">
                    {/* Pending Donors Management */}
                    <PendingDonorsManagement onActionComplete={handleActionComplete} />

                    {/* User Management */}
                    <UserManagement onActionComplete={handleActionComplete} />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;