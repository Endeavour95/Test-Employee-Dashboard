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
    
    const [employeeToRegister, setEmployeeToRegister] = useState({
        empId: Number(props.employees[props.employees.length - 1].empId) + 1,
        empName: '',
        empSalary: '',
        empDesignation: '',
        empDept: ''
    })

    function createEmployeeToRegister(property, inputData) {
        setEmployeeToRegister((prevEmp) => {
            return {
                ...prevEmp,
                [property]: inputData,
            };
        });
    }


    function handleOnChange(property, dataToValidate) {
        switch (property) {
            case "empName":
                
                setEmployeeName(dataToValidate)

                // if (/^[A-Za-z\s]+$/.test(dataToValidate) || /^[A-Z][a-z]*(?:\s[A-Z][a-z]*)*$/.test(dataToValidate)) {
                //     // Split the input into individual words
                //     const words = dataToValidate.trim().split(/\s+/);

                //     // Capitalize the first letter of each word
                //     const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

                //     // Join the words back together with a space between them
                //     const formattedFullName = formattedWords.join(' ');

                //     console.log("formattedFullName", formattedFullName);

                //     setEmployeeName(formattedFullName);
                // } else if (/^\s+/.test(dataToValidate)) {
                //     setEmployeeName('')
                // } else {

                // }




                // if (/[A-Za-z]$/.test(dataToValidate) || /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)+$/.test(dataToValidate)) {
                //     // Split the input into individual words
                //     const words = dataToValidate.trim().split(/\s+/);

                //     // Capitalize the first letter of each word
                //     const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

                //     // Join the words back together with a space between them
                //     const formattedFullName = formattedWords.join(' ');

                //     console.log("formattedFullName", formattedFullName);

                //     setEmployeeName(formattedFullName)

                //     createEmployeeToRegister(property, employeeName)
                // } else if (/^[\s+/]/.test(dataToValidate)) {

                // } else {
                //     alert("Only alphabets are allowed")
                // }
                break;
            case "empSalary":
                if (Number(dataToValidate) && Number(dataToValidate) === 0) {

                } else if (Number(dataToValidate)) {
                    setEmployeeSalary(dataToValidate)
                } else if (dataToValidate[0] === '' && dataToValidate.length < 1) {
                    setEmployeeSalary(dataToValidate)
                }
                break;
            case "empDesignation":
                setEmployeeDesignation(dataToValidate)
                break;
            default:
                createEmployeeToRegister(property, dataToValidate)
                setSelectedDepartment(dataToValidate)
                break;
        }
    }


    function handleOnBlur(property, filteredDataToValidate) {
        switch (property) {
            case "empName":
                // setEmployeeName(filteredDataToValidate)
                createEmployeeToRegister(property, employeeName)
                break;
            case "empSalary":
                if (filteredDataToValidate.length > 0 && filteredDataToValidate.length < 5) {
                    alert("Salary should be at least 5 figures")
                    // setEmployeeSalary(filteredDataToValidate)
                } else {
                    createEmployeeToRegister(property, employeeSalary)
                }
                break;
            case "empDesignation":
                // setEmployeeDesignation(filteredDataToValidate)
                createEmployeeToRegister(property, employeeDesignation)
            default:
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
                                                    handleOnChange(property, e.target.value)
                                                    // createEmployeeToRegister(property, e.target.value)
                                                    // setSelectedDepartment(e.target.value)
                                                }}
                                                // style={{ cursor: 'pointer' }}
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
                                                onChange={(e) => {
                                                    console.log("oncjjafd", e.target.value)
                                                    handleOnChange(property, e.target.value.trimStart())
                                                }}
                                                onBlur={(e) => {
                                                    handleOnBlur(property, employeeInfo[index].trimEnd())
                                                }}
                                                // style={{ cursor: 'pointer' }}
                                                style={employeeToRegisterFlag ? { cursor: 'no-drop' } : { cursor: 'pointer' }}
                                            />
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                    {/* <tr>
                        <td>
                            <button onClick={() => {
                                props.setEmployess([...props.employees, employeeToRegister])
                                if (props.employees.findIndex(emp => emp.empId === employeeToRegister.empId)) {
                                    setEmployeeToRegister({})
                                    props.homeButton()
                                    alert("Employee Registered successfully");
                                }
                            }}>Submit</button>
                        </td>
                        <td>
                            <button onClick={() => {
                                setEmployeeToRegister({})
                                props.homeButton()
                            }} >Cancel</button>
                        </td>
                    </tr> */}
                    {
                        employeeToRegisterFlag ?
                            <tr>
                                <td>
                                    <button onClick={() => {
                                        props.setEmployess([...props.employees, employeeToRegister])
                                        if (props.employees.findIndex(emp => emp.empId === employeeToRegister.empId)) {
                                            setEmployeeToRegister({})
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
                                        setEmployeeToRegister({})
                                        props.homeButton()
                                        setEmployeeToRegisterFlag(false)
                                    }} >Cancel</button>
                                </td>
                            </tr>
                            :
                            <tr>
                                <td>
                                    <button onClick={() => {
                                        if (Object.values(employeeToRegister).includes('')) {
                                            alert("All fields required")
                                        } else {
                                            setEmployeeToRegisterFlag(true)
                                        }
                                    }}>Submit</button>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        setEmployeeToRegister({})
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



// employeeToRegisterFlag ?
//     <tr>
//         <td>
//             <button onClick={() => {
//                 props.setEmployess([...props.employees, employeeToRegister])
//                 if (props.employees.findIndex(emp => emp.empId === employeeToRegister.empId)) {
//                     setEmployeeToRegister({})
//                     props.homeButton()
//                     alert("Employee Registered successfully");
//                 }
//             }}>Confirm</button>
//             <button onClick={() => {
//                 setEmployeeToRegisterFlag(true)
//             }}>Edit</button>
//         </td>
//         <td>
//             <button onClick={() => {
//                 setEmployeeToRegister({})
//                 props.homeButton()
//                 setEmployeeToRegisterFlag(false)
//             }} >Cancel</button>
//         </td>
//     </tr>
//     :
//     <tr>
//         <td>
//             <button onClick={() => {
//                 setEmployeeToRegisterFlag(true)
//             }}>Submit</button>
//         </td>
//         <td>
//             <button onClick={() => {
//                 setEmployeeToRegister({})
//                 props.homeButton()
//                 setEmployeeToRegisterFlag(false)
//             }} >Cancel</button>
//         </td>
//     </tr>

export default EmployeeRegistrationForm;