import { useState } from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission - can be replaced with actual backend API
      // For now, just show success message
      setTimeout(() => {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setIsSubmitting(false);

        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      }, 1000);
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white shadow-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Get In Touch</p>
          <h1 className="mt-2 text-3xl font-black md:text-5xl">We'd Love to Hear From You</h1>
          <p className="mt-4 max-w-3xl text-sm text-blue-50 md:text-base">
            Have questions about listings, need support, or want to partner with us? 
            Reach out anytime and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Contact Info Cards */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
              <HiOutlinePhone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Phone</h3>
            <p className="mt-2 text-sm text-slate-600">Call us for immediate assistance</p>
            <p className="mt-3 text-base font-semibold text-blue-600">+91 737-123-4567</p>
            <p className="text-xs text-slate-500">Mon - Fri, 9am - 6pm EST</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
              <HiOutlineMail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Email</h3>
            <p className="mt-2 text-sm text-slate-600">Send us a detailed message</p>
            <p className="mt-3 text-base font-semibold text-blue-600">support@xyz.com</p>
            <p className="text-xs text-slate-500">We respond within 24 hours</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
              <HiOutlineLocationMarker className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Location</h3>
            <p className="mt-2 text-sm text-slate-600">Visit our office</p>
            <p className="mt-3 text-base font-semibold text-slate-700">123 Property Lane</p>
            <p className="text-xs text-slate-600">India</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-800">Send us a Message</h2>
          <p className="mt-2 text-sm text-slate-600">Fill out the form below and we'll get back to you shortly.</p>

          {submitStatus === 'success' && (
            <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-4">
              <p className="text-sm font-semibold text-green-800">
                ✓ Thanks for reaching out! We'll be in touch soon.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4">
              <p className="text-sm font-semibold text-red-800">
                ✗ Oops! Something went wrong. Please try again.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone (Optional)"
                className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message..."
              rows="6"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-xl disabled:opacity-50 transition-all"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-800">Frequently Asked Questions</h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-slate-100 p-4">
              <h3 className="font-semibold text-slate-800">How do I list a property?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Sign up as a Seller and use our simple form to add property details, photos, and pricing. 
                It typically takes 10-15 minutes.
              </p>
            </div>

            <div className="rounded-lg border border-slate-100 p-4">
              <h3 className="font-semibold text-slate-800">Is there a fee to list?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Listing is free. We only charge when a property is successfully sold.
              </p>
            </div>

            <div className="rounded-lg border border-slate-100 p-4">
              <h3 className="font-semibold text-slate-800">How do I track interested buyers?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Use your Seller Dashboard to see visitor activity, manage inquiries, and track which properties 
                are getting the most attention.
              </p>
            </div>

            <div className="rounded-lg border border-slate-100 p-4">
              <h3 className="font-semibold text-slate-800">Can I edit my listing after posting?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Yes! You can edit price, photos, description, and other details anytime from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
