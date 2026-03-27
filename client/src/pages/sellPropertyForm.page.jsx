/* eslint-disable no-undef */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession } from '../localSession/authSession';

function SellProperty() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const propertyAddInServer = async (formData) => {
    const token = getSession('access_token');

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/owner/selling/property`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (!response.ok || data.status !== 'success') {
      throw new Error(data.message || 'Unable to add property');
    }

    return data;
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const formElement = document.getElementById('sellPropertyForm');
    const form = new FormData(formElement);

    const formData = {
      propertyInfo: {},
      location: {}
    };

    for (const [key, value] of form.entries()) {
      if (['bedrooms', 'bathrooms', 'squareFeet'].includes(key)) {
        formData.propertyInfo[key] = Number(value || 0);
      }
      else if (['city', 'region', 'country', 'postalCode'].includes(key)) {
        formData.location[key] = value;
      }
      else if (key === 'price') {
        formData[key] = Number(value || 0);
      }
      else if (key === 'nagotiate') {
        formData[key] = value === 'on';
      }
      else if (key !== 'file') {
        formData[key] = value;
      }
    }

    if (!formData.category || formData.category === 'none') {
      alert('Please select a valid category');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await propertyAddInServer(formData);
      alert(data.message || 'Property listed successfully');
      navigate('/sellTrack');
    }
    catch (err) {
      alert(err.message || 'Property listing failed');
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-amber-50 via-white to-cyan-50 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
          <h1 className="text-2xl font-black md:text-3xl">Create A New Property Listing</h1>
          <p className="mt-2 text-sm text-slate-300">Publish a complete listing with pricing, location, and property details to attract qualified buyers.</p>
        </div>

        <form id="sellPropertyForm" onSubmit={formSubmitHandler} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg md:p-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600" htmlFor="title">Property Title</label>
              <input id="title" name="title" required placeholder="Modern villa near city center" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600" htmlFor="description">Description</label>
              <textarea id="description" name="description" required rows={4} placeholder="Highlight key features, nearby places, and what makes this listing special." className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600" htmlFor="city">City</label>
              <input id="city" name="city" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600" htmlFor="region">Region</label>
              <input id="region" name="region" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600" htmlFor="country">Country</label>
              <input id="country" name="country" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600" htmlFor="postalCode">Postal Code</label>
              <input id="postalCode" name="postalCode" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600" htmlFor="price">Price</label>
              <input id="price" name="price" type="number" min="1" required className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600" htmlFor="category">Category</label>
              <select id="category" name="category" defaultValue="none" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200">
                <option value="none">Select category</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Studio">Studio</option>
                <option value="Villa">Villa</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600" htmlFor="bedrooms">Bedrooms</label>
              <input id="bedrooms" name="bedrooms" type="number" min="0" defaultValue="1" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600" htmlFor="bathrooms">Bathrooms</label>
              <input id="bathrooms" name="bathrooms" type="number" min="0" defaultValue="1" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600" htmlFor="squareFeet">Square Feet</label>
              <input id="squareFeet" name="squareFeet" type="number" min="0" defaultValue="0" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600" htmlFor="tags">Tags</label>
              <input id="tags" name="tags" defaultValue="none" placeholder="garden, metro, school" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" />
            </div>

            <label className="md:col-span-2 inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
              <input type="checkbox" name="nagotiate" className="h-4 w-4 accent-cyan-600" />
              Price is negotiable
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-md transition ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700'}`}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Listing'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SellProperty;
