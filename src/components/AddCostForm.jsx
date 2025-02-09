import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, MenuItem } from "@mui/material";
import { categories } from "../utils/consts.js"; // Importing predefined categories

const AddCostForm = ({ onAddCost }) => {
    const [amount, setAmount] = useState(""); // State to store the cost amount
    const [category, setCategory] = useState(""); // State to store the selected category
    const [description, setDescription] = useState(""); // State to store the description of the cost
    const [date, setDate] = useState(""); // State to store the date of the cost
    const [error, setError] = useState(""); // State to store the error message for description

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amount || !category || !date) {
            alert("Please fill in all required fields.");
            return;
        }

        const newCost = {
            amount: parseFloat(amount),
            category,
            description,
            date: new Date(date).toISOString().split("T")[0],
        };

        await onAddCost(newCost);

        setAmount("");
        setCategory("");
        setDescription("");
        setDate("");
        setError(""); // Clear the error after successful submission
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= 15) {
            setDescription(value);
            setError(""); // Clear the error if the length is valid
        } else {
            setError("Description cannot exceed 15 characters."); // Set the error if length exceeds
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Add an Expense</h2>
            <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                required
            />
            <TextField
                select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                required
            >
                {categories.map((cat, index) => (
                    <MenuItem key={index} value={cat}>
                        {cat}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
                error={!!error} // Highlight the input field if there's an error
                helperText={error} // Display the error message below the input
            />
            <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "20px" }}>
                Add Cost
            </Button>
        </form>
    );
};

AddCostForm.propTypes = {
    onAddCost: PropTypes.func.isRequired,
};

export default AddCostForm;
