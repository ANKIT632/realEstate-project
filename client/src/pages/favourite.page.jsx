import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaHome } from 'react-icons/fa';
import SingleCard from '../components/singleCard.component';
import { getFavouriteProperties, saveFavouriteProperties } from '../localSession/favProperty';

function Favourite() {
  const navigate = useNavigate();
  const [favouriteData, setFavouriteData] = useState(getFavouriteProperties());

  const hasData = useMemo(() => favouriteData.length > 0, [favouriteData]);

  const clearAllFavourites = () => {
    saveFavouriteProperties([]);
    setFavouriteData([]);
  };

  return (
    <section className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-slate-100 via-white to-slate-200 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white/80 p-4 backdrop-blur-md shadow-sm md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">Favourite Properties</h1>
              <p className="mt-1 text-sm text-slate-600">Your saved shortlist for quick comparison and future follow-up.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/allDeals')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <FaHome /> Back To Deals
              </button>

              {hasData && (
                <button
                  type="button"
                  onClick={clearAllFavourites}
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-600"
                >
                  <FaHeart /> Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {!hasData && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">No favourites yet</h2>
            <p className="mt-2 text-sm text-slate-600">Tap the heart icon on any property card to save it here.</p>
            <button
              type="button"
              onClick={() => navigate('/allDeals')}
              className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-black"
            >
              Explore Properties
            </button>
          </div>
        )}

        {hasData && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {favouriteData.map((property) => (
              <SingleCard key={property._id} data={property} onFavouriteToggle={setFavouriteData} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Favourite;
