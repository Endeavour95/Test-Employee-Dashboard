// import { useState } from "react";

// function EmployeeRegistrationForm(props) {
//     const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "]
//     const properties = ["empName", "empSalary", "empDesignation", "empDept"]

//     const [employeeName, setEmployeeName] = useState('')

//     const [employeeSalary, setEmployeeSalary] = useState('')

//     const [employeeDesignation, setEmployeeDesignation] = useState('')

//     const [selectedDepartment, setSelectedDepartment] = useState('')

//     const employeeInfo = [employeeName, employeeSalary, employeeDesignation, selectedDepartment]

//     const [employeeToRegisterFlag, setEmployeeToRegisterFlag] = useState(false)

//     function createEmployeeToRegister(property, inputData) {
//         console.log("createEmployeeToRegister", inputData)
//         props.setEmployeeToRegister((prevEmp) => {
//             return {
//                 ...prevEmp,
//                 [property]: inputData,
//             };
//         });
//     }

//     function handleOnChange(property, e) {
//         let inputData = e.target.value
//         switch (property) {
//             case "empName":
//             case "empDesignation":
//                 if (/^[a-zA-Z\s]*$/.test(inputData) || inputData === "") {
//                     const formattedName = inputData.replace(/\b\w/g, (c) => c.toUpperCase());
//                     property === "empName" ? setEmployeeName(formattedName) : setEmployeeDesignation(formattedName)
//                 }
//                 break;
//             case "empSalary":
//                 if (/^\d*\.?\d*$/.test(inputData) || inputData === "") {
//                     setEmployeeSalary(inputData);
//                 }
//                 break;
//             default:
//                 setSelectedDepartment(inputData)
//                 break;
//         }
//     }

//     function handleOnBlur(property, inputData) {
//         switch (property) {
//             case "empName":
//             case "empDesignation":
//                 const words = inputData.trim().split(/\s+/);

//                 const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

//                 const formattedName = formattedWords.join(' ')
//                 if (property === "empName") {
//                     setEmployeeName(formattedName)
//                     createEmployeeToRegister(property, employeeName)
//                 } else {
//                     setEmployeeDesignation(formattedName)
//                     createEmployeeToRegister(property, employeeDesignation)
//                 }
//                 break;
//             case "empSalary":
//                 if (inputData.length > 0 && inputData.length < 5) {
//                     alert("Salary should be at least 5 figures")
//                     setEmployeeSalary(inputData)
//                     createEmployeeToRegister(property, employeeSalary)
//                 } else if (inputData.length > 7) {
//                     alert("Salary should not be at more than 7 figures")
//                     setEmployeeSalary(inputData)
//                     createEmployeeToRegister(property, employeeSalary)
//                 } else {
//                     setEmployeeSalary(inputData)
//                     createEmployeeToRegister(property, employeeSalary)
//                 }
//                 break;
//             default:
//                 setSelectedDepartment(inputData)
//                 createEmployeeToRegister(property, selectedDepartment)
//                 break;
//         }
//     }

//     return (
//         <>
//             <div>
//                 <h3>Employee Registration</h3>
//             </div>
//             <table id="details">
//                 <tbody>
//                     {
//                         properties.map((property, index) => {
//                             if (property === "empDept") {
//                                 return (
//                                     <tr key={index}>
//                                         <td>
//                                             <label>{labels[index]}</label>
//                                         </td>
//                                         <td>
//                                             <select id="myList"
//                                                 disabled={employeeToRegisterFlag}
//                                                 onChange={(e) => {
//                                                     handleOnChange(property, e)
//                                                 }}
//                                                 onBlur={() => {
//                                                     handleOnBlur(property, employeeInfo[index])
//                                                 }}
//                                                 style={employeeToRegisterFlag ? { cursor: 'no-drop' } : { cursor: 'pointer' }}
//                                                 value={employeeInfo[index]}
//                                             >
//                                                 <option value="" hidden>Select Department</option>
//                                                 {
//                                                     props.departments.map((department) => {
//                                                         return (
//                                                             <option
//                                                                 key={department.deptId}
//                                                                 value={department.deptId}
//                                                             >
//                                                                 {department.deptName}
//                                                             </option>
//                                                         )
//                                                     })
//                                                 }
//                                             </select>
//                                         </td>
//                                     </tr>
//                                 )
//                             } else {
//                                 return (
//                                     <tr key={index}>
//                                         <td>
//                                             <label>{labels[index]}</label>
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 disabled={employeeToRegisterFlag}
//                                                 value={employeeInfo[index]}
//                                                 autoFocus={(props.addEmpFlag && property === "empName") ? true : false}
//                                                 onChange={(e) => {
//                                                     handleOnChange(property, e)
//                                                 }}
//                                                 onBlur={() => {
//                                                     handleOnBlur(property, employeeInfo[index])
//                                                 }}
//                                                 style={employeeToRegisterFlag ? { cursor: 'no-drop' } : { cursor: 'pointer' }}
//                                             />
//                                         </td>
//                                     </tr>
//                                 )
//                             }
//                         })
//                     }
//                     {
//                         employeeToRegisterFlag ?
//                             <tr>
//                                 <td>
//                                     <button onClick={() => {
//                                         props.setEmployess([...props.employees, props.employeeToRegister])
//                                         if (props.employees.findIndex(emp => emp.empId === props.employeeToRegister.empId)) {
//                                             props.setEmployeeToRegister({
//                                                 "empId": props.employees.length > 0 ? Number(props.employees[props.employees.length - 1].empId) + 1 : 1,
//                                                 "empName": '',
//                                                 "empSalary": '',
//                                                 "empDesignation": '',
//                                                 "empDept": ''
//                                             })
//                                             props.homeButton()
//                                             alert("Employee Registered successfully");
//                                         }
//                                     }}>Confirm</button>
//                                     <button onClick={() => {
//                                         setEmployeeToRegisterFlag(false)
//                                     }}>Edit</button>
//                                 </td>
//                                 <td>
//                                     <button onClick={() => {
//                                         props.setEmployeeToRegister({})
//                                         props.homeButton()
//                                         setEmployeeToRegisterFlag(false)
//                                     }} >Cancel</button>
//                                 </td>
//                             </tr>
//                             :
//                             <tr>
//                                 <td>
//                                     <button onClick={() => {
//                                         if (Object.values(props.employeeToRegister).includes('')) {
//                                             alert("All fields required")
//                                         } else {
//                                             setEmployeeToRegisterFlag(true)
//                                         }
//                                     }}>Submit</button>
//                                 </td>
//                                 <td>
//                                     <button onClick={() => {
//                                         props.setEmployeeToRegister({})
//                                         props.homeButton()
//                                         setEmployeeToRegisterFlag(false)
//                                     }} >Cancel</button>
//                                 </td>
//                             </tr>
//                     }
//                 </tbody>
//             </table>
//         </>
//     )
// }

// export default EmployeeRegistrationForm;


// import React, { useState, useRef, useEffect } from "react";

// function EmployeeRegistrationForm(props) {
//     const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "];
//     const properties = ["empName", "empSalary", "empDesignation", "empDept"];

//     const [err, setErr] = useState(false)
//     const errors = {
//         salaryError: "Salary should be between 5 to 7 figures"
//     }


//     const [employeeName, setEmployeeName] = useState("");
//     const [employeeSalary, setEmployeeSalary] = useState("");
//     const [employeeDesignation, setEmployeeDesignation] = useState("");
//     const [selectedDepartment, setSelectedDepartment] = useState("");
//     const [employeeToRegisterFlag, setEmployeeToRegisterFlag] = useState(false);

//     const employeeInfo = [employeeName, employeeSalary, employeeDesignation, selectedDepartment];

//     const empNameRef = useRef(null);
//     const empSalaryRef = useRef(null);
//     const empDesignationRef = useRef(null);

//     const employeeRefs = [empNameRef, empSalaryRef, empDesignationRef, '']

//     useEffect(() => {
//         if (props.addEmpFlag && properties.includes("empName")) {
//             empNameRef.current.focus();
//         } else if (props.addEmpFlag && properties.includes("empSalary")) {
//             empSalaryRef.current.focus();
//         } else if (props.addEmpFlag && properties.includes("empDesignation")) {
//             empDesignationRef.current.focus();
//         }
//     }, [props.addEmpFlag]);

//     function createEmployeeToRegister(property, inputData) {
//         console.log("createEmployeeToRegister", inputData);
//         props.setEmployeeToRegister((prevEmp) => {
//             return {
//                 ...prevEmp,
//                 [property]: inputData,
//             };
//         });
//     }

//     function handleOnChange(property, e) {
//         let inputData = e.target.value;
//         switch (property) {
//             case "empName":
//             case "empDesignation":
//                 if (/^[a-zA-Z\s]*$/.test(inputData) || inputData === "") {
//                     const formattedName = inputData.replace(/\b\w/g, (c) => c.toUpperCase());
//                     property === "empName" ? setEmployeeName(formattedName) : setEmployeeDesignation(formattedName);
//                 }
//                 break;
//             case "empSalary":
//                 if (/^\d*\.?\d*$/.test(inputData) || inputData === "") {
//                     setEmployeeSalary(inputData);
//                 }
//                 break;
//             default:
//                 setSelectedDepartment(inputData);
//                 break;
//         }
//     }

//     function handleOnBlur(property, inputData) {
//         switch (property) {
//             case "empName":
//             case "empDesignation":
//                 const words = inputData.trim().split(/\s+/);

//                 const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

//                 const formattedName = formattedWords.join(" ");
//                 if (property === "empName") {
//                     setEmployeeName(formattedName);
//                     createEmployeeToRegister(property, employeeName);
//                 } else {
//                     setEmployeeDesignation(formattedName);
//                     createEmployeeToRegister(property, employeeDesignation);
//                 }
//                 break;
//             case "empSalary":
//                 // if (inputData.length > 0 && inputData.length < 5) {
//                 //     console.log("Salary should be at least 5 figures");
//                 //     setEmployeeSalary(inputData);
//                 //     createEmployeeToRegister(property, employeeSalary);
//                 //     empSalaryRef.current.focus();
//                 //     break;
//                 // } else if (inputData.length > 7) {
//                 //     console.log("Salary should not be more than 7 figures");
//                 //     setEmployeeSalary(inputData);
//                 //     createEmployeeToRegister(property, employeeSalary);
//                 //     empSalaryRef.current.focus();
//                 //     break;
//                 if (inputData.length > 7 || inputData.length < 5) {
//                     // console.log("Salary should be between 5 to 7 figures");
//                     setEmployeeSalary(inputData);
//                     createEmployeeToRegister(property, employeeSalary);
//                     empSalaryRef.current.focus();
//                     setErr(true)
//                 } else {
//                     setEmployeeSalary(inputData);
//                     createEmployeeToRegister(property, employeeSalary);
//                     setErr(false)
//                 }
//                 break;
//             default:
//                 setSelectedDepartment(inputData);
//                 createEmployeeToRegister(property, selectedDepartment);
//                 break;
//         }
//     }

//     return (
//         <>
//             <div>
//                 <h3>Employee Registration</h3>
//             </div>
//             <table id="details">
//                 <tbody>
//                     {properties.map((property, index) => {
//                         if (property === "empDept") {
//                             return (
//                                 <tr key={index}>
//                                     <td>
//                                         <label>{labels[index]}</label>
//                                     </td>
//                                     <td>
//                                         <select
//                                             id="myList"
//                                             disabled={employeeToRegisterFlag}
//                                             onChange={(e) => {
//                                                 handleOnChange(property, e);
//                                             }}
//                                             onBlur={() => {
//                                                 handleOnBlur(property, employeeInfo[index]);
//                                             }}
//                                             style={employeeToRegisterFlag ? { cursor: "no-drop" } : { cursor: "pointer" }}
//                                             value={employeeInfo[index]}
//                                         >
//                                             <option value="" hidden>
//                                                 Select Department
//                                             </option>
//                                             {props.departments.map((department) => {
//                                                 return (
//                                                     <option key={department.deptId} value={department.deptId}>
//                                                         {department.deptName}
//                                                     </option>
//                                                 );
//                                             })}
//                                         </select>
//                                     </td>
//                                 </tr>
//                             );
//                         } else {
//                             return (
//                                 <>
//                                     <tr key={index}>
//                                         <td>
//                                             <label>{labels[index]}</label>
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 disabled={employeeToRegisterFlag}
//                                                 value={employeeInfo[index]}
//                                                 autoFocus={props.addEmpFlag && property === "empName"}
//                                                 onChange={(e) => {
//                                                     handleOnChange(property, e);
//                                                 }}
//                                                 onBlur={() => {
//                                                     handleOnBlur(property, employeeInfo[index]);
//                                                 }}
//                                                 style={employeeToRegisterFlag ? { cursor: "no-drop" } : { cursor: "pointer" }}
//                                                 ref={employeeRefs[index]}
//                                             // ref={(ref) => {
//                                             //     if (property === "empName") empNameRef.current = ref;
//                                             //     if (property === "empSalary") empSalaryRef.current = ref;
//                                             //     if (property === "empDesignation") empDesignationRef.current = ref;
//                                             // }}
//                                             />
//                                         </td>
//                                     </tr>
//                                     {err ?
//                                         <tr>
//                                             <td></td>
//                                             <td>
//                                                 <p style={{color: "red", fontSize : "12px"}}>{
//                                                     property === "empSalary" ? errors.salaryError : null
//                                                 }</p>
//                                             </td>
//                                         </tr> :
//                                         <></>
//                                     }
//                                 </>
//                             );
//                         }
//                     })}
//                     {employeeToRegisterFlag ?
//                         <tr>
//                             <td>
//                                 <button
//                                     onClick={() => {
//                                         props.setEmployess([...props.employees, props.employeeToRegister]);
//                                         if (props.employees.findIndex((emp) => emp.empId === props.employeeToRegister.empId)) {
//                                             props.setEmployeeToRegister({
//                                                 "empId": props.employees.length > 0 ? Number(props.employees[props.employees.length - 1].empId) + 1 : 1,
//                                                 "empName": "",
//                                                 "empSalary": "",
//                                                 "empDesignation": "",
//                                                 "empDept": "",
//                                             });
//                                             props.homeButton();
//                                             alert("Employee Registered successfully");
//                                         }
//                                     }}
//                                 >
//                                     Confirm
//                                 </button>
//                                 <button
//                                     onClick={() => {
//                                         setEmployeeToRegisterFlag(false);
//                                     }}
//                                 >
//                                     Edit
//                                 </button>
//                             </td>
//                             <td>
//                                 <button
//                                     onClick={() => {
//                                         props.setEmployeeToRegister({});
//                                         props.homeButton();
//                                         setEmployeeToRegisterFlag(false);
//                                     }}
//                                 >
//                                     Cancel
//                                 </button>
//                             </td>
//                         </tr>
//                         :
//                         <tr>
//                             <td>
//                                 <button onClick={() => {
//                                     if (Object.values(props.employeeToRegister).includes('')) {
//                                         alert("All fields required")
//                                     } else {
//                                         setEmployeeToRegisterFlag(true)
//                                     }
//                                 }}>Submit</button>
//                             </td>
//                             <td>
//                                 <button onClick={() => {
//                                     props.setEmployeeToRegister({})
//                                     props.homeButton()
//                                     setEmployeeToRegisterFlag(false)
//                                 }} >Cancel</button>
//                             </td>
//                         </tr>
//                     }
//                 </tbody>
//             </table>
//         </>
//     )
// }

// export default EmployeeRegistrationForm;







// // import { useState, useRef, useEffect } from "react";

// // function EmployeeRegistrationForm(props) {
// //     const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "];
// //     const properties = ["empName", "empSalary", "empDesignation", "empDept"];

// //     const [err, setErr] = useState(false)
// //     const errors = {
// //         salaryError: "Salary should be between 5 to 7 figures"
// //     }


// //     const [employeeName, setEmployeeName] = useState("");
// //     const [employeeSalary, setEmployeeSalary] = useState("");
// //     const [employeeDesignation, setEmployeeDesignation] = useState("");
// //     const [selectedDepartment, setSelectedDepartment] = useState("");
// //     const [employeeToRegisterFlag, setEmployeeToRegisterFlag] = useState(false);

// //     const employeeInfo = [employeeName, employeeSalary, employeeDesignation, selectedDepartment];

// //     const empNameRef = useRef(null);
// //     const empSalaryRef = useRef(null);
// //     const empDesignationRef = useRef(null);

// //     const employeeRefs = [empNameRef, empSalaryRef, empDesignationRef, '']

