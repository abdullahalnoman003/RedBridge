import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../../../Firebase/firebase.init';
import toast from 'react-hot-toast';
import useAxios from '../../../Hooks/useAxios';
import getApiErrorMessage from '../../../Utils/getApiErrorMessage';
import { extractRoleFromApiResponse, resolveFallbackRole, storeUserRole } from '../../../Utils/roleUtils';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoadingScreen from '../../Shared/LoadingScreen';

const Login = () => {
  useEffect(() => { document.title = 'Login | RedBridge'; }, []);

  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      if (!value) {
        error = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address';
      }
    } else if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 6) {
        error = 'Password must be at least 6 characters';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Real-time validation if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    
    // Validate on blur
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const resolveRoleBasedPath = async (email) => {
    try {
      const res = await axiosInstance.get(`/users/role?email=${encodeURIComponent(email)}`);
      const role = extractRoleFromApiResponse(res.data);
      storeUserRole(role);
      return role === 'admin' ? '/dashboard/admin' : '/';
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load user role.'));
      const fallbackRole = resolveFallbackRole(email);
      storeUserRole(fallbackRole);
      return fallbackRole === 'admin' ? '/dashboard/admin' : '/';
    }
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
      try {
        await axiosInstance.patch(`/users/update?email=${res.user.email}`, {
          lastLogin: new Date().toISOString(),
        });
      } catch (e) {
        console.error(e);
      }
      toast.success(`Welcome back, ${res.user.displayName || 'User'}!`);
      const redirectPath = await resolveRoleBasedPath(res.user.email);
      navigate(redirectPath, { replace: true });
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
          role: 'user',
          photoURL: user.photoURL || null,
          bio: null,
          address: null,
          isVerified: true,
          lastLogin: new Date().toISOString(),
        });
      } catch (e) {
        console.error(e);
      }
      try {
        await axiosInstance.patch(`/users/update?email=${user.email}`, {
          lastLogin: new Date().toISOString(),
        });
      } catch (e) {
        console.error(e);
      }
      toast.success(`Welcome back, ${user.displayName}!`);
      const redirectPath = await resolveRoleBasedPath(user.email);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen title="Signing you in" message="Verifying your credentials and restoring your dashboard access." />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-red-100 to-red-100 via-transparent flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-gray-400 overflow-hidden grid md:grid-cols-5 relative z-10 border border-red-100/20">
        {/* Left branded panel - Enhanced */}
        <div className="hidden md:flex md:col-span-2 flex-col justify-between bg-linear-to-br from-red-800 via-red-700 to-red-900 p-10 text-white relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-linear(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <img src="/logo.png" alt="RedBridge" className="h-10 w-auto brightness-0 invert drop-shadow-lg" />
            </div>
            <h2 className="text-4xl font-black leading-tight mb-6">
              Every Drop<br />
              <span className="text-red-200">Saves a Life</span>
            </h2>
            <p className="text-red-100 text-sm leading-relaxed font-medium">
              Sign in to connect with blood donors near you, manage your donation
              records, and help save lives in your community.
            </p>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <p className="text-xs text-red-200 uppercase tracking-widest mb-3 font-semibold">Did you know?</p>
              <p className="text-base font-bold">
                1 donation can save up to{' '}
                <span className="text-yellow-300 text-xl">3 lives</span>
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {['A+', 'B+', 'O+', 'AB+'].map((g) => (
                <div key={g} className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl py-3 text-center text-sm font-bold hover:bg-white/25 transition-all duration-300 shadow-lg">
                  {g}
                </div>
              ))}
            </div>
            <p className="text-red-200 text-xs text-center font-medium">All blood types are urgently needed</p>
          </div>
        </div>

        {/* Right form panel - Enhanced */}
        <div className="md:col-span-3 p-8 sm:p-12 flex flex-col justify-center bg-linear-to-br from-white to-red-50/30">
          <div className="flex items-center gap-2 mb-8 md:hidden">
            <img src="/logo.png" alt="RedBridge" className="h-8 w-auto" />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-red-700">
              Welcome back
            </h1>
            <p className="text-sm text-gray-600">Sign in to your RedBridge account and continue saving lives</p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-5" noValidate>
            <div className="group">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2  items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-red-600"></span>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="rahim.ahmed@example.com"
                aria-label="Email Address"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all duration-300 focus:ring-4 focus:ring-red-100 ${
                  errors.email 
                    ? 'border-red-400 bg-red-50 focus:border-red-500' 
                    : touched.email && form.email && !errors.email
                    ? 'border-green-400 bg-green-50 focus:border-green-500 focus:ring-green-100'
                    : 'border-gray-200 bg-white focus:bg-white focus:border-red-400 group-hover:border-gray-300'
                }`}
              />
              {errors.email && touched.email && <p id="email-error" className="text-red-600 text-xs mt-2 font-medium">
                {errors.email}
              </p>}
              {!errors.email && touched.email && form.email && (
                <p className="text-green-600 text-xs mt-2 font-medium">
                  Looks good!
                </p>
              )}
            </div>

            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-bold text-gray-700  items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-red-600"></span>
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-red-600 hover:text-red-700 font-semibold hover:underline transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  aria-label="Password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`w-full px-4 py-3 pr-12 rounded-xl border-2 text-sm outline-none transition-all duration-300 focus:ring-4 focus:ring-red-100 ${
                    errors.password 
                      ? 'border-red-400 bg-red-50 focus:border-red-500' 
                      : touched.password && form.password && !errors.password
                      ? 'border-green-400 bg-green-50 focus:border-green-500 focus:ring-green-100'
                      : 'border-gray-200 bg-white focus:bg-white focus:border-red-400 group-hover:border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors p-1"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.password && touched.password && <p id="password-error" className="text-red-600 text-xs mt-2 font-medium">
                {errors.password}
              </p>}
              {!errors.password && touched.password && form.password && (
                <p className="text-green-600 text-xs mt-2 font-medium">
                  Looks good!
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="buttonUI w-full py-3.5 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:from-red-800 active:to-red-900 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 text-sm shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">or continue with</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <button
            onClick={handleGoogleSignin}
            disabled={loading}
            aria-label="Sign in with Google"
            className="buttonUI w-full py-3 border-2 border-gray-200 bg-white rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm font-semibold text-gray-700 shadow-sm hover:shadow-md group"
          >
            <FcGoogle size={22} className="group-hover:scale-110 transition-transform duration-300" />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600 mt-8 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-red-600 font-bold hover:text-red-700 hover:underline transition-colors">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
