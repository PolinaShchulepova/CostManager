import { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination, Button } from '@mui/material';

const EditableTable = ({ data, columns, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  // Handler for entering edit mode
  const handleEditClick = (row) => {
    setEditId(row.id);
    setEditData({ ...row });
  };

  // Handler for saving changes
  const handleSaveClick = () => {
    onUpdate(editData);
    setEditId(null);
    setEditData({});
  };

  // Handler for input changes with description length validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description' && value.length > 15) {
      alert('Description cannot exceed 15 characters.');
      return;
    }
    setEditData({ ...editData, [name]: value });
  };

  // Handler for changing pages
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the rows displayed on the current page
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.field}>{col.headerName}</TableCell>
          ))}
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {paginatedData.map((row) => (
          <TableRow key={row.id}>
            {editId === row.id
              ? columns.map((col) => (
                  <TableCell key={col.field}>
                    {col.type === 'select' ? (
                      <select
                        name={col.field}
                        value={editData[col.field]}
                        onChange={handleChange}
                      >
                        {col.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={col.type}
                        name={col.field}
                        value={editData[col.field]}
                        onChange={handleChange}
                      />
                    )}
                  </TableCell>
                ))
              : columns.map((col) => (
                  <TableCell key={col.field}>{row[col.field]}</TableCell>
                ))}
            <TableCell>
              {editId === row.id ? (
                <Button
                  onClick={handleSaveClick}
                  variant="contained"
                  color="success"
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => handleEditClick(row)}
                  variant="outlined"
                  color="secondary"
                >
                  Edit
                </Button>
              )}
              <Button
                onClick={() => onDelete(row.id)}
                variant="contained"
                color="primary"
                style={{ marginLeft: '10px' }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[]}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

EditableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      editable: PropTypes.bool,
      type: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default EditableTable;
