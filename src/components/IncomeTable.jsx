import PropTypes from 'prop-types';
import EditableTable from './EditableTable.jsx';

/**
 * A component for displaying and managing a table of income entries.
 * Allows sorting, editing, and deleting of income entries.
 */
const IncomeTable = ({ incomes, onDelete, onUpdate }) => {
  // Define the columns for the table, including their properties and editable options
  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      editable: true,
      type: 'select',
      options: ['Monthly Salary', 'Other Income']
    },
    {
      field: 'amount',
      headerName: 'Amount',
      editable: true,
      type: 'number'
    },
    {
      field: 'description',
      headerName: 'Description',
      editable: true,
      type: 'text'
    },
    {
      field: 'date',
      headerName: 'Date',
      editable: true,
      type: 'date'
    }
  ];

  // Sort the income entries by date in descending order (newest first)
  const sortedIncomes = [...incomes].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="formDiv">
      <h2>Income List</h2>
      {/* Pass the sorted data and columns to the EditableTable component */}
      <EditableTable
        columns={columns}
        data={sortedIncomes}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </div>
  );
};

// PropTypes for validation of props passed to the component
IncomeTable.propTypes = {
  incomes: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default IncomeTable;
