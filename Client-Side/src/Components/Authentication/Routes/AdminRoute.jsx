import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import useUserRole from '../../../Hooks/useUserRole';

const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useContext(AuthContext) || {};
    const [role, roleLoading] = useUserRole(user?.email);
    const isRoleResolving = Boolean(user) && (roleLoading || role === null);

    if (authLoading || isRoleResolving) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-linear-to-br from-base-100 via-base-200 to-base-300">
                <div className="text-center space-y-3">
                    <span className="loading loading-bars loading-lg text-primary"></span>
                    <p className="text-xl font-semibold text-primary">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;