import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import AdminUsers from '../../Components/Admin/AdminUsers';
import AdminDonorActions from '../../Components/Admin/AdminDonorActions';
import AdminStats from '../../Components/Admin/AdminStats';

const AdminLayout = () => {
    const [tab, setTab] = useState('stats');
    const [users, setUsers] = useState([]);
    const [donors, setDonors] = useState([]);
    const axiosInstance = useAxios();

    useEffect(() => {
        document.title = 'Admin Dashboard | RedBridge';
    }, []);

    useEffect(() => {
        const load = async () => {
            try {
                const [usersRes, donorsRes] = await Promise.all([
                    axiosInstance.get('/users'),
                    axiosInstance.get('/donors'),
                ]);
                setUsers(usersRes?.data?.data || []);
                setDonors(donorsRes?.data?.data || []);
            } catch {
                setUsers([]);
                setDonors([]);
            }
        };

        load();
    }, [axiosInstance]);

    return (
        <section className="max-w-7xl mx-auto px-4 py-10 space-y-4">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="tabs tabs-box">
                <button className={`tab ${tab === 'stats' ? 'tab-active' : ''}`} onClick={() => setTab('stats')}>Analytics</button>
                <button className={`tab ${tab === 'users' ? 'tab-active' : ''}`} onClick={() => setTab('users')}>User Management</button>
                <button className={`tab ${tab === 'donors' ? 'tab-active' : ''}`} onClick={() => setTab('donors')}>Donor Actions</button>
            </div>

            {tab === 'stats' ? <AdminStats users={users} donors={donors} /> : null}
            {tab === 'users' ? <AdminUsers /> : null}
            {tab === 'donors' ? <AdminDonorActions /> : null}
        </section>
    );
};

export default AdminLayout;