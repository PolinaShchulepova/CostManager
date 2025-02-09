import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem, Typography } from '@mui/material';
import { months } from '../utils/consts.js';

/**
 * A component for displaying a monthly report of expenses.
 * The report allows filtering by year and month and calculates the total expenses for the selected period.
 */
const MonthlyReport = ({ entries }) => {
  // State variables for storing selected filters and filtered data
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filteredEntries, setFilteredEntries] = useState(entries);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Trigger filtering logic whenever entries, selectedYear, or selectedMonth change
  useEffect(() => {
    handleFilter();
  }, [entries, selectedYear, selectedMonth]);

  /**
   * Filters the entries based on the selected year and month.
   * Updates the filtered entries and calculates the total expenses.
   */
  const handleFilter = () => {
    let filtered = entries;

    // Filter by year if a year is selected
    if (selectedYear) {
      filtered = filtered.filter((entry) => {
        const entryYear = new Date(entry.date).getFullYear();
        return entryYear === parseInt(selectedYear, 10);
      });
    }

    // Filter by month if a month is selected
    if (selectedMonth) {
      filtered = filtered.filter((entry) => {
        const entryMonth = new Date(entry.date).getMonth() + 1;
        return entryMonth === parseInt(selectedMonth, 10);
      });
    }

    // Sort entries by date in descending order (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Ensure that the amount is always a number
    filtered = filtered.map((entry) => ({
      ...entry,
      amount: parseFloat(entry.amount)
    }));

    // Update state with the filtered entries and calculate total expenses
    setFilteredEntries(filtered);
    calculateTotalExpenses(filtered);
  };

  // Calculates the total expenses from the filtered entries
  const calculateTotalExpenses = (filteredEntries) => {
    const total = filteredEntries.reduce(
      (sum, entry) => sum + parseFloat(entry.amount || 0),
      0
    );
    setTotalExpenses(total);
  };

  return (
    <div>
      {/* Filter controls for selecting year and month */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="number"
          placeholder="Year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px' }}
        />
        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">All Months</MenuItem>
          {months.map((month) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </Select>
      </div>

      {/* Display total expenses */}
      <Typography variant="h6" style={{ marginBottom: '10px' }}>
        Total Expenses: {totalExpenses.toFixed(2)}
      </Typography>

      {/* Table to display filtered entries */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Date</strong>
            </TableCell>
            <TableCell>
              <strong>Category</strong>
            </TableCell>
            <TableCell>
              <strong>Amount</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
              <TableCell>{entry.category}</TableCell>
              <TableCell>{entry.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Define PropTypes for the component
MonthlyReport.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string,
      date: PropTypes.string.isRequired
    })
  ).isRequired
};

export default MonthlyReport;
