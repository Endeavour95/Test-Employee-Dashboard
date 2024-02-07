// import React from "react";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const DisplayAndEditButtons = (props) => {
  const handleSave = () => {
    editEmployee(
      props.employees,
      props.setEmployess,
      props.selectedEmployee,
      props.setSelectedEmployee,
      props.setEditFlag
    );
  };

  const handleConfirmDelete = () => {
    deleteEmployee(
      props.employees,
      props.setEmployess,
      props.selectedEmployee,
      props.setSelectedEmployee,
      props.setDelEmpFlag
    );
  };

  return (
    <>
      {props.editFlag ? (
        <TableRow>
          <TableCell>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </TableCell>
          <TableCell>
            <Button
              onClick={() => {
                props.setEditFlag(false);
              }}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </TableCell>
        </TableRow>
      ) : props.delEmpFlag ? (
        <TableRow>
          <TableCell>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="primary"
            >
              Confirm
            </Button>
          </TableCell>
          <TableCell>
            <Button
              onClick={() => {
                props.setDelEmpFlag(false);
              }}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell>
            <Button
              onClick={() => {
                props.setEditFlag(true);
              }}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </TableCell>
          <TableCell>
            <Button
              onClick={() => {
                props.setDelEmpFlag(true);
              }}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

function editEmployee(
  employees,
  setEmployess,
  selectedEmployee,
  setSelectedEmployee,
  setEditFlag
) {
  const index = employees.findIndex((emp) => emp.empId === selectedEmployee.empId);

  const updatedEmployees = [...employees];

  updatedEmployees[index] = selectedEmployee;

  setEmployess(updatedEmployees);

  setSelectedEmployee({});

  setEditFlag(false);
}

function deleteEmployee(
  employees,
  setEmployess,
  selectedEmployee,
  setSelectedEmployee,
  setDelEmpFlag
) {
  const updatedEmployees = employees.filter(
    (employee) => employee.empId !== selectedEmployee.empId
  );
  setEmployess(updatedEmployees);
  setSelectedEmployee({});
  setDelEmpFlag(false);
}

export default DisplayAndEditButtons;