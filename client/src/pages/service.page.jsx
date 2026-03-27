import { HiOutlineCheckCircle, HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineChartBar } from 'react-icons/hi';

export default function Service() {
  return (
    <section className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white shadow-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-100">What We Offer</p>
          <h1 className="mt-2 text-3xl font-black md:text-5xl">Comprehensive Real Estate Services</h1>
          <p className="mt-4 max-w-3xl text-sm text-purple-50 md:text-base">
            From listing to closing, we provide everything you need to buy or sell property with confidence.
          </p>
        </div>

        {/* Core Services */}
        <div className="mt-12">
          <h2 className="text-2xl font-extrabold text-slate-800">Core Services</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Seller Services */}
            <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white">
                  <HiOutlineSparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Seller Services</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <HiOutlineCheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    <strong>Easy Property Listing:</strong> Post properties in minutes with our intuitive form
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HiOutlineCheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    <strong>Visitor Tracking:</strong> See who viewed your property and when they visited
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HiOutlineCheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    <strong>Sales Dashboard:</strong> Track active listings, sold properties, and buyer interest
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HiOutlineCheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    <strong>Mark as Sold:</strong> Update property status when deal is complete
                  </span>
                </li>
              </ul>
            </div>

            {/* Buyer Services */}
            <div className="rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-600 text-white">
                  <HiOutlineChartBar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Buyer Services</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <HiOutlineCheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    <strong>Advanced Search:</strong> Filter properties by category, location, price, and more
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HiOutlineCheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    <strong>Favorites List:</strong> Save properties you love for later review
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HiOutlineCheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    <strong>Buyer Track:</strong> Monitor properties you've visited and your inquiry history
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HiOutlineCheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    <strong>Direct Access:</strong> View seller contact and property owner information
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Premium Features */}
        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-800">Why Choose EcoEstate</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3 mb-3">
                <HiOutlineShieldCheck className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-slate-800">Transparent & Secure</h3>
              </div>
              <p className="text-sm text-slate-600">
                All transactions are protected with secure authentication and encrypted data storage.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3 mb-3">
                <HiOutlineSparkles className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold text-slate-800">User-Friendly Platform</h3>
              </div>
              <p className="text-sm text-slate-600">
                Intuitive interface designed for both buyers and sellers of all technical levels.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3 mb-3">
                <HiOutlineCheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-slate-800">24/7 Support</h3>
              </div>
              <p className="text-sm text-slate-600">
                Our support team is available around the clock to help with any questions or issues.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3 mb-3">
                <HiOutlineChartBar className="w-6 h-6 text-pink-600" />
                <h3 className="font-bold text-slate-800">Real-Time Analytics</h3>
              </div>
              <p className="text-sm text-slate-600">
                Get instant insights into property performance with our visitor tracking and metrics.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3 mb-3">
                <HiOutlineSparkles className="w-6 h-6 text-cyan-600" />
                <h3 className="font-bold text-slate-800">Fast & Reliable</h3>
              </div>
              <p className="text-sm text-slate-600">
                Built for speed with 99% uptime guarantee and optimized performance across all devices.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3 mb-3">
                <HiOutlineCheckCircle className="w-6 h-6 text-orange-600" />
                <h3 className="font-bold text-slate-800">Free Listings</h3>
              </div>
              <p className="text-sm text-slate-600">
                List unlimited properties for free. We only charge when your property is sold.
              </p>
            </div>
          </div>
        </div>

        {/* Service Categories */}
        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-800">Our Property Categories</h2>
          <p className="mt-2 text-sm text-slate-600">
            We support listing and searching across diverse property types to match every buyer and seller need.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {[
              { name: 'Apartments', icon: '🏢' },
              { name: 'Houses', icon: '🏠' },
              { name: 'Villas', icon: '🏰' },
              { name: 'Studios', icon: '🏘️' },
              { name: 'Commercial', icon: '🏪' }
            ].map((category, idx) => (
              <div key={idx} className="rounded-lg border border-slate-200 p-4 text-center hover:bg-purple-50 transition-colors">
                <p className="text-3xl mb-2">{category.icon}</p>
                <p className="font-semibold text-slate-800 text-sm">{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white shadow-xl text-center">
          <h2 className="text-2xl font-extrabold">Ready to Get Started?</h2>
          <p className="mt-3 text-sm text-purple-100 max-w-2xl mx-auto">
            Join thousands of satisfied buyers and sellers using EcoEstate to achieve their property goals.
          </p>
          <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-center">
            <button className="rounded-lg bg-white px-6 py-3 font-semibold text-purple-600 hover:bg-purple-50 transition-colors">
              Browse Listings
            </button>
            <button className="rounded-lg border border-white px-6 py-3 font-semibold text-white hover:bg-white hover:bg-opacity-10 transition-colors">
              Become a Seller
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
