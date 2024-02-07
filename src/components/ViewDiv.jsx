import React from 'react';
import { Paper, Typography } from "@mui/material";
import EmployeeRegistrationForm from "./EmployeeRegistrationForm";
import DisplayEmployeeDetails from "./DisplayEmployeeDetails";

const ViewDiv = (props) => {
    return (
        <>
            {/* <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px' }}> */}
                {
                    (Object.keys(props.selectedEmployee).length === 0 && props.addEmpFlag === false) ?
                        <Typography variant="body1">Please select an employee to view details.</Typography> :
                        (props.addEmpFlag === true) ?
                            <EmployeeRegistrationForm
                                employees={props.employees}
                                setEmployess={props.setEmployess}
                                departments={props.departments}
                                employeeToRegister={props.employeeToRegister}
                                setEmployeeToRegister={props.setEmployeeToRegister}
                                addEmpFlag={props.addEmpFlag}
                                homeButton={props.homeButton}
                            />
                            :
                            (Object.keys(props.selectedEmployee).length >= 1) ?
                                <DisplayEmployeeDetails
                                    employees={props.employees}
                                    setEmployess={props.setEmployess}
                                    departments={props.departments}
                                    selectedEmployee={props.selectedEmployee}
                                    setSelectedEmployee={props.setSelectedEmployee}
                                    editFlag={props.editFlag}
                                    setEditFlag={props.setEditFlag}
                                    homeButton={props.homeButton}
                                />
                                :
                                null
                }
            {/* </Paper> */}
        </>
    );
}

export default ViewDiv;