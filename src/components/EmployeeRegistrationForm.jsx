import { useState, useRef, useEffect } from "react";

function EmployeeRegistrationForm(props) {
    const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "];
    const properties = ["empName", "empSalary", "empDesignation", "empDept"];

    // const [err, setErr] = useState(false);
    const errors = {
        nameError: "Please enter Name",
        salaryError: "Salary should be between 5 to 7 figures",
        designationError: "Please enter Designation",
        departmentError: "Please select Department"
    };

    const [employeeToRegisterFlag, setEmployeeToRegisterFlag] = useState(false);

    const empNameRef = useRef(errors.nameError);
    const empSalaryRef = useRef(errors.salaryError);
    const empDesignationRef = useRef(errors.designationError);
    const empDepartmentRef = useRef(errors.departmentError);

    const employeeRefs = [empNameRef, empSalaryRef, empDesignationRef, empDepartmentRef];

    // useEffect(() => {
    //     if (props.addEmpFlag) {
    //         const focusRef = employeeRefs.find((ref, index) => props.addEmpFlag && properties.includes(properties[index]));
    //         if (focusRef) {
    //             focusRef.current.focus();
    //         }
    //     }
    // }, [props.addEmpFlag, employeeRefs, properties]);

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
                    // props.setEmployeeToRegister((prevInfo) => ({
                    //     ...prevInfo,
                    //     [property]: formattedName,
                    // }));
                    createEmployeeToRegister(property, formattedName);
                }
                break;
            case "empSalary":
                if (/^\d*\.?\d*$/.test(inputData) || inputData === "") {
                    // props.setEmployeeToRegister((prevInfo) => ({
                    //     ...prevInfo,
                    //     [property]: inputData,
                    // }));
                    createEmployeeToRegister(property, inputData);
                }
                break;
            default:
                // props.setEmployeeToRegister((prevInfo) => ({
                //     ...prevInfo,
                //     [property]: inputData,
                // }));
                createEmployeeToRegister(property, inputData);
                break;
        }
    }

    function handleOnBlur(property, inputData) {
        switch (property) {
            case "empName":
            case "empDesignation":
                if (inputData === '') {
                    // setErr(true);
                    property === "empName" ?
                        empNameRef.current.focus()
                        :
                        empDesignationRef.current.focus()
                    createEmployeeToRegister(property, inputData);
                } else {
                    const words = inputData.trim().split(/\s+/);

                    const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

                    const formattedName = formattedWords.join(" ");
                    // props.setEmployeeToRegister((prevInfo) => ({
                    //     ...prevInfo,
                    //     [property]: formattedName,
                    // }));
                    // setErr(false);
                    createEmployeeToRegister(property, formattedName);
                }
                break;
            case "empSalary":
                if (inputData.length > 7 || inputData.length < 5) {
                    // setErr(true);
                    empSalaryRef.current.focus();
                    createEmployeeToRegister(property, inputData);
                } else {
                    // setErr(false);
                    createEmployeeToRegister(property, inputData);
                }
                break;
            default:
                if (inputData === '') {
                    // setErr(true)
                    empDepartmentRef.current.focus();
                    createEmployeeToRegister(property, inputData);
                } else {
                    // setErr(false);
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
                                        ref={employeeRefs[index]}
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
                                        // ref={employeeRefs[index]}
                                        ref={(ref) => {
                                            if (property === "empName") empNameRef.current = ref;
                                            if (property === "empSalary") empSalaryRef.current = ref;
                                            if (property === "empDesignation") empDesignationRef.current = ref;
                                        }}
                                    />
                                }</td>
                            </tr>
                            // {
                            //     err ?
                            //         <tr key={employeeRefs[index]}>
                            //             <td></td>
                            //             <td>
                            //                 {/* <p style={{ color: "red", fontSize: "12px" }}>{
                            //                     property === "empName" ? employeeRefs[index].current :
                            //                         property === "empSalary" ? employeeRefs[index].current :
                            //                             employeeRefs[index].current
                            //                 }</p> */}
                            //                 <p style={{ color: "red", fontSize: "12px" }}>{
                            //                 employeeRefs[index].current
                            //             }</p>
                            //             </td>
                            //         </tr> :
                            //         <></>
                            // }
                        );
                    })}
                    {employeeToRegisterFlag ?
                        <tr>
                            <td>
                                <button
                                    onClick={() => {
                                        props.setEmployess([...props.employees, props.employeeToRegister]);
                                        if (props.employees.findIndex((emp) => emp.empId === props.employeeToRegister.empId)) {
                                            props.setEmployeeToRegister({})
                                            props.homeButton();
                                            alert("Employee Registered successfully");
                                            // setEmployeeToRegisterFlag(false);
                                        }
                                    }}
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => {
                                        setEmployeeToRegisterFlag(false);
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        props.setEmployeeToRegister({})
                                        props.homeButton();
                                        setEmployeeToRegisterFlag(false);
                                    }}
                                >
                                    Cancel
                                </button>
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