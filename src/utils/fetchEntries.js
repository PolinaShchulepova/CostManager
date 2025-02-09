import idb from "./db.js"; // Importing IndexedDB wrapper

// Fetch all costs from IndexedDB
export const fetchAllCosts = async () => {
    try {
        const db = await idb.openCostDB("costManager", 1);
        const costs = await db.getAllCosts();
        return costs.map((cost) => ({
            ...cost,
            amount: parseFloat(cost.amount), // Ensure amount is stored as a float
        }));
    } catch (error) {
        console.error("Failed to fetch costs:", error);
        throw error;
    }
};

// Fetch all incomes from IndexedDB
export const fetchAllIncomes = async () => {
    try {
        const db = await idb.openCostDB("costManager", 1);
        const incomes = await db.getAllIncomes();
        return incomes.map((income) => ({
            ...income,
            amount: parseFloat(income.amount), // Ensure amount is stored as a float
        }));
    } catch (error) {
        console.error("Failed to fetch incomes:", error);
        throw error;
    }
};

// Add a new cost entry to IndexedDB
export const addNewCost = async (cost) => {
    try {
        const db = await idb.openCostDB("costManager", 1);
        await db.addCost(cost);
        return cost; // Return the newly added cost
    } catch (error) {
        console.error("Failed to add cost:", error);
        throw error;
    }
};

// Add a new income entry to IndexedDB
export const addNewIncome = async (income) => {
    try {
        const db = await idb.openCostDB("costManager", 1);
        await db.addIncome(income);
        return income; // Return the newly added income
    } catch (error) {
        console.error("Failed to add income:", error);
        throw error;
    }
};

// Delete a cost entry by ID
export const deleteCost = async (id) => {
    try {
        const db = await idb.openCostDB("costManager", 1);
        await db.deleteCost(id);
        return id; // Return the deleted cost ID
    } catch (error) {
        console.error("Failed to delete cost:", error);
        throw error;
    }
};

// Delete an income entry by ID
export const deleteIncome = async (id) => {
    try {
        const db = await idb.openCostDB("costManager", 1);
        await db.deleteIncome(id);
        return id; // Return the deleted income ID
    } catch (error) {
        console.error("Failed to delete income:", error);
        throw error;
    }
};

// Update a cost entry in IndexedDB
export const updateCost = async (id, updatedCost) => {
    try {
        const db = await idb.openCostDB("costManager", 1);
        await db.updateCost(id, updatedCost);
        return updatedCost; // Return the updated cost entry
    } catch (error) {
        console.error("Failed to update cost:", error);
        throw error;
    }
};

// Update an income entry in IndexedDB
export const updateIncome = async (id, updatedIncome) => {
    try {
        const db = await idb.openCostDB("costManager", 1);
        await db.updateIncome(id, updatedIncome);
        return updatedIncome; // Return the updated income entry
    } catch (error) {
        console.error("Failed to update income:", error);
        throw error;
    }
};
