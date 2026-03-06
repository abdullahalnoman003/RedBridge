import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../../../Firebase/firebase.init';
import toast from 'react-hot-toast';
import useAxios from '../../../Hooks/useAxios';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaTint } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';

const Login = () => {
  useEffect(() => { document.title = 'Login | RedBridge'; }, []);

  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const axiosInstance = useAxios();
  const { refreshRole } = React.useContext(AuthContext) || {};

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const getErrorMessage = (code) => {
    const map = {
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/invalid-credential': 'Invalid email or password.',
      'auth/invalid-email': 'Invalid email address.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/too-many-requests': 'Too many attempts. Please try again later.',
      'auth/popup-closed-by-user': 'Sign-in cancelled.',
      'auth/network-request-failed': 'Network error. Check your connection.',
      'auth/account-exists-with-different-credential':
        'An account with this email exists. Use email & password.',
    };
    return map[code] || 'Login failed. Please try again.';
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, form.email, form.password);
      const token = await res.user.getIdToken();
      localStorage.setItem('access-token', token);
      if (refreshRole) await refreshRole();
      toast.success(`Welcome back, ${res.user.displayName || 'User'}!`);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem('access-token', token);
      try {
        await axiosInstance.post('/users', {
          name: user.displayName,
          email: user.email.toLowerCase(),
          role: 'donor',
        });
      } catch (e) {
        console.error(e);
      }
      if (refreshRole) await refreshRole();
      toast.success(`Welcome back, ${user.displayName}!`);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center space-y-4">
          <FaTint className="text-red-600 text-6xl animate-pulse mx-auto" />
          <p className="text-xl font-semibold text-red-700">Logging in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        <div className="hidden md:flex flex-col justify-between bg-linear-to-br from-red-800 via-red-600 to-rose-500 p-10 text-white">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <img src="/logo.png" alt="RedBridge" className=" w-auto brightness-0 invert" />
              
            </div>
            <h2 className="text-4xl font-extrabold leading-tight mb-4">
              Every Drop<br />Saves a Life.
            </h2>
            <p className="text-red-100 text-sm leading-relaxed">
              Sign in to connect with blood donors near you, manage your donation
              records, and help save lives in your community.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-xs text-red-200 uppercase tracking-wider mb-2">Did you know?</p>
              <p className="text-sm font-medium">
                1 donation can save up to{' '}
                <span className="text-yellow-300 font-bold">3 lives</span>.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {['A+', 'B+', 'O+', 'AB+'].map((g) => (
                <div key={g} className="bg-white/20 rounded-xl py-2 text-center text-sm font-bold">
                  {g}
                </div>
              ))}
            </div>
            <p className="text-red-200 text-xs text-center">All blood types are urgently needed.</p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6 md:hidden">
            <img src="/logo.png" alt="RedBridge" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-8">Sign in to your RedBridge account</p>

          <form onSubmit={handleEmailLogin} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition focus:ring-2 focus:ring-red-400 ${
                  errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-red-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm outline-none transition focus:ring-2 focus:ring-red-400 ${
                    errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl transition text-sm"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-400">or continue with</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <button
            onClick={handleGoogleSignin}
            className="w-full py-2.5 border border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition text-sm font-medium text-gray-700"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-red-600 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
