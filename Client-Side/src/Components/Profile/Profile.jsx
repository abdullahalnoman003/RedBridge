import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../Authentication/Context/AuthContext';
import useAxios from '../../Hooks/useAxios';

const Profile = () => {
    const { user, role } = useContext(AuthContext) || {};
    const axiosInstance = useAxios();
    const [donor, setDonor] = useState(null);

    useEffect(() => {
        document.title = 'My Profile | RedBridge';
    }, []);

    useEffect(() => {
        const donorId = localStorage.getItem('myDonorId');
        if (!donorId) return;

        const load = async () => {
            try {
                const res = await axiosInstance.get(`/donors/${donorId}`);
                setDonor(res?.data?.data || null);
            } catch {
                setDonor(null);
            }
        };

        load();
    }, [axiosInstance]);

    const toggleAvailability = async () => {
        if (!donor?._id) return;
        try {
            const res = await axiosInstance.put(`/donors/${donor._id}`, {
                availability: !donor.availability,
            });
            setDonor(res?.data?.data || null);
            toast.success('Availability updated');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update availability');
        }
    };

    return (
        <section className="max-w-4xl mx-auto px-4 py-10 space-y-5">
            <div className="bg-white rounded-xl border p-5">
                <h1 className="text-2xl font-bold mb-3">My Account</h1>
                <p><strong>Name:</strong> {user?.displayName || 'N/A'}</p>
                <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
                <p><strong>Role:</strong> <span className="badge">{role || 'donor'}</span></p>
            </div>

            <div className="bg-white rounded-xl border p-5">
                <h2 className="text-xl font-semibold mb-3">My Donor Profile</h2>

                {!donor ? (
                    <div className="space-y-3">
                        <p className="text-gray-500">No donor profile found yet or profile is pending approval.</p>
                        <Link className="btn btn-error text-white" to="/donate">Create Donor Profile</Link>
                    </div>
                ) : (
                    <div className="space-y-1">
                        <p><strong>Blood:</strong> {donor.bloodType}</p>
                        <p><strong>Phone:</strong> {donor.phone}</p>
                        <p><strong>Location:</strong> {donor?.location?.upazila}, {donor?.location?.district}, {donor?.location?.division}</p>
                        <p><strong>Status:</strong> <span className="badge">{donor.status}</span></p>
                        <p><strong>Availability:</strong> <span className={`badge ${donor.availability ? 'badge-success' : 'badge-warning'}`}>{donor.availability ? 'Available' : 'Unavailable'}</span></p>
                        <button className="btn btn-outline btn-sm mt-3" onClick={toggleAvailability}>
                            Toggle Availability
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Profile;