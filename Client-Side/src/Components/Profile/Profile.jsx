import React, { useContext, useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaCamera, FaCalendarAlt, FaTint, FaIdCard } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { AuthContext } from "../Authentication/Context/AuthContext";

import useDocumentTitle from "../../Hooks/useDocumentTitle";
import useAxios from "../../Hooks/useAxios";
import getApiErrorMessage from "../../Utils/getApiErrorMessage";
import { extractRoleFromApiResponse, resolveFallbackRole, storeUserRole } from "../../Utils/roleUtils";

const Profile = () => {
  useDocumentTitle("RedBridge || Profile");
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
    email: user?.email || "",
    phone: "",
    address: "",
    bio: "",
    role: "",
    joinDate: user?.metadata?.creationTime || "",
    isAvailableForDonation: false,
  });

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get(`/users/role?email=${encodeURIComponent(user?.email || '')}`);
        if (response.data?.data) {
          const role = extractRoleFromApiResponse(response.data);
          setUserProfile(prev => ({
            ...prev,
            ...response.data.data,
            role,
            displayName: user?.displayName || response.data.data.name || "",
            photoURL: user?.photoURL || response.data.data.photoURL || "",
            email: user?.email || response.data.data.email || "",
          }));
          storeUserRole(role);
        }
      } catch (error) {
        const fallbackRole = resolveFallbackRole(user?.email);
        setUserProfile((prev) => ({ ...prev, role: fallbackRole }));
        storeUserRole(fallbackRole);
        toast.error(getApiErrorMessage(error, 'Failed to load profile data.'));
      }
    };

    if (user?.email) {
      fetchUserData();
    }
  }, [user?.email, axiosSecure]);

  const handleInputChange = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Update Firebase profile
      await updateProfile(user, {
        displayName: userProfile.displayName,
        photoURL: userProfile.photoURL,
      });

      // Update backend
      const updateData = {
        name: userProfile.displayName,
        photoURL: userProfile.photoURL,
        phone: userProfile.phone,
        address: userProfile.address,
        bio: userProfile.bio,
        isAvailableForDonation: userProfile.isAvailableForDonation,
      };

      await axiosSecure.patch(`/users/update?email=${user.email}`, updateData);

      setIsEditing(false);
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been successfully updated.",
        timer: 2000,
        showConfirmButton: false,
        background: '#fff',
        color: '#333',
        iconColor: '#dc2626',
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: getApiErrorMessage(error, "Something went wrong. Please try again."),
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-red-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-3">
            My <span className="text-red-600">Profile</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Your RedBridge account information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-linear-to-br from-red-500 to-pink-500 p-1">
                    <img
                      src={userProfile.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.displayName || 'User')}&background=dc2626&color=fff&size=128`}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-2 border-white shadow-lg"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.displayName || 'User')}&background=dc2626&color=fff&size=128`;
                      }}
                    />
                  </div>
                  
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">
                  {userProfile.displayName || "User"}
                </h2>
                <p className="text-gray-500 text-sm mt-1 break-all">{userProfile.email}</p>
              </div>

              {/* User Stats */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                  <div className="shrink-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <FaIdCard className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="font-bold text-gray-800 capitalize truncate">{userProfile.role || "User"}</p>
                  </div>
                </div>

                {/* Donation Availability Badge - Only for donors */}
                {userProfile.role === 'donor' && (
                  <div className={`flex items-center gap-3 p-3 rounded-xl border ${
                    userProfile.isAvailableForDonation 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      userProfile.isAvailableForDonation 
                        ? 'bg-green-600' 
                        : 'bg-gray-400'
                    }`}>
                      <FaTint className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Donation Status</p>
                      <p className={`font-bold text-sm truncate ${
                        userProfile.isAvailableForDonation 
                          ? 'text-green-700' 
                          : 'text-gray-600'
                      }`}>
                        {userProfile.isAvailableForDonation ? 'Available' : 'Not Available'}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <FaCalendarAlt className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Member Since</p>
                    <p className="font-semibold text-gray-800 text-sm truncate">{formatDate(userProfile.joinDate)}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn bg-linear-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white w-full border-none shadow-lg"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="btn bg-green-600 hover:bg-green-700 text-white flex-1 border-none"
                    >
                      <FaSave /> {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn bg-gray-500 hover:bg-gray-600 text-white border-none"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-3">
                <FaUser className="text-red-600" /> Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Availability for Donation - Only show for donors */}
                {userProfile.role === 'donor' && (
                  <div className="form-control md:col-span-2">
                    <label className="label cursor-pointer justify-start gap-4 p-4 bg-linear-to-r from-red-50 to-pink-50 rounded-xl border border-red-200 hover:border-red-300 transition-colors">
                      <div className="flex-1">
                        <span className="label-text font-bold text-gray-800 flex items-center gap-2 mb-1">
                          <FaTint className="text-red-600" /> Available for Donation
                        </span>
                        <span className="label-text-alt text-gray-600 text-xs block">
                          {userProfile.isAvailableForDonation 
                            ? "You are currently available to donate blood" 
                            : "You are not available for donation right now"}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        className="toggle toggle-error toggle-lg"
                        checked={userProfile.isAvailableForDonation || false}
                        onChange={(e) => handleInputChange('isAvailableForDonation', e.target.checked)}
                        disabled={!isEditing}
                      />
                    </label>
                    {isEditing && (
                      <label className="label">
                        <span className="label-text-alt text-gray-500 text-xs">Toggle to set your donation availability status</span>
                      </label>
                    )}
                  </div>
                )}

                {/* Full Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaUser className="text-red-600" /> Full Name
                    </span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={userProfile.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                      {userProfile.displayName || "Not provided"}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaEnvelope className="text-red-600" /> Email Address
                    </span>
                  </label>
                  <div className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-300 text-gray-600 cursor-not-allowed">
                    {userProfile.email}
                  </div>
                  <label className="label">
                    <span className="label-text-alt text-gray-500 text-xs">Email cannot be changed</span>
                  </label>
                </div>

                {/* Phone */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaPhone className="text-red-600" /> Phone Number
                    </span>
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={userProfile.phone || ""}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="01XXXXXXXXX"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                      {userProfile.phone || "Not provided"}
                    </div>
                  )}
                  <label className="label">
                    <span className="label-text-alt text-gray-500 text-xs">Used for emergency contact</span>
                  </label>
                </div>

                {/* Address */}
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-600" /> Address
                    </span>
                  </label>
                  {isEditing ? (
                    <textarea
                      className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none h-24"
                      value={userProfile.address || ""}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 min-h-24 whitespace-pre-wrap">
                      {userProfile.address || "Not provided"}
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaUser className="text-red-600" /> Bio
                    </span>
                  </label>
                  {isEditing ? (
                    <textarea
                      className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none h-32"
                      value={userProfile.bio || ""}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      maxLength={500}
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 min-h-32 whitespace-pre-wrap">
                      {userProfile.bio || "Not provided"}
                    </div>
                  )}
                  {isEditing && (
                    <label className="label">
                      <span className="label-text-alt text-gray-500 text-xs">{userProfile.bio?.length || 0}/500 characters</span>
                    </label>
                  )}
                </div>

                {/* Photo URL (only in edit mode) */}
                {isEditing && (
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                        <FaCamera className="text-red-600" /> Profile Photo URL
                      </span>
                    </label>
                    <input
                      type="url"
                      className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={userProfile.photoURL || ""}
                      onChange={(e) => handleInputChange('photoURL', e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                    />
                    <label className="label">
                      <span className="label-text-alt text-gray-500 text-xs">Paste a valid image URL</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Donor Information Notice */}
              <div className="mt-8 p-4 bg-linear-to-r from-red-50 to-pink-50 border-l-4 border-red-600 rounded-lg">
                <div className="flex items-start gap-3">
                  <MdBloodtype className="text-red-600 text-2xl shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Want to Become a Blood Donor?</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Register as a donor to help save lives in your community. Your blood donation can make a real difference during emergencies.
                    </p>
                    <a
                      href="/donate"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                    >
                      <FaTint /> Register as Donor
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
