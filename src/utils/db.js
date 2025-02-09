class Idb {
  constructor() {
    this.db = null; // Holds the reference to the IndexedDB database.
  }

  // Opens the IndexedDB database and initializes object stores if needed.
  static async openCostDB(name, version) {
    if (!window.indexedDB) {
      console.error("Your browser doesn't support IndexedDB.");
      return null;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name, version);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create the "costs" store if it does not exist
        if (!db.objectStoreNames.contains('costs')) {
          const store = db.createObjectStore('costs', {
            keyPath: 'id',
            autoIncrement: true
          });
          store.createIndex('category', 'category', { unique: false });
          store.createIndex('date', 'date', { unique: false });
        }

        // Create the "incomes" store if it does not exist
        if (!db.objectStoreNames.contains('incomes')) {
          const store = db.createObjectStore('incomes', {
            keyPath: 'id',
            autoIncrement: true
          });
          store.createIndex('category', 'category', { unique: false });
          store.createIndex('date', 'date', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        const db = new Idb();
        db.db = event.target.result;
        resolve(db);
      };

      request.onerror = (event) => {
        reject(new Error('Failed to open database: ' + event.target.errorCode));
      };
    });
  }

  // Adds a new cost entry to the database.
  async addCost(entry) {
    if (!this.db) {
      console.error('Database has not been initialized.');
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['costs'], 'readwrite');
      const store = transaction.objectStore('costs');
      const request = store.add(entry);

      request.onsuccess = () => resolve(true);
      request.onerror = (event) =>
        reject(new Error('Failed to add cost: ' + event.target.error.message));
    });
  }

  // Retrieves all cost entries from the database.
  async getAllCosts() {
    if (!this.db) {
      console.error('Database has not been initialized.');
      return [];
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['costs'], 'readonly');
      const store = transaction.objectStore('costs');
      const request = store.getAll();

      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) =>
        reject(
          new Error('Failed to fetch costs: ' + event.target.error.message)
        );
    });
  }

  // Updates a cost entry in the database.
  async updateCost(id, updatedEntry) {
    if (!this.db) {
      console.error('Database has not been initialized.');
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['costs'], 'readwrite');
      const store = transaction.objectStore('costs');
      const request = store.put({ ...updatedEntry, id });

      request.onsuccess = () => resolve(true);
      request.onerror = (event) =>
        reject(
          new Error('Failed to update cost: ' + event.target.error.message)
        );
    });
  }

  // Deletes a cost entry from the database.
  async deleteCost(id) {
    if (!this.db) {
      console.error('Database has not been initialized.');
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['costs'], 'readwrite');
      const store = transaction.objectStore('costs');
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = (event) =>
        reject(
          new Error('Failed to delete cost: ' + event.target.error.message)
        );
    });
  }

  // Adds a new income entry to the database.
  async addIncome(income) {
    if (!this.db) {
      console.error('Database has not been initialized.');
      return null;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['incomes'], 'readwrite');
      const store = transaction.objectStore('incomes');
      const request = store.add(income);

      request.onsuccess = (event) => {
        console.log('Income added to IndexedDB:', income);
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.error('Failed to add income:', event.target.error.message);
        reject(new Error('Failed to add income'));
      };
    });
  }

  // Retrieves all income entries from the database.
  async getAllIncomes() {
    if (!this.db) {
      console.error('Database has not been initialized.');
      return [];
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['incomes'], 'readonly');
      const store = transaction.objectStore('incomes');
      const request = store.getAll();

      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) =>
        reject(
          new Error('Failed to fetch incomes: ' + event.target.error.message)
        );
    });
  }

  // Updates an income entry in the database.
  async updateIncome(id, updatedIncome) {
    if (!this.db) {
      console.error('Database has not been initialized.');
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['incomes'], 'readwrite');
      const store = transaction.objectStore('incomes');
      const request = store.put({ ...updatedIncome, id });

      request.onsuccess = () => resolve(true);
      request.onerror = (event) =>
        reject(
          new Error('Failed to update income: ' + event.target.error.message)
        );
    });
  }

  // Deletes an income entry from the database.
  async deleteIncome(id) {
    if (!this.db) {
      console.error('Database has not been initialized.');
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['incomes'], 'readwrite');
      const store = transaction.objectStore('incomes');
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = (event) =>
        reject(
          new Error('Failed to delete income: ' + event.target.error.message)
        );
    });
  }
}

export default Idb;
