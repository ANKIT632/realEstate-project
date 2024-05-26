export const setLocalStorage = (key, value) => {

    localStorage.setItem(key,JSON.stringify(value));

};


export const getLocalStorage = (key) => {
    
        const itemStr = localStorage.getItem(key);
    
        if(!itemStr){
            return {};
        }
    
        const item = JSON.parse(itemStr);
    
        return item;
}

export const removeLocalStorage = (key) => {
     localStorage.removeItem(key);
}