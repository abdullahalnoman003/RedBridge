import { useState } from "react";
import Swal from "sweetalert2";
import { sendPasswordResetEmail } from "firebase/auth";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import { auth } from "../../../Firebase/firebase.init";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
  useDocumentTitle("Reset Your Password | RedBridge");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        Swal.fire({
          title: "Reset Link Sent",
          text: "If your mail is registered a password reset link will be sent to your email.",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#d7265e",
          cancelButtonColor: "#6b7280",
          confirmButtonText: "Open Gmail",
        }).then((result) => {
          if (result.isConfirmed) {
            window.open("https://mail.google.com", "_blank");
          }
        });
        setEmail("");
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Reset Failed",
          text: error.message || "Failed to send reset email. Please try again.",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-linear-to-br from-pink-50 via-white to-purple-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-3xl border border-gray-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-red-500 to-pink-600 rounded-full mb-4 shadow-lg">
              <FaEnvelope className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
              Forgot Your Password?
            </h1>
            <p className="text-sm text-gray-600">
              No worries! Enter your email and we’ll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleReset} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-linear-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white w-full font-bold border-none shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-semibold transition-colors"
            >
              <FaArrowLeft /> Back to Login
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-red-600 hover:text-red-700 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
