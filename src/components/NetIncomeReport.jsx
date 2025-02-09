import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * A component that calculates and displays the net income report.
 * It provides both total income/expenses for all time and up to the current month of the current year.
 */
const NetIncomeReport = ({ entries, incomes }) => {
  // State variables for storing income, expenses, and net income calculations
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalIncomeUntilNow, setTotalIncomeUntilNow] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalExpensesUntilNow, setTotalExpensesUntilNow] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  const [netIncomeUntilNow, setNetIncomeUntilNow] = useState(0);

  // Effect hook to recalculate income and expenses when data changes
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JS months start from 0

    // Calculate **Total Income (All Time)**
    const totalIncomeAmount = incomes.reduce(
      (sum, income) => sum + parseFloat(income.amount || 0),
      0
    );
    setTotalIncome(totalIncomeAmount);

    // Calculate **Total Income (Until Current Month)**
    const totalIncomeAmountUntilNow = incomes
      .filter((income) => {
        const incomeDate = new Date(income.date);
        return (
          incomeDate.getFullYear() === currentYear &&
          incomeDate.getMonth() + 1 <= currentMonth
        );
      })
      .reduce((sum, income) => sum + parseFloat(income.amount || 0), 0);
    setTotalIncomeUntilNow(totalIncomeAmountUntilNow);

    // Calculate **Total Expenses (All Time)**
    const totalExpenseAmount = entries.reduce(
      (sum, cost) => sum + parseFloat(cost.amount || 0),
      0
    );
    setTotalExpenses(totalExpenseAmount);

    // Calculate **Total Expenses (Until Current Month)**
    const totalExpenseAmountUntilNow = entries
      .filter((cost) => {
        const costDate = new Date(cost.date);
        return (
          costDate.getFullYear() === currentYear &&
          costDate.getMonth() + 1 <= currentMonth
        );
      })
      .reduce((sum, cost) => sum + parseFloat(cost.amount || 0), 0);
    setTotalExpensesUntilNow(totalExpenseAmountUntilNow);

    // Calculate **Net Income (All Time)**
    setNetIncome(totalIncomeAmount - totalExpenseAmount);

    // Calculate **Net Income (Until Current Month)**
    setNetIncomeUntilNow(
      totalIncomeAmountUntilNow - totalExpenseAmountUntilNow
    );
  }, [entries, incomes]); // Recalculate whenever income or expense data changes

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '20px'
      }}
    >
      {/* Right Card – Calculations for All Time */}
      <div
        className="card"
        style={{ width: '45%', padding: '20px', textAlign: 'center' }}
      >
        <h2>Total Income & Expenses (All Time)</h2>
        <p>
          <strong>Total Income:</strong> {totalIncome.toFixed(2)}
        </p>
        <p>
          <strong>Total Expenses:</strong> {totalExpenses.toFixed(2)}
        </p>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '18px',
            color: netIncome >= 0 ? 'green' : 'red'
          }}
        >
          <strong>Net Income:</strong> {netIncome.toFixed(2)}
        </p>
      </div>

      {/* Left Card – Calculations Until the Current Month */}
      <div
        className="card"
        style={{ width: '45%', padding: '20px', textAlign: 'center' }}
      >
        <h2>Current Year Income Report (Until Current Month)</h2>
        <p>
          <strong>Total Income (Until Now):</strong>{' '}
          {totalIncomeUntilNow.toFixed(2)}
        </p>
        <p>
          <strong>Total Expenses (Until Now):</strong>{' '}
          {totalExpensesUntilNow.toFixed(2)}
        </p>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '18px',
            color: netIncomeUntilNow >= 0 ? 'green' : 'red'
          }}
        >
          <strong>Net Income (Until Now):</strong>{' '}
          {netIncomeUntilNow.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

// Define PropTypes for the component
NetIncomeReport.propTypes = {
  entries: PropTypes.array.isRequired,
  incomes: PropTypes.array.isRequired
};

export default NetIncomeReport;
