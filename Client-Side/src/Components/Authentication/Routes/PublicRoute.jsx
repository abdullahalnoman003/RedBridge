import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext) || {};

    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;