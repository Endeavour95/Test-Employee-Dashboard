import { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";

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
                if (inputData === '') {
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
                if (inputData === '') {
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
            <table id="details">
                <tbody>
                    {properties.map((property, index) => {
                        return (
                                <tr key={index}>
                                    <td>
                                        <label>{labels[index]}</label>
                                    </td>
                                    <td>{property === "empDept" ?
                                        <select
                                            id="myList"
                                            readOnly={employeeToRegisterFlag}
                                            onChange={(e) => { handleOnChange(property, e) }}
                                            onBlur={() => { handleOnBlur(property, props.employeeToRegister[property]) }}
                                            style={employeeToRegisterFlag ? { cursor: "no-drop" } : { cursor: "pointer" }}
                                            value={props.employeeToRegister[property]}
                                        >
                                            <option value="" hidden>Select Department</option>
                                            {props.departments.map((department) => {
                                                return (
                                                    <option key={department.deptId} value={department.deptId}>
                                                        {department.deptName}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        :
                                        <input
                                            type="text"
                                            readOnly={employeeToRegisterFlag}
                                            value={props.employeeToRegister[property]}
                                            autoFocus={props.addEmpFlag && property === "empName"}
                                            onChange={(e) => { handleOnChange(property, e) }}
                                            onBlur={() => { handleOnBlur(property, props.employeeToRegister[property]) }}
                                            style={employeeToRegisterFlag ? { cursor: "no-drop" } : { cursor: "pointer" }}
                                        />
                                    }</td>
                                </tr>
                        );
                    })}
                    {employeeToRegisterFlag ?
                        <tr>
                            <td>
                                <Button
                                    onClick={() => {
                                        props.setEmployess([...props.employees, props.employeeToRegister]);
                                        if (props.employees.findIndex((emp) => emp.empId === props.employeeToRegister.empId)) {
                                            props.setEmployeeToRegister({})
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
                            </td>
                            <td>
                                <Button
                                    onClick={() => {
                                        props.setEmployeeToRegister({})
                                        props.homeButton();
                                        setEmployeeToRegisterFlag(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </td>
                        </tr>
                        :
                        <tr>
                            <td>
                                <Button onClick={() => {
                                    if (Object.values(props.employeeToRegister).includes('')) {
                                        alert("All fields required")
                                    } else {
                                        setEmployeeToRegisterFlag(true)
                                    }
                                }}>Submit</Button>
                            </td>
                            <td>
                                <Button onClick={() => {
                                    props.setEmployeeToRegister({})
                                    props.homeButton()
                                    setEmployeeToRegisterFlag(false)
                                }} >Cancel</Button>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default EmployeeRegistrationForm;