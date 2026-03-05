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
import { FaEye, FaEyeSlash, FaTint } from 'react-icons/fa';
import useAxios from '../../../Hooks/useAxios';

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

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'At least 6 characters';
    return e;
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
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      try { await axiosInstance.post('/users', userInfo); }
      catch { /* non-critical — auth succeeded */ }

      toast.success(`Welcome to RedBridge, ${form.name}!`);
      navigate('/');
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
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      try { await axiosInstance.post('/users', userInfo); }
      catch { /* non-critical — auth succeeded */ }

      toast.success(`Welcome to RedBridge, ${user.displayName}!`);
      navigate('/');
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center space-y-4">
          <FaTint className="text-red-600 text-6xl animate-pulse mx-auto" />
          <p className="text-xl font-semibold text-red-700">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left branded panel */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-red-800 via-red-600 to-rose-500 p-10 text-white">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <img src="/logo.png" alt="RedBridge" className="h-10 w-auto brightness-0 invert" />
              <span className="text-2xl font-extrabold tracking-tight">RedBridge</span>
            </div>
            <h2 className="text-4xl font-extrabold leading-tight mb-4">
              Join the<br />Life-Saving<br />Community.
            </h2>
            <p className="text-red-100 text-sm leading-relaxed">
              Register as a donor or seeker. Your presence could be the exact
              match someone urgently needs right now.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-xs text-red-200 uppercase tracking-wider mb-3">Blood Groups We Need</p>
              <div className="grid grid-cols-4 gap-2">
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((g) => (
                  <div key={g} className="bg-white/20 rounded-lg py-1.5 text-center text-xs font-bold">{g}</div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-sm font-semibold mb-2">Why register?</p>
              <ul className="space-y-1 text-red-100 text-xs">
                <li>&#10003; Find donors near your location</li>
                <li>&#10003; Get notified when your blood type is needed</li>
                <li>&#10003; Track your donation history</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-5 md:hidden">
            <img src="/logo.png" alt="RedBridge" className="h-8 w-auto" />
            <span className="text-xl font-extrabold">
              <span className="text-red-600">Red</span><span className="text-gray-700">Bridge</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-1">Create account</h1>
          <p className="text-sm text-gray-500 mb-6">Join thousands of donors saving lives every day</p>

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition focus:ring-2 focus:ring-red-400 ${
                  errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition focus:ring-2 focus:ring-red-400 ${
                  errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} name="password"
                  value={form.password} onChange={handleChange}
                  placeholder="Min 8 chars, uppercase & number"
                  className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm outline-none transition focus:ring-2 focus:ring-red-400 ${
                    errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
                  }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Profile Photo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Profile Photo <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input type="file" name="image" accept="image/*" onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-red-600 file:text-white file:text-xs file:font-semibold cursor-pointer"
              />
            </div>

            <button type="submit"
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition text-sm">
              Create Account
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <button onClick={handleGoogleSignin}
            className="w-full py-2.5 border border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition text-sm font-medium text-gray-700">
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
