import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DonorList from '../pages/DonorList';
import DonorDetails from '../pages/DonorDetails';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/AdminDashboard';
import CreateDonor from '../pages/CreateDonor';
import CreateRequest from '../pages/CreateRequest';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'donors', element: <DonorList /> },
      { path: 'donors/:id', element: <DonorDetails /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'create-donor',
        element: (
          <ProtectedRoute>
            <CreateDonor />
          </ProtectedRoute>
        ),
      },
      {
        path: 'create-request',
        element: (
          <ProtectedRoute>
            <CreateRequest />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
