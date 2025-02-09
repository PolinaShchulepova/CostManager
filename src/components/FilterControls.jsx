import PropTypes from 'prop-types';
import { months, categories } from '../utils/consts.js';

/**
 * A component that provides filter controls for year, month, and category.
 * Allows users to filter data based on these parameters.
 */
const FilterControls = ({
  filterYear,
  setFilterYear,
  filterMonth,
  setFilterMonth,
  filterCategory,
  setFilterCategory
}) => {
  return (
    <div className="filter-container">
      {/* Input for filtering by year */}
      <input
        type="number"
        placeholder="Year"
        value={filterYear}
        onChange={(e) => setFilterYear(e.target.value)} // Updates the state with the entered year
      />

      {/* Dropdown for filtering by month */}
      <select
        value={filterMonth}
        onChange={(e) => setFilterMonth(e.target.value)} // Updates the state with the selected month
      >
        <option value="">All Months</option>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>

      {/* Dropdown for filtering by category */}
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)} // Updates the state with the selected category
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

// PropTypes for component validation
FilterControls.propTypes = {
  filterYear: PropTypes.string.isRequired,
  setFilterYear: PropTypes.func.isRequired,
  filterMonth: PropTypes.string.isRequired,
  setFilterMonth: PropTypes.func.isRequired,
  filterCategory: PropTypes.string.isRequired,
  setFilterCategory: PropTypes.func.isRequired
};

export default FilterControls;