// //     useEffect(() => {
// //         if (props.addEmpFlag && properties.includes("empName")) {
// //             empNameRef.current.focus();
// //         } else if (props.addEmpFlag && properties.includes("empSalary")) {
// //             empSalaryRef.current.focus();
// //         } else if (props.addEmpFlag && properties.includes("empDesignation")) {
// //             empDesignationRef.current.focus();
// //         }
// //     }, [props.addEmpFlag]);

// //     function createEmployeeToRegister(property, inputData) {
// //         console.log("createEmployeeToRegister", inputData);
// //         props.setEmployeeToRegister((prevEmp) => {
// //             return {
// //                 ...prevEmp,
// //                 [property]: inputData,
// //             };
// //         });
// //     }

// //     function handleOnChange(property, e) {
// //         let inputData = e.target.value;
// //         switch (property) {
// //             case "empName":
// //             case "empDesignation":
// //                 if (/^[a-zA-Z\s]*$/.test(inputData) || inputData === "") {
// //                     const formattedName = inputData.replace(/\b\w/g, (c) => c.toUpperCase());
// //                     property === "empName" ? setEmployeeName(formattedName) : setEmployeeDesignation(formattedName);
// //                 }
// //                 break;
// //             case "empSalary":
// //                 if (/^\d*\.?\d*$/.test(inputData) || inputData === "") {
// //                     setEmployeeSalary(inputData);
// //                 }
// //                 break;
// //             default:
// //                 setSelectedDepartment(inputData);
// //                 break;
// //         }
// //     }

// //     function handleOnBlur(property, inputData) {
// //         switch (property) {
// //             case "empName":
// //             case "empDesignation":
// //                 const words = inputData.trim().split(/\s+/);

// //                 const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

// //                 const formattedName = formattedWords.join(" ");
// //                 if (property === "empName") {
// //                     setEmployeeName(formattedName);
// //                     createEmployeeToRegister(property, employeeName);
// //                 } else {
// //                     setEmployeeDesignation(formattedName);
// //                     createEmployeeToRegister(property, employeeDesignation);
// //                 }
// //                 break;
// //             case "empSalary":
// //                 // if (inputData.length > 0 && inputData.length < 5) {
// //                 //     console.log("Salary should be at least 5 figures");
// //                 //     setEmployeeSalary(inputData);
// //                 //     createEmployeeToRegister(property, employeeSalary);
// //                 //     empSalaryRef.current.focus();
// //                 //     break;
// //                 // } else if (inputData.length > 7) {
// //                 //     console.log("Salary should not be more than 7 figures");
// //                 //     setEmployeeSalary(inputData);
// //                 //     createEmployeeToRegister(property, employeeSalary);
// //                 //     empSalaryRef.current.focus();
// //                 //     break;
// //                 if (inputData.length > 7 || inputData.length < 5) {
// //                     // console.log("Salary should be between 5 to 7 figures");
// //                     setEmployeeSalary(inputData);
// //                     createEmployeeToRegister(property, employeeSalary);
// //                     empSalaryRef.current.focus();
// //                     setErr(true)
// //                 } else {
// //                     setEmployeeSalary(inputData);
// //                     createEmployeeToRegister(property, employeeSalary);
// //                     setErr(false)
// //                 }
// //                 break;
// //             default:
// //                 setSelectedDepartment(inputData);
// //                 createEmployeeToRegister(property, selectedDepartment);
// //                 break;
// //         }
// //     }


// import { useState, useRef, useEffect } from "react";

// function EmployeeRegistrationForm(props) {
//     const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "];
//     const properties = ["empName", "empSalary", "empDesignation", "empDept"];

//     const [err, setErr] = useState(false);
//     const errors = {
//         nameError: "Please enter Name",
//         salaryError: "Salary should be between 5 to 7 figures",
//         designationError: "Please enter Designation",
//         departmentError: "Please select Department"
//     };

//     const [employeeToRegisterFlag, setEmployeeToRegisterFlag] = useState(false);

//     const empNameRef = useRef(errors.nameError);
//     const empSalaryRef = useRef(errors.salaryError);
//     const empDesignationRef = useRef(errors.designationError);
//     const empDepartmentRef = useRef(errors.departmentError);

//     const employeeRefs = [empNameRef, empSalaryRef, empDesignationRef, empDepartmentRef];

//     // console.log("empDepartmentRef", empDepartmentRef.current)

//     // useEffect(() => {
//     //     if (props.addEmpFlag) {
//     //         const focusRef = employeeRefs.find((ref, index) => props.addEmpFlag && properties.includes(properties[index]));
//     //         if (focusRef) {
//     //             focusRef.current.focus();
//     //         }
//     //     }
//     // }, [props.addEmpFlag, employeeRefs, properties]);

//     function createEmployeeToRegister(property, inputData) {
//         props.setEmployeeToRegister((prevInfo) => ({
//             ...prevInfo,
//             [property]: inputData,
//         }));
//     }

//     function handleOnChange(property, e) {
//         let inputData = e.target.value;
//         switch (property) {
//             case "empName":
//             case "empDesignation":
//                 if (/^[a-zA-Z\s]*$/.test(inputData) || inputData === "") {
//                     const formattedName = inputData.replace(/\b\w/g, (c) => c.toUpperCase());
//                     // props.setEmployeeToRegister((prevInfo) => ({
//                     //     ...prevInfo,
//                     //     [property]: formattedName,
//                     // }));
//                     createEmployeeToRegister(property, formattedName);
//                 }
//                 break;
//             case "empSalary":
//                 if (/^\d*\.?\d*$/.test(inputData) || inputData === "") {
//                     // props.setEmployeeToRegister((prevInfo) => ({
//                     //     ...prevInfo,
//                     //     [property]: inputData,
//                     // }));
//                     createEmployeeToRegister(property, inputData);
//                 }
//                 break;
//             default:
//                 // props.setEmployeeToRegister((prevInfo) => ({
//                 //     ...prevInfo,
//                 //     [property]: inputData,
//                 // }));
//                 createEmployeeToRegister(property, inputData);
//                 break;
//         }
//     }

//     function handleOnBlur(property, inputData) {
//         switch (property) {
//             case "empName":
//             case "empDesignation":
//                 if (inputData === '') {
//                     // setErr(true);
//                     createEmployeeToRegister(property, inputData);
//                 } else {
//                     const words = inputData.trim().split(/\s+/);

//                     const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

//                     const formattedName = formattedWords.join(" ");
//                     // props.setEmployeeToRegister((prevInfo) => ({
//                     //     ...prevInfo,
//                     //     [property]: formattedName,
//                     // }));
//                     // setErr(false);
//                     createEmployeeToRegister(property, formattedName);
//                 }
//                 break;
//             case "empSalary":
//                 if (inputData.length > 7 || inputData.length < 5) {
//                     setErr(true);
//                     // reference.current.focus();
//                     empSalaryRef.current.focus();
//                     createEmployeeToRegister(property, inputData);
//                 } else {
//                     setErr(false);
//                     createEmployeeToRegister(property, inputData);
//                 }
//                 break;
//             default:
//                 if (inputData === '') {
//                     // setErr(true)
//                     createEmployeeToRegister(property, inputData);
//                 } else {
//                     // setErr(false);
//                     createEmployeeToRegister(property, inputData);
//                 }
//                 break;
//         }
//     }

//     return (
//         <>
//             <div>
//                 <h3>Employee Registration</h3>
//             </div>
//             <table id="details">
//                 <tbody>
//                     {properties.map((property, index) => {
//                         if (property === "empDept") {
//                             return (
//                                 <>
//                                     <tr key={index}>
//                                         <td>
//                                             <label>{labels[index]}</label>
//                                         </td>
//                                         <td>
//                                             <select
//                                                 id="myList"
//                                                 disabled={employeeToRegisterFlag}
//                                                 onChange={(e) => { handleOnChange(property, e) }}
//                                                 onBlur={() => { handleOnBlur(property, props.employeeToRegister[property]) }}
//                                                 style={employeeToRegisterFlag ? { cursor: "no-drop" } : { cursor: "pointer" }}
//                                                 value={props.employeeToRegister[property]}
//                                                 ref={employeeRefs[index]}
//                                             >
//                                                 <option value="" hidden>
//                                                     Select Department
//                                                 </option>
//                                                 {props.departments.map((department) => {
//                                                     return (
//                                                         <option key={department.deptId} value={department.deptId}>
//                                                             {department.deptName}
//                                                         </option>
//                                                     );
//                                                 })}
//                                             </select>
//                                         </td>
//                                     </tr>
//                                     {/* {err ?
//                                         <tr key={employeeRefs[index]}>
//                                             <td></td>
//                                             <td>
//                                                 <p style={{ color: "red", fontSize: "12px" }}>{
//                                                     employeeRefs[index].current
//                                                 }</p>
//                                             </td>
//                                         </tr> :
//                                         <></>
//                                     } */}
//                                 </>
//                             );
//                         } else {
//                             return (
//                                     <tr key={index}>
//                                         <td>
//                                             <label>{labels[index]}</label>
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 disabled={employeeToRegisterFlag}
//                                                 value={props.employeeToRegister[property]}
//                                                 autoFocus={props.addEmpFlag && property === "empName"}
//                                                 onChange={(e) => { handleOnChange(property, e) }}
//                                                 onBlur={() => { handleOnBlur(property, props.employeeToRegister[property]) }}
//                                                 style={employeeToRegisterFlag ? { cursor: "no-drop" } : { cursor: "pointer" }}
//                                                 ref={employeeRefs[index]}
//                                             // ref={(ref) => {
//                                             //     if (property === "empName") empNameRef.current = ref;
//                                             //     if (property === "empSalary") empSalaryRef.current = ref;
//                                             //     if (property === "empDesignation") empDesignationRef.current = ref;
//                                             // }}
//                                             />
//                                         </td>
//                                     </tr>
//                                     // {
//                                     //     err ?
//                                     //         <tr key={employeeRefs[index]}>
//                                     //             <td></td>
//                                     //             <td>
//                                     //                 <p style={{ color: "red", fontSize: "12px" }}>{
//                                     //                     property === "empName" ? employeeRefs[index].current :
//                                     //                         property === "empSalary" ? employeeRefs[index].current :
//                                     //                             employeeRefs[index].current
//                                     //                 }</p>
//                                     //                 {/* <p style={{ color: "red", fontSize: "12px" }}>{
//                                     //                 employeeRefs[index].current
//                                     //             }</p> */}
//                                     //             </td>
//                                     //         </tr> :
//                                     //         <></>
//                                     // }
//                             );
//                         }
//                     })}
//                     {employeeToRegisterFlag ?
//                         <tr>
//                             <td>
//                                 <button
//                                     onClick={() => {
//                                         props.setEmployess([...props.employees, props.employeeToRegister]);
//                                         if (props.employees.findIndex((emp) => emp.empId === props.employeeToRegister.empId)) {
//                                             props.setEmployeeToRegister({
//                                                 "empId": props.employees.length > 0 ? Number(props.employees[props.employees.length - 1].empId) + 1 : 1,
//                                                 "empName": "",
//                                                 "empSalary": "",
//                                                 "empDesignation": "",
//                                                 "empDept": "",
//                                             });
//                                             props.homeButton();
//                                             alert("Employee Registered successfully");
//                                         }
//                                     }}
//                                 >
//                                     Confirm
//                                 </button>
//                                 <button
//                                     onClick={() => {
//                                         setEmployeeToRegisterFlag(false);
//                                     }}
//                                 >
//                                     Edit
//                                 </button>
//                             </td>
//                             <td>
//                                 <button
//                                     onClick={() => {
//                                         props.setEmployeeToRegister({
//                                             "empId": props.employees.length > 0 ? Number(props.employees[props.employees.length - 1].empId) + 1 : 1,
//                                             "empName": "",
//                                             "empSalary": "",
//                                             "empDesignation": "",
//                                             "empDept": "",
//                                         });
//                                         props.homeButton();
//                                         setEmployeeToRegisterFlag(false);
//                                     }}
//                                 >
//                                     Cancel
//                                 </button>
//                             </td>
//                         </tr>
//                         :
//                         <tr>
//                             <td>
//                                 <button onClick={() => {
//                                     if (Object.values(props.employeeToRegister).includes('')) {
//                                         alert("All fields required")
//                                     } else {
//                                         setEmployeeToRegisterFlag(true)
//                                     }
//                                 }}>Submit</button>
//                             </td>
//                             <td>
//                                 <button onClick={() => {
//                                     props.setEmployeeToRegister({
//                                         "empId": props.employees.length > 0 ? Number(props.employees[props.employees.length - 1].empId) + 1 : 1,
//                                         "empName": "",
//                                         "empSalary": "",
//                                         "empDesignation": "",
//                                         "empDept": "",
//                                     })
//                                     props.homeButton()
//                                     setEmployeeToRegisterFlag(false)
//                                 }} >Cancel</button>
//                             </td>
//                         </tr>
//                     }
//                 </tbody>
//             </table>
//         </>
//     )
// }

// export default EmployeeRegistrationForm;




// /* Index page css */
// body {
//     font-family: 'Arial', sans-serif;
//     background-color: #f4f4f4;
//     display: grid;
//     height: fit-content;
//   }
  
//   #root {
//     width: 100vw;
//     height: fit-content;
//     border-radius: 20px;
//   }
  
//   /* Main navbar css */
//   #navdiv {
//     width: 100vw;
//     height: fit-content;
//     border-radius: 20px;
//     /* box-shadow: 0 0 10px rgb(98, 96, 96); */
//   }
  
//   nav input[type="button"], tr td button {
//     cursor: pointer;
//     font-size: 16px;
//     font-family: cursive;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     background-color: #4caf50;
//     color: #fff;
//     /* width: 15vw; */
//     width: fit-content;
//     height: 4vh;
//     border-radius: 20px;
//     margin: 5px 5px 5px 5px;;
//   }
  
//   nav input[type="button"]:hover {
//     background-color: #45a010;
//   }
  
//   /* Main lower div */
//   #downdiv {
//     width: 100vw;
//     height: fit-content;
//     border-radius: 20px;
//     display: flex;
//   }
  
  
//   table[id="list"] {
//     border-collapse: collapse;
//     width: 100%;
//     height: fit-content;
//     text-align: center;
//     border-radius: 20px;
//     /* box-shadow: 0 0 10px rgb(98, 96, 96); */
  
//   }
  
//   table[id="details"] {
//     /* display: flex; */
//     border-collapse: collapse;
//     /* width: 60vw; */
//     width: fit-content;
//     height: fit-content;
//     text-align: center;
//     /* justify-content: center; */
//     /* align-items: flex-start; */
//     border-radius: 20px;
//     box-shadow: 0 0 10px rgb(98, 96, 96);
//   }
  
//   th,h3 {
//     border-radius: 20px;
//     font-family: cursive;
//     font-size: large;
//     border-radius: 20px;
//     margin: 3px 0px 3px 0px;;
//     /* box-shadow: 0 0 10px rgb(98, 96, 96); */
//   }
  
//   td input[type="button"] {
//     cursor: pointer;
//     font-size: 16px;
//     font-family: cursive;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     background-color: #4caf50;
//     color: #fff;
//     width: 12vw;
//     height: 4vh;
//     border-radius: 20px;
//     margin: 3px 0px 3px 0px;
//   }
  
//   td input[type="button"]:hover {
//     background-color: "green";
//   }
  
//   #left {
//     width: 20vw;
//   }
  
//   #right {
//     width: 80vw;
//     text-align: center;
//   }
  
//   div[id="view"] {
//     display: flex;
//     justify-content: center;
//     width:'100%';
//     /* align-items: center; */
//   }
  
//   select#myDropdown {
//     width: calc(100% - 16px);
//     padding: 12px;
//     margin-bottom: 20px;
//     box-sizing: border-box;
//     border: 1px solid #ddd;
//     border-radius: 6px;
//     font-size: 16px;
//     transition: border-color 0.3s ease-in-out;
//   }
  
//   select#myDropdown:focus {
//     outline: none;
//     border-color: #66afe9;
//   }
  
//   td label {
//     /* width: calc(100% - 16px); */
//     /* justify-content: left; */
//     padding: 8px;
//     border-radius: 16px;
//     font-size: 14px;
//   }
  
//   td input[type="text"] {
//     /* width: calc(100% - 16px); */
//     width: fit-content;
//     padding: 8px;
//     margin-top: 8px;
//     margin-bottom: 8px;
//     box-sizing: border-box;
//     border: 1px solid #ccc;
//     border-radius: 16px;
//     font-size: 14px;
//   }
  
//   select {
//     color: rgb(136, 136, 141);
//     padding: 5px 15px;
//     border: none;
//     border-radius: 16px;
//     cursor: pointer;
//     border: 1px solid #ccc;
//   }
  
  