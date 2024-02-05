import { useState } from "react";

function EmployeeRegistrationForm(props) {
    const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "]
    const properties = ["empName", "empSalary", "empDesignation", "empDept"]

    const [employeeName, setEmployeeName] = useState('')

    const [employeeSalary, setEmployeeSalary] = useState('')

    const [employeeDesignation, setEmployeeDesignation] = useState('')

    const [selectedDepartment, setSelectedDepartment] = useState('')

    const employeeInfo = [employeeName, employeeSalary, employeeDesignation, selectedDepartment]

    const [employeeToRegisterFlag, setEmployeeToRegisterFlag] = useState(false)

    function createEmployeeToRegister(property, inputData) {
        console.log("createEmployeeToRegister", inputData)
        props.setEmployeeToRegister((prevEmp) => {
            return {
                ...prevEmp,
                [property]: inputData,
            };
        });
    }

    function handleOnChange(property, e) {
        switch (property) {
            case "empName":
                if (/^[a-zA-Z\s]*$/.test(e.target.value) || e.target.value === "") {
                    const formattedName = e.target.value.replace(/\b\w/g, (c) => c.toUpperCase());
                    setEmployeeName(formattedName);
                }
                break;
            case "empSalary":
                if (/^\d*\.?\d*$/.test(e.target.value) || e.target.value === "") {
                    setEmployeeSalary(e.target.value);
                }
                break;
            case "empDesignation":
                if (/^[a-zA-Z\s]*$/.test(e.target.value) || e.target.value === "") {
                    const designationName = e.target.value.replace(/\b\w/g, (c) => c.toUpperCase());
                    setEmployeeDesignation(designationName)
                }
                break;
            default:
                setSelectedDepartment(e.target.value)
                break;
        }
    }

    function handleOnBlur(property, inputData) {
        switch (property) {
            case "empName":
                const nameWords = inputData.trim().split(/\s+/);

                const formattedNameWords = nameWords.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

                const formattedFullName = formattedNameWords.join(' ')

                setEmployeeName(formattedFullName)
                createEmployeeToRegister(property, employeeName)
                break;
            case "empSalary":
                if (inputData.length > 0 && inputData.length < 5) {
                    alert("Salary should be at least 5 figures")
                    createEmployeeToRegister(property, employeeSalary)
                } else if (inputData.length > 7) {
                    alert("Salary should not be more than 7 figures")
                    createEmployeeToRegister(property, employeeSalary)
                } else {
                    createEmployeeToRegister(property, employeeSalary)
                }
                break;
            case "empDesignation":
                const designationWords = inputData.trim().split(/\s+/);

                const formattedDesignationWords = designationWords.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

                const formattedDesignation = formattedDesignationWords.join(' ')

                setEmployeeDesignation(formattedDesignation)
                createEmployeeToRegister(property, employeeDesignation)
                break;
            default:
                setSelectedDepartment(inputData)
                createEmployeeToRegister(property, selectedDepartment)
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
                    {
                        properties.map((property, index) => {
                            if (property === "empDept") {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <label>{labels[index]}</label>
                                        </td>
                                        <td>
                                            <select id="myList"
                                                disabled={employeeToRegisterFlag}
                                                onChange={(e) => {
                                                    handleOnChange(property, e)
                                                }}
                                                onBlur={() => {
                                                    handleOnBlur(property, employeeInfo[index])
                                                }}
                                                style={employeeToRegisterFlag ? { cursor: 'no-drop' } : { cursor: 'pointer' }}
                                                value={employeeInfo[index]}
                                            >
                                                <option value="" hidden>Select Department</option>
                                                {
                                                    props.departments.map((department) => {
                                                        return (
                                                            <option
                                                                key={department.deptId}
                                                                value={department.deptId}
                                                            >
                                                                {department.deptName}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <label>{labels[index]}</label>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                disabled={employeeToRegisterFlag}
                                                value={employeeInfo[index]}
                                                autoFocus={(props.addEmpFlag && property === "empName") ? true : false}
                                                onChange={(e) => {
                                                    handleOnChange(property, e)
                                                }}
                                                onBlur={() => {
                                                    handleOnBlur(property, employeeInfo[index])
                                                }}
                                                style={employeeToRegisterFlag ? { cursor: 'no-drop' } : { cursor: 'pointer' }}
                                            />
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                    {
                        employeeToRegisterFlag ?
                            <tr>
                                <td>
                                    <button onClick={() => {
                                        props.setEmployess([...props.employees, props.employeeToRegister])
                                        if (props.employees.findIndex(emp => emp.empId === props.employeeToRegister.empId)) {
                                            props.setEmployeeToRegister({
                                                empId: Number(props.employees[props.employees.length - 1].empId) + 1,
                                                empName: '',
                                                empSalary: '',
                                                empDesignation: '',
                                                empDept: ''
                                            })
                                            props.homeButton()
                                            alert("Employee Registered successfully");
                                        }
                                    }}>Confirm</button>
                                    <button onClick={() => {
                                        setEmployeeToRegisterFlag(false)
                                    }}>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        props.setEmployeeToRegister({})
                                        props.homeButton()
                                        setEmployeeToRegisterFlag(false)
                                    }} >Cancel</button>
                                </td>
                            </tr>
                            :
                            <tr>
                                <td>
                                    <button onClick={() => {
                                        if (Object.values(props.employeeToRegister).includes('')) {
                                            alert("All fields required")
                                        } else {
                                            setEmployeeToRegisterFlag(true)
                                        }
                                    }}>Submit</button>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        props.setEmployeeToRegister({})
                                        props.homeButton()
                                        setEmployeeToRegisterFlag(false)
                                    }} >Cancel</button>
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default EmployeeRegistrationForm;