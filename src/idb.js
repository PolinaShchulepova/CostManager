const idb = {
    openCostsDB: function (name, version) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(name, version);

            request.onupgradeneeded = function (event) {
                const db = event.target.result;

                if (!db.objectStoreNames.contains("costs")) {
                    const store = db.createObjectStore("costs", { keyPath: "id", autoIncrement: true });
                    store.createIndex("category", "category", { unique: false });
                    store.createIndex("date", "date", { unique: false });
                }
            };

            request.onsuccess = function (event) {
                const dbInstance = {
                    db: event.target.result,

                    addCost: function (entry) {
                        return new Promise((resolve, reject) => {
                            const transaction = this.db.transaction(["costs"], "readwrite");
                            const store = transaction.objectStore("costs");
                            const request = store.add(entry);

                            request.onsuccess = function () {
                                resolve(true);
                            };
                            request.onerror = function (event) {
                                reject(new Error("Failed to add cost: " + event.target.error.message));
                            };
                        });
                    },

                    getAllCosts: function () {
                        return new Promise((resolve, reject) => {
                            const transaction = this.db.transaction(["costs"], "readonly");
                            const store = transaction.objectStore("costs");
                            const request = store.getAll();

                            request.onsuccess = function (event) {
                                resolve(event.target.result);
                            };
                            request.onerror = function (event) {
                                reject(new Error("Failed to fetch costs: " + event.target.error.message));
                            };
                        });
                    },

                    updateCost: function (id, updatedEntry) {
                        return new Promise((resolve, reject) => {
                            const transaction = this.db.transaction(["costs"], "readwrite");
                            const store = transaction.objectStore("costs");
                            const request = store.put({ ...updatedEntry, id });

                            request.onsuccess = function () {
                                resolve(true);
                            };
                            request.onerror = function (event) {
                                reject(new Error("Failed to update cost: " + event.target.error.message));
                            };
                        });
                    },

                    deleteCost: function (id) {
                        return new Promise((resolve, reject) => {
                            const transaction = this.db.transaction(["costs"], "readwrite");
                            const store = transaction.objectStore("costs");
                            const request = store.delete(id);

                            request.onsuccess = function () {
                                resolve(true);
                            };
                            request.onerror = function (event) {
                                reject(new Error("Failed to delete cost: " + event.target.error.message));
                            };
                        });
                    }
                };

                resolve(dbInstance);
            };

            request.onerror = function (event) {
                reject(new Error("Failed to open database: " + event.target.errorCode));
            };
        });
    }
};

window.idb = idb;