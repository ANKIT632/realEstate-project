const FAV_KEY = 'favourite_properties';

const getFavouriteProperties = () => {
    const itemStr = localStorage.getItem(FAV_KEY);
    if (!itemStr) {
        return [];
    }

    try {
        const parsed = JSON.parse(itemStr);
        return Array.isArray(parsed) ? parsed : [];
    }
    catch (err) {
        localStorage.removeItem(FAV_KEY);
        return [];
    }
};

const saveFavouriteProperties = (properties) => {
    localStorage.setItem(FAV_KEY, JSON.stringify(properties));
};

const isPropertyFavourite = (propertyId) => {
    if (!propertyId) {
        return false;
    }
    return getFavouriteProperties().some((item) => item?._id === propertyId);
};

const toggleFavouriteProperty = (property) => {
    if (!property || !property._id) {
        return getFavouriteProperties();
    }

    const all = getFavouriteProperties();
    const exists = all.some((item) => item._id === property._id);

    const next = exists
        ? all.filter((item) => item._id !== property._id)
        : [property, ...all];

    saveFavouriteProperties(next);
    return next;
};

export {
    FAV_KEY,
    getFavouriteProperties,
    isPropertyFavourite,
    toggleFavouriteProperty,
    saveFavouriteProperties
};
