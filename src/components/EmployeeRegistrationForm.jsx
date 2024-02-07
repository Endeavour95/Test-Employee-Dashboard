import { useState } from "react";
import { Button, Table, TableBody, TableCell, TableRow, Select, MenuItem, Input, InputLabel, FormControl } from "@mui/material";

function EmployeeRegistrationForm(props) {
  const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "];
  const properties = ["empName", "empSalary", "empDesignation", "empDept"];

  const [employeeToRegisterFlag, setEmployeeToRegisterFlag] = useState(false);

  function createEmployeeToRegister(property, inputData) {
    props.setEmployeeToRegister((prevInfo) => ({
      ...prevInfo,
      [property]: inputData,
    }));
  }

  function handleOnChange(property, e) {
    let inputData = e.target.value;
    switch (property) {
      case "empName":
      case "empDesignation":
        if (/^[a-zA-Z\s]*$/.test(inputData) || inputData === "") {
          const formattedName = inputData.replace(/\b\w/g, (c) => c.toUpperCase());
          createEmployeeToRegister(property, formattedName);
        }
        break;
      case "empSalary":
        if (/^\d*\.?\d*$/.test(inputData) || inputData === "") {
          createEmployeeToRegister(property, inputData);
        }
        break;
      default:
        createEmployeeToRegister(property, inputData);
        break;
    }
  }

  function handleOnBlur(property, inputData) {
    switch (property) {
      case "empName":
      case "empDesignation":
        if (inputData === "") {
          createEmployeeToRegister(property, inputData);
        } else {
          const words = inputData.trim().split(/\s+/);
          const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
          const formattedName = formattedWords.join(" ");
          createEmployeeToRegister(property, formattedName);
        }
        break;
      case "empSalary":
        if (inputData.length > 7 || inputData.length < 5) {
          createEmployeeToRegister(property, inputData);
        } else {
          createEmployeeToRegister(property, inputData);
        }
        break;
      default:
        if (inputData === "") {
          createEmployeeToRegister(property, inputData);
        } else {
          createEmployeeToRegister(property, inputData);
        }
        break;
    }
  }

  return (
    <>
      <div>
        <h3>Employee Registration</h3>
      </div>
      <Table id="details">
        <TableBody>
          {properties.map((property, index) => (
            <TableRow key={index}>
              <TableCell>
                <InputLabel>{labels[index]}</InputLabel>
              </TableCell>
              <TableCell>
                {property === "empDept" ? (
                  <FormControl fullWidth>
                    <Select
                      id="myList"
                      readOnly={employeeToRegisterFlag}
                      onChange={(e) => {
                        handleOnChange(property, e);
                      }}
                      onBlur={() => {
                        handleOnBlur(property, props.employeeToRegister[property]);
                      }}
                      style={employeeToRegisterFlag ? { cursor: "no-drop" } : { cursor: "pointer" }}
                      value={props.employeeToRegister[property]}
                    >
                      <MenuItem value="" hidden>
                        Select Department
                      </MenuItem>
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
                    readOnly={employeeToRegisterFlag}
                    value={props.employeeToRegister[property]}
                    autoFocus={props.addEmpFlag && property === "empName"}
                    onChange={(e) => {
                      handleOnChange(property, e);
                    }}
                    onBlur={() => {
                      handleOnBlur(property, props.employeeToRegister[property]);
                    }}
                    style={employeeToRegisterFlag ? { cursor: "no-drop" } : { cursor: "pointer" }}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
          {employeeToRegisterFlag ? (
            <TableRow>
              <TableCell>
                <Button
                  onClick={() => {
                    props.setEmployess([...props.employees, props.employeeToRegister]);
                    if (props.employees.findIndex((emp) => emp.empId === props.employeeToRegister.empId)) {
                      props.setEmployeeToRegister({});
                      props.homeButton();
                      alert("Employee Registered successfully");
                    }
                  }}
                >
                  Confirm
                </Button>
                <Button
                  onClick={() => {
                    setEmployeeToRegisterFlag(false);
                  }}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    props.setEmployeeToRegister({});
                    props.homeButton();
                    setEmployeeToRegisterFlag(false);
                  }}
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
                    if (Object.values(props.employeeToRegister).includes("")) {
                      alert("All fields required");
                    } else {
                      setEmployeeToRegisterFlag(true);
                    }
                  }}
                >
                  Submit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    props.setEmployeeToRegister({});
                    props.homeButton();
                    setEmployeeToRegisterFlag(false);
                  }}
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default EmployeeRegistrationForm;