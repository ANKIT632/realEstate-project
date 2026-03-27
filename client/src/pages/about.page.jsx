function About() {
  return (
    <section className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-orange-50 via-white to-cyan-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Our Story</p>
          <h1 className="mt-2 text-3xl font-black md:text-5xl">Real Estate, Rebuilt For Clarity</h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-300 md:text-base">
            EcoEstate helps buyers and sellers move faster with transparent listings, role-driven workflows,
            and practical tools that focus on decisions, not noise.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold uppercase text-slate-500">Mission</h3>
            <p className="mt-2 text-sm text-slate-700">Make property discovery and seller management reliable, fast, and transparent for everyone.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold uppercase text-slate-500">Vision</h3>
            <p className="mt-2 text-sm text-slate-700">A marketplace where every buyer finds trust and every seller gains control of outcomes.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold uppercase text-slate-500">Approach</h3>
            <p className="mt-2 text-sm text-slate-700">Product-first UX, secure auth, and clean data pipelines that support real user decisions.</p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-800">Why EcoEstate</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <p className="text-3xl font-black text-cyan-700">10k+</p>
              <p className="text-xs uppercase tracking-wide text-slate-500">Listings Viewed</p>
            </div>
            <div>
              <p className="text-3xl font-black text-cyan-700">4k+</p>
              <p className="text-xs uppercase tracking-wide text-slate-500">Buyer Sessions</p>
            </div>
            <div>
              <p className="text-3xl font-black text-cyan-700">1.8k+</p>
              <p className="text-xs uppercase tracking-wide text-slate-500">Seller Actions</p>
            </div>
            <div>
              <p className="text-3xl font-black text-cyan-700">99%</p>
              <p className="text-xs uppercase tracking-wide text-slate-500">Uptime Goal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
