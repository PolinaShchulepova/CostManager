import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Select, MenuItem, Button } from "@mui/material";

const AddIncomeForm = ({ onAddIncome }) => {
    // State hooks for managing input fields
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form behavior

        // Validate required fields
        if (!amount || !category || !date) return; // Ensure amount, category, and date are provided

        // Create a new income object
        const newIncome = {
            amount: parseFloat(amount),
            category,
            description,
            date,
        };

        // Send the new income object to the parent component
        onAddIncome(newIncome);

        // Reset the form fields after submission
        setAmount("");
        setCategory("");
        setDescription("");
        setDate("");
        setError(""); // Clear the error message
    };

    // Handle changes in the description field with validation
    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= 15) {
            setDescription(value); // Update the description state
            setError(""); // Clear any error message
        } else {
            setError("Description cannot exceed 15 characters.");
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            {/* Title of the form */}
            <h2>Add Income</h2>

            {/* Input for the income amount */}
            <TextField
                label="Amount"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)} // Update state on change
                required // Mark as required field
            />

            {/* Dropdown for selecting the income category */}
            <Select
                value={category}
                fullWidth
                onChange={(e) => setCategory(e.target.value)} // Update state on change
                displayEmpty
                required
            >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="Monthly Salary">Monthly Salary</MenuItem>
                <MenuItem value="Other Income">Other Income</MenuItem>
            </Select>

            {/* Input for the income description */}
            <TextField
                label="Description"
                value={description}
                fullWidth
                onChange={handleDescriptionChange} // Update state on change with validation
                error={!!error}
                helperText={error}
            />

            {/* Input for the income date */}
            <TextField
                label="Date"
                type="date"
                value={date}
                fullWidth
                onChange={(e) => setDate(e.target.value)}
                required // Mark as required field
                InputLabelProps={{ shrink: true }} // Ensure the label shrinks when a date is selected
            />

            {/* Submit button */}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "20px" }}
            >
                Add Income
            </Button>
        </form>
    );
};

// Define prop types for the component
AddIncomeForm.propTypes = {
    onAddIncome: PropTypes.func.isRequired, // Callback to handle adding a new income
};

export default AddIncomeForm;
