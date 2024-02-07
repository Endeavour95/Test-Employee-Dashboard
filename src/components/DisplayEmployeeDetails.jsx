import React, { useState } from 'react';
import DisplayAndEditButtons from './DisplayAndEditButtons';
import { Typography, Table, TableBody, TableRow, TableCell, Select, MenuItem, Input, InputLabel, FormControl } from '@mui/material';

function DisplayEmployeeDetails(props) {
  const labels = ["Employee Id : ", "Full Name : ", "Salary : ", "Designation : ", "Department : "];

  const [delEmpFlag, setDelEmpFlag] = useState(false);

  function handleOnChange(e, property) {
    props.setSelectedEmployee((prevEmp) => ({
      ...prevEmp,
      [property]: e.target.value,
    }));
  }

  return (
    <>
      <div>
        <Typography variant="h5">Employee Details</Typography>
      </div>
      <Table id="details">
        <TableBody>
          {Object.keys(props.selectedEmployee).map((property, index) => (
            <TableRow key={property}>
              <TableCell>
                <InputLabel>{labels[index]}</InputLabel>
              </TableCell>
              <TableCell>
                {property === "empDept" ? (
                  <FormControl fullWidth>
                    <Select
                      id="myList"
                      onChange={(e) => {
                        handleOnChange(e, property);
                      }}
                      style={props.editFlag ? { cursor: 'pointer' } : { cursor: 'no-drop' }}
                      value={props.selectedEmployee.empDept}
                      readOnly={props.editFlag === false}
                    >
                      {props.departments.map((department) => (
                        <MenuItem key={department.deptId} value={department.deptId}>
                          {department.deptName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Input
                    type="text"
                    onChange={(e) => {
                      handleOnChange(e, property);
                    }}
                    value={props.selectedEmployee[property]}
                    style={props.editFlag ? { cursor: 'pointer' } : { cursor: 'no-drop' }}
                    readOnly={property === "empId" ? true : props.editFlag === false}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
          <DisplayAndEditButtons
            employees={props.employees}
            setEmployess={props.setEmployess}
            selectedEmployee={props.selectedEmployee}
            setSelectedEmployee={props.setSelectedEmployee}
            editFlag={props.editFlag}
            setEditFlag={props.setEditFlag}
            delEmpFlag={delEmpFlag}
            setDelEmpFlag={setDelEmpFlag}
          />
        </TableBody>
      </Table>
    </>
  );
}

export default DisplayEmployeeDetails;