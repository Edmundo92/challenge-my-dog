const storageName = "config_interface_dog";

const get = () => {
    const storageData = localStorage.getItem(storageName);
    return JSON.parse(storageData);
}

const set = (data) => {
    const serializeData = JSON.stringify(data);
    localStorage.setItem(storageName, serializeData);
}

const hasData = () => {
    return localStorage.getItem(storageName);
}

export default {
    get,
    set,
    hasData
}