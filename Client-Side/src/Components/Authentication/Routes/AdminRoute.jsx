import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user, role, loading } = useContext(AuthContext) || {};
    const location = useLocation();

    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;