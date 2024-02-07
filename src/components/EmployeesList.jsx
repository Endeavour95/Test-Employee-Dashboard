import React from 'react';
import { Table, TableBody, TableCell, TableRow, Paper, Typography, Button } from "@mui/material";

function List(props) {
    let employees = searchSortHandle(props.employees, props.sortOrder, props.searchText);

    return (
        <TableBody>
            {props.searchText ? (
                <TableRow>
                    <TableCell>
                        {employees.length > 0 ? (
                            <Typography style={{ fontFamily: "cursive" }}>{employees.length} Records found</Typography>
                        ) : (
                            <Typography style={{ color: "red", fontFamily: "cursive" }}>No Record found</Typography>
                        )}
                    </TableCell>
                </TableRow>
            ) : (
                <></>
            )}
            {employees.map((employee, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <Button
                            style={{
                                backgroundColor: props.selectedEmployee.empId === employee.empId ? "green" : "#4caf50",
                            }}
                            onClick={() => {
                                if (props.addEmpFlag === true) {
                                    if (props.addEmployeeAndSelectEmployeeHandler()) {
                                        props.setAddEmpFlag(false);
                                        props.setSelectedEmployee(employee);
                                    } else {
                                        alert("Please cancel button or submit the employess details");
                                    }
                                } else {
                                    props.setSelectedEmployee(employee);
                                }
                            }}
                        >
                            {employee.empName}
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

function EmployeesList(props) {
    return (
        <>
        {/* <Paper elevation={3}> */}
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6">Employees List</Typography>
                        </TableCell>
                    </TableRow>
                    <List
                        employees={props.employees}
                        selectedEmployee={props.selectedEmployee}
                        setSelectedEmployee={props.setSelectedEmployee}
                        addEmpFlag={props.addEmpFlag}
                        setAddEmpFlag={props.setAddEmpFlag}
                        searchText={props.searchText}
                        sortOrder={props.sortOrder}
                        addEmployeeAndSelectEmployeeHandler={props.addEmployeeAndSelectEmployeeHandler}
                    />
                </TableBody>
            </Table>
        {/* </Paper> */}
        </>
    );
}

export default EmployeesList;

function searchSortHandle(employees, sortOrder, searchText) {
    let dummyEmployees = [...employees];

    if (sortOrder && searchText) {
        if (sortOrder === "ASC" && searchText) {
            dummyEmployees = employees.filter((employee) =>
                employee.empName.toLowerCase().includes(searchText.toLowerCase())
            );
            dummyEmployees.sort((a, b) => a.empName.localeCompare(b.empName));
        } else if (sortOrder === "DESC" && searchText) {
            dummyEmployees = employees.filter((employee) =>
                employee.empName.toLowerCase().includes(searchText.toLowerCase())
            );
            dummyEmployees.sort((a, b) => b.empName.localeCompare(a.empName));
        }
    } else if (searchText) {
        dummyEmployees = employees.filter((employee) =>
            employee.empName.toLowerCase().includes(searchText.toLowerCase())
        );
    } else if (sortOrder) {
        if (sortOrder === "DESC") {
            dummyEmployees.sort((a, b) => b.empName.localeCompare(a.empName));
        }
        if (sortOrder === "ASC") {
            dummyEmployees.sort((a, b) => a.empName.localeCompare(b.empName));
        }
    }

    return dummyEmployees;
}