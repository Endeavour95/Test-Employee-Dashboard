import React from 'react';
import { AppBar, Button, Paper, Typography, Toolbar } from "@mui/material";

function addEmployeeButtonHandler(selectedEmployee, setSelectedEmployee, setAddEmpFlag) {
  if (Object.keys(selectedEmployee).length === 0) {
    setAddEmpFlag(true);
  } else {
    setSelectedEmployee({});
    setAddEmpFlag(true);
  }
}

const Header = (props) => {
  return (
    <Paper elevation={16}
      square={false}
      style={{ padding: '10px', marginBottom: '10px' }}>
      <Button variant="outlined" onClick={() => props.homeButton(true)}>
        Home
      </Button>
      <Button variant="outlined" onClick={() => addEmployeeButtonHandler(props.selectedEmployee, props.setSelectedEmployee, props.setAddEmpFlag)}>
        Add Employee
      </Button>
      <Typography
        variant="string"
        sx={{
          float: 'right',
        }}
      >
        {"Employees Registered " + props.employees.length}
      </Typography>
    </Paper>
  );
}

export default Header;