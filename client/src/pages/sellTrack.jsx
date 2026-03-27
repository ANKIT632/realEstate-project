/* eslint-disable no-undef */
import { useCallback, useEffect, useState } from 'react';
import { getSession } from '../localSession/authSession';
import SellTrackComponent from '../components/sellTrackComponent';

function SellTrack() {
  const [sellData, setSellData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getOwnSellData = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = getSession('access_token');

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/owner/selling/properties`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (!response.ok || data.status !== 'success') {
        throw new Error(data.message || 'Unable to fetch sell data');
      }

      setSellData(data);
    }
    catch (err) {
      alert(err.message || 'Failed to fetch properties');
    }
    finally {
      setIsLoading(false);
    }
  }, []);

  const handleMarkSold = async (propertyId) => {
    const token = getSession('access_token');

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/owner/selling/property/sold/${propertyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!response.ok || data.status !== 'success') {
      throw new Error(data.message || 'Unable to mark property as sold');
    }

    setSellData((prev) => {
      const updated = (prev.allProperty || []).map((item) => (
        item._id === propertyId ? { ...item, isSold: true } : item
      ));

      const soldProperty = (prev.soldProperty || 0) + 1;
      return {
        ...prev,
        soldProperty,
        activeProperty: Math.max(0, (prev.totalProperty || 0) - soldProperty),
        allProperty: updated
      };
    });

    alert(data.message || 'Property marked as sold');
  };

  useEffect(() => {
    getOwnSellData();
  }, [getOwnSellData]);

  return (
    <section className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-slate-100 via-white to-slate-200 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-black md:text-3xl">Seller Control Room</h1>
              <p className="mt-1 text-sm text-slate-300">Track listing performance and close active properties quickly.</p>
            </div>
            <button
              type="button"
              onClick={getOwnSellData}
              className="w-fit rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total Listings</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-800">{sellData.totalProperty || 0}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Active Listings</p>
            <p className="mt-1 text-2xl font-extrabold text-cyan-700">{sellData.activeProperty || 0}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Sold Listings</p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-700">{sellData.soldProperty || 0}</p>
          </div>
        </div>

        {isLoading ? (
          <h1 className="min-h-[50vh] text-center text-lg font-semibold text-slate-700">Loading your properties...</h1>
        ) : (sellData.allProperty || []).length > 0 ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {(sellData.allProperty || []).map((property) => (
              <SellTrackComponent key={property._id} data={property} onMarkSold={handleMarkSold} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-slate-800">No listings yet</p>
            <p className="mt-2 text-sm text-slate-600">Create your first property listing to start receiving buyer interest.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SellTrack;
