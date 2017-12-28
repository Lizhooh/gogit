const Storage = window.localStorage;

export default {
    get(key) {
        return JSON.parse(Storage.getItem(key));
    },
    set(key, value) {
        Storage.setItem(key, JSON.stringify(data));
        return this;
    },
    delete(key) {
        const data = this.get(key);
        delete Storage[key];
        return data;
    },
    clear() {
        Storage.clear();
        return this;
    }
}
