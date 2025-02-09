import { useState, useEffect } from "react";
import AddCostForm from "./components/AddCostForm.jsx";
import ExpensesTable from "./components/ExpensesTable.jsx";
import CategoryPieChart from "./components/CategoryPieChart.jsx";
import MonthlyReport from "./components/MonthlyReport.jsx";
import { Dialog, DialogTitle, DialogContent, Button, Box, AppBar, Toolbar, Typography } from "@mui/material";
import IncomeTable from "./components/IncomeTable.jsx";
import AddIncomeForm from "./components/AddIncomeForm.jsx";
import NetIncomeReport from "./components/NetIncomeReport.jsx";
import { ThemeProvider, useTheme } from "./components/ThemeProvider.jsx";
import { fetchAllCosts, fetchAllIncomes, addNewCost, addNewIncome, deleteCost, deleteIncome, updateCost, updateIncome } from "./utils/fetchEntries.js";
import FilterControls from "./components/FilterControls.jsx";
import "./styles/styles.css";

function App() {
    const [entries, setEntries] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [filteredIncomes, setFilteredIncomes] = useState([]);
    const [filterYear, setFilterYear] = useState("");
    const [filterMonth, setFilterMonth] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [isReportOpen, setIsReportOpen] = useState(false);
    const { theme, toggleTheme } = useTheme(); // Access theme from context

    // Load all costs and incomes on component mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const costs = await fetchAllCosts();
                const allIncomes = await fetchAllIncomes();
                setEntries(costs);
                setFilteredEntries(costs);
                setIncomes(allIncomes);
                setFilteredIncomes(allIncomes);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
        loadData();
    }, []);

    // Reapply filtering whenever entries, incomes, or filter values change
    useEffect(() => {
        handleFilter();
    }, [entries, incomes, filterYear, filterMonth, filterCategory]);

    // Function to filter costs and incomes based on user selection
    const handleFilter = () => {
        let filteredCosts = entries;
        let filteredIncomes = incomes;

        if (filterYear) {
            filteredCosts = filteredCosts.filter((entry) => new Date(entry.date).getFullYear() === parseInt(filterYear));
            filteredIncomes = filteredIncomes.filter((income) => new Date(income.date).getFullYear() === parseInt(filterYear));
        }

        if (filterMonth) {
            filteredCosts = filteredCosts.filter((entry) => new Date(entry.date).getMonth() + 1 === parseInt(filterMonth));
            filteredIncomes = filteredIncomes.filter((income) => new Date(income.date).getMonth() + 1 === parseInt(filterMonth));
        }

        if (filterCategory) {
            filteredCosts = filteredCosts.filter((entry) => entry.category === filterCategory);
        }

        setFilteredEntries(filteredCosts);
        setFilteredIncomes(filteredIncomes);
    };

    // Function to handle adding a new cost entry
    const handleAddCost = async (cost) => {
        try {
            await addNewCost(cost);
            const updatedCosts = await fetchAllCosts();
            setEntries(updatedCosts);
        } catch (error) {
            console.error("Error adding cost:", error);
        }
    };

    // Function to handle adding a new income entry
    const handleAddIncome = async (income) => {
        try {
            await addNewIncome(income);
            const updatedIncomes = await fetchAllIncomes();
            setIncomes(updatedIncomes);
        } catch (error) {
            console.error("Error adding income:", error);
        }
    };

    // Function to delete a cost entry
    const handleDeleteCost = async (id) => {
        try {
            await deleteCost(id);
            const updatedCosts = await fetchAllCosts();
            setEntries(updatedCosts);
        } catch (error) {
            console.error("Error deleting cost:", error);
        }
    };

    // Function to delete an income entry
    const handleDeleteIncome = async (id) => {
        try {
            await deleteIncome(id);
            const updatedIncomes = await fetchAllIncomes();
            setIncomes(updatedIncomes);
        } catch (error) {
            console.error("Error deleting income:", error);
        }
    };

    // Function to update an existing cost entry
    const handleUpdateCost = async (updatedCost) => {
        try {
            await updateCost(updatedCost.id, { ...updatedCost });
            const updatedCosts = await fetchAllCosts();
            setEntries([...updatedCosts]);
            setFilteredEntries(updatedCosts.filter(entry =>
                (!filterYear || new Date(entry.date).getFullYear() === parseInt(filterYear)) &&
                (!filterMonth || new Date(entry.date).getMonth() + 1 === parseInt(filterMonth)) &&
                (!filterCategory || entry.category === filterCategory)
            ));
        } catch (error) {
            console.error("Error updating cost:", error);
        }
    };

    // Function to update an existing income entry
    const handleUpdateIncome = async (updatedIncome) => {
        try {
            await updateIncome(updatedIncome.id, { ...updatedIncome });
            const updatedIncomes = await fetchAllIncomes();
            setIncomes([...updatedIncomes]);
            setFilteredIncomes(updatedIncomes.filter(income =>
                (!filterYear || new Date(income.date).getFullYear() === parseInt(filterYear)) &&
                (!filterMonth || new Date(income.date).getMonth() + 1 === parseInt(filterMonth))
            ));
        } catch (error) {
            console.error("Error updating income:", error);
        }
    };

    return (
        <div className="card">
            {/* Toggle button for switching between dark and light mode */}
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>

            {/* Application header */}
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                        <Typography variant="h4" color="inherit">
                            Cost Manager App
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Components for adding new cost and income entries */}
            <AddCostForm onAddCost={handleAddCost} />
            <AddIncomeForm onAddIncome={handleAddIncome} />

            {/* Filter controls for filtering cost and income entries */}
            <FilterControls filterYear={filterYear} setFilterYear={setFilterYear} filterMonth={filterMonth} setFilterMonth={setFilterMonth} filterCategory={filterCategory} setFilterCategory={setFilterCategory}/>

            {/* Tables displaying filtered cost and income entries */}
            <IncomeTable incomes={filteredIncomes} onDelete={handleDeleteIncome} onUpdate={handleUpdateIncome} />
            <ExpensesTable entries={filteredEntries} onDelete={handleDeleteCost} onUpdate={handleUpdateCost}/>

            {/* Pie chart for cost distribution */}
            <CategoryPieChart entries={filteredEntries} />

            {/* Button to open the monthly report modal */}
            <Button variant="contained" color="primary" onClick={() => setIsReportOpen(true)} style={{ marginTop: "20px" }}>
                Open Monthly Report
            </Button>

            {/* Net income report */}
            <NetIncomeReport entries={entries} incomes={incomes} />

            {/* Monthly report modal */}
            <Dialog open={isReportOpen} onClose={() => setIsReportOpen(false)} fullWidth maxWidth="md">
                <DialogTitle>Monthly Report</DialogTitle>
                <DialogContent>
                    <MonthlyReport entries={entries} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default function Root() {
    return (
        <ThemeProvider>
            <App />
        </ThemeProvider>
    );
}
