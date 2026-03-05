import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <footer className=" py-10 px-6 z-20 rounded-t-2xl shadow-inner transition-colors duration-300">
          <div className="max-w-screen mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <img src="/logo.png" alt="RedBridge Logo" className="w-40 " />
                
              </div>
              <p className="mt-2 text-sm">
                Connecting blood donors with those in need. Every drop counts —
                find a donor near you or sign up to save a life today.
              </p>
              <p className="text-xs mt-4">
                &copy; {new Date().getFullYear()} RedBridge. All rights reserved.
              </p>
            </div>

            {/* Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-red-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/find-donors" className="hover:text-red-600 transition-colors">
                    Find Donors
                  </Link>
                </li>
                <li>
                  <Link to="/donate" className="hover:text-red-600 transition-colors">
                    Donate Blood
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-red-600 transition-colors">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-red-600 transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
              <p className="text-sm flex items-center gap-2 justify-center sm:justify-start">
                <FaEnvelope className="text-red-500 shrink-0" />
                support@redbridge.com
              </p>
              <p className="text-sm flex items-center gap-2 mt-2 justify-center sm:justify-start">
                <FaPhone className="text-red-500 shrink-0" />
                +880 1700-123456
              </p>
              <p className="text-sm flex items-center gap-2 mt-2 justify-center sm:justify-start">
                <FaMapMarkerAlt className="text-red-500 shrink-0" />
                Dhaka, Bangladesh
              </p>
            </div>

            {/* Social */}
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold mb-3">Connect With Us</h3>
              <p className="text-sm">
                Spread the word and help us save more lives.
              </p>
              <div className="flex justify-center sm:justify-start gap-5 mt-4 text-2xl">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="hover:text-blue-600 transition-colors duration-200" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter/X"
                >
                  <FaSquareXTwitter className="hover:text-blue-400 transition-colors duration-200" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram className="hover:text-pink-600 transition-colors duration-200" />
                </a>
                <a href="mailto:support@redbridge.com" aria-label="Email">
                  <FaEnvelope className="hover:text-red-500 transition-colors duration-200" />
                </a>
              </div>
            </div>

          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;