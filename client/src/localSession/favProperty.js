function setSession(key, value) {
   
   
    localStorage.setItem(key, JSON.stringify(value));
}

// Get session
function getSession(key) {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
        return {};
    }

    const item = JSON.parse(itemStr);




    return item;
}
