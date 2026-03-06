import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { auth } from '../../../Firebase/firebase.init';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Email is required');
            return;
        }

        setSending(true);
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent');
        } catch (error) {
            toast.error(error?.message || 'Failed to send reset email');
        } finally {
            setSending(false);
        }
    };

    return (
        <section className="max-w-md mx-auto px-4 py-16">
            <div className="bg-white border rounded-xl p-6">
                <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
                <p className="text-sm text-gray-500 mb-5">Enter your account email to receive a reset link.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="input input-bordered w-full"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="btn btn-error w-full text-white" disabled={sending}>
                        {sending ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <Link to="/login" className="text-sm text-red-600 hover:underline inline-block mt-4">
                    Back to Login
                </Link>
            </div>
        </section>
    );
};

export default ForgotPassword;