// Set session
function setSession(key, value) {
    const now = new Date();

    // Set the expiration time to 5 days from now
    const item = {
        data: value,
        expiry: now.getTime() + 1000 * 60 * 60 * 24 * 5,
    };

    localStorage.setItem(key, JSON.stringify(item));
}

// Get session
function getSession(key) {
    const itemStr = localStorage.getItem(key);

    // If the item doesn't exist, return null
    if (!itemStr) {
        return {};
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {

        localStorage.removeItem(key);
        return {};
    }

    return item.data;
}

// Delete session
function deleteSession(key) {
    localStorage.removeItem(key);
}

export { setSession, getSession, deleteSession };

