import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import useUserRole from '../../../Hooks/useUserRole';
import LoadingScreen from '../../Shared/LoadingScreen';

const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useContext(AuthContext) || {};
    const [role, roleLoading] = useUserRole(user?.email);
    const isRoleResolving = Boolean(user) && (roleLoading || role === null);

    if (authLoading || isRoleResolving) {
        return <LoadingScreen title="Preparing Dashboard" message="Verifying your role and preparing the admin workspace." />;
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