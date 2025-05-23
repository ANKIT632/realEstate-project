import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, staggerChildren: 0.2 },
            },
          }}
        >
          {/* About Section */}
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-400">
              We are committed to providing the best real estate services. Your dream home is just a click away.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-700 transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          className="mt-8 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          © {new Date().getFullYear()} RealEstate. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}