import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../../../Firebase/firebase.init';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAxios from '../../../Hooks/useAxios';
import getApiErrorMessage from '../../../Utils/getApiErrorMessage';
import { extractRoleFromApiResponse, resolveFallbackRole, storeUserRole } from '../../../Utils/roleUtils';
import LoadingScreen from '../../Shared/LoadingScreen';

const provider = new GoogleAuthProvider();
const IMGBB_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const Register = () => {
  useEffect(() => { document.title = 'Register | RedBridge'; }, []);

  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [form, setForm] = useState({ name: '', email: '', password: '', image: null });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) {
        error = 'Name is required';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters';
      }
    } else if (name === 'email') {
      if (!value) {
        error = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address';
      }
    } else if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 6) {
        error = 'At least 6 characters required';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    const newValue = files ? files[0] : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));
    
    // Real-time validation for text fields only
    if (!files && touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'At least 6 characters required';
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

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append('image', file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, { method: 'POST', body: data });
    const json = await res.json();
    if (!json.success) throw new Error('Upload failed');
    return json.data.url;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);

    let photoURL = null;
    if (form.image) {
      try { photoURL = await uploadImage(form.image); }
      catch { toast.error('Image upload failed. Please try again.'); setLoading(false); return; }
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(user, { displayName: form.name, ...(photoURL && { photoURL }) });
      localStorage.setItem('access-token', await user.getIdToken());

      const userInfo = {
        name: form.name,
        email: form.email.toLowerCase(),
        role: 'user',
        photoURL: photoURL || null,
        bio: null,
        address: null,
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      try { await axiosInstance.post('/users', userInfo); }
      catch { /* non-critical — auth succeeded */ }

      toast.success(`Welcome to RedBridge, ${form.name}!`);
      const redirectPath = await resolveRoleBasedPath(user.email);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      const msgs = {
        'auth/email-already-in-use': 'This email is already registered.',
        'auth/weak-password': 'Password is too weak.',
        'auth/invalid-email': 'Invalid email address.',
      };
      toast.error(msgs[err.code] || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setLoading(true);
    try {
      const { user } = await signInWithPopup(auth, provider);
      localStorage.setItem('access-token', await user.getIdToken());

      const userInfo = {
        name: user.displayName,
        email: user.email.toLowerCase(),
        role: 'user',
        photoURL: user.photoURL || null,
        bio: null,
        address: null,
        isVerified: true,
        lastLogin: new Date().toISOString(),
      };

      try { await axiosInstance.post('/users', userInfo); }
      catch { /* non-critical — auth succeeded */ }

      toast.success(`Welcome to RedBridge, ${user.displayName}!`);
      const redirectPath = await resolveRoleBasedPath(user.email);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      const msgs = {
        'auth/popup-closed-by-user': 'Sign-in cancelled.',
        'auth/network-request-failed': 'Network error. Check your connection.',
      };
      toast.error(msgs[err.code] || 'Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen title="Creating your account" message="Uploading your details and preparing your RedBridge profile." />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-red-100 via-white to-rose-100 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-gray-400 overflow-hidden grid md:grid-cols-5 relative z-10 border border-red-100/20">

        {/* Left branded panel - Enhanced */}
        <div className="hidden md:flex md:col-span-2 flex-col justify-between bg-linear-to-br from-red-800 via-red-700 to-red-900 p-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <img src="/logo.png" alt="RedBridge" className="h-10 w-auto brightness-0 invert drop-shadow-lg" />
            </div>
            <h2 className="text-4xl font-black leading-tight mb-6">
              Join the<br />
              <span className="text-red-200">Life-Saving</span><br />
              Community
            </h2>
            <p className="text-red-100 text-sm leading-relaxed font-medium">
              Register as a donor or seeker. Your presence could be the exact
              match someone urgently needs right now.
            </p>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl">
              <p className="text-xs text-red-200 uppercase tracking-widest mb-3 font-semibold">Blood Groups We Need</p>
              <div className="grid grid-cols-4 gap-2">
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((g) => (
                  <div key={g} className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-lg py-2 text-center text-xs font-bold hover:bg-white/25 transition-all duration-300">{g}</div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl hover:bg-white/15 transition-all duration-300">
              <p className="text-sm font-bold mb-3">Why register?</p>
              <ul className="space-y-2 text-red-100 text-xs font-medium">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-200"></span>
                  Find donors near your location instantly
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-200"></span>
                  Get notified when your blood type is needed
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-200"></span>
                  Track your donation history & impact
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right form panel - Enhanced */}
        <div className="md:col-span-3 p-8 sm:p-12 flex flex-col justify-center bg-linear-to-br from-white to-red-50/30">
          <div className="flex items-center gap-2 mb-8 md:hidden">
            <img src="/logo.png" alt="RedBridge" className="w-auto" />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl text-red-800 font-bold">
              Create account
            </h1>
            <p className="text-sm text-gray-600">Join thousands of donors saving lives every day</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div className="group">
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2  items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-red-600"></span>
                Full Name
              </label>
              <input 
                id="name"
                type="text" 
                name="name" 
                value={form.name} 
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Rahim Ahmed"
                aria-label="Full Name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all duration-300 focus:ring-4 focus:ring-red-100 ${
                  errors.name 
                    ? 'border-red-400 bg-red-50 focus:border-red-500' 
                    : touched.name && form.name && !errors.name
                    ? 'border-green-400 bg-green-50 focus:border-green-500 focus:ring-green-100'
                    : 'border-gray-200 bg-white focus:bg-white focus:border-red-400 group-hover:border-gray-300'
                }`}
              />
              {errors.name && touched.name && <p id="name-error" className="text-red-600 text-xs mt-2 font-medium">
                {errors.name}
              </p>}
              {!errors.name && touched.name && form.name && (
                <p className="text-green-600 text-xs mt-2 font-medium">
                  Looks good!
                </p>
              )}
            </div>

            {/* Email */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 items-center gap-2">
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
                placeholder="rahim.ahmed@gmail.com"
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

            {/* Password */}
            <div className="group">
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-red-600"></span>
                Password
              </label>
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
                  aria-describedby={errors.password ? "password-error" : "password-hint"}
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors p-1">
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.password && touched.password ? (
                <p id="password-error" className="text-red-600 text-xs mt-2 font-medium">
                  {errors.password}
                </p>
              ) : !errors.password && touched.password && form.password ? (
                <p className="text-green-600 text-xs mt-2 font-medium">
                  Strong password!
                </p>
              ) : (
                <p id="password-hint" className="text-gray-500 text-xs mt-2 font-medium">Minimum 6 characters required</p>
              )}
            </div>

            {/* Profile Photo */}
            <div className="group">
              <label htmlFor="image" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                Profile Photo <span className="text-gray-500 font-normal text-xs">(Optional)</span>
              </label>
              <input 
                id="image"
                type="file" 
                name="image" 
                accept="image/*" 
                onChange={handleChange}
                aria-label="Profile Photo"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-linear-to-r file:from-red-600 file:to-red-700 file:text-white file:text-xs file:font-bold hover:file:from-red-700 hover:file:to-red-800 file:transition-all file:duration-300 file:shadow-md cursor-pointer transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 hover:border-gray-300"
              />
              <p className="text-gray-500 text-xs mt-2 font-medium">
                JPG, PNG or GIF (Max 5MB)
              </p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:from-red-800 active:to-red-900 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 text-sm shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-0.5 active:translate-y-0">
              Create Account
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
            aria-label="Sign up with Google"
            className="w-full py-3 border-2 border-gray-200 bg-white rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm font-semibold text-gray-700 shadow-sm hover:shadow-md group">
            <FcGoogle size={22} className="group-hover:scale-110 transition-transform duration-300" />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600 mt-8 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 font-bold hover:text-red-700 hover:underline transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
