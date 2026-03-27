import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState('');
  const location = useLocation();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setEmail('');
      alert('Thanks for subscribing!');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white">
      {/* Main Footer Content */}
      <div className="border-t border-slate-700">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, staggerChildren: 0.1 },
              },
            }}
          >
            {/* Brand Section */}
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <div className="mb-4">
                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  EcoEstate
                </h2>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Your trusted platform for buying, selling, and finding your perfect property.
              </p>
              <div className="mt-4 flex space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-700 hover:bg-blue-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <FaFacebook size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-700 hover:bg-blue-400 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <FaTwitter size={18} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-700 hover:bg-pink-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-700 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <h4 className="text-lg font-bold mb-4 text-white">Navigation</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className={`text-sm transition-colors duration-300 ${
                      isActive('/') ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={`text-sm transition-colors duration-300 ${
                      isActive('/about') ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service"
                    className={`text-sm transition-colors duration-300 ${
                      isActive('/service') ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/allDeals"
                    className={`text-sm transition-colors duration-300 ${
                      isActive('/allDeals') ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Browse Deals
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Seller Links */}
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <h4 className="text-lg font-bold mb-4 text-white">For Sellers</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/sellProperty"
                    className={`text-sm transition-colors duration-300 ${
                      isActive('/sellProperty') ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    List Property
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sellTrack"
                    className={`text-sm transition-colors duration-300 ${
                      isActive('/sellTrack') ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Sales Dashboard
                  </Link>
                </li>
                <li>
                  <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#seller-guide" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Seller Guide
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Buyer Links */}
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <h4 className="text-lg font-bold mb-4 text-white">For Buyers</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/allDeals"
                    className={`text-sm transition-colors duration-300 ${
                      isActive('/allDeals') ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Search Properties
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favourite"
                    className={`text-sm transition-colors duration-300 ${
                      isActive('/favourite') ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Saved Properties
                  </Link>
                </li>
                <li>
                  <Link
                    to="/buyTrack"
                    className={`text-sm transition-colors duration-300 ${
                      isActive('/buyTrack') ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    My Inquiries
                  </Link>
                </li>
                <li>
                  <a href="#buyer-guide" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Buyer Guide
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Contact Section */}
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <h4 className="text-lg font-bold mb-4 text-white">Contact</h4>
              <div className="space-y-4">
                <a href="tel:+15551234567" className="flex items-center gap-3 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  <FaPhone size={16} />
                  +1 (555) 123-4567
                </a>
                <a href="mailto:support@ecoestate.com" className="flex items-center gap-3 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  <FaEnvelope size={16} />
                  support@ecoestate.com
                </a>
                <div className="flex items-start gap-3 text-sm text-gray-400">
                  <FaMapMarkerAlt size={16} className="mt-1 flex-shrink-0" />
                  <span>123 Property Lane<br />New York, NY 10001</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-6">
                <h5 className="text-sm font-semibold mb-3 text-white">Newsletter</h5>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-sm font-semibold text-white hover:shadow-lg transition-all duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} EcoEstate. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-cyan-400 transition-colors">
                Terms of Service
              </a>
              <Link to="/contactUs" className="hover:text-cyan-400 transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}