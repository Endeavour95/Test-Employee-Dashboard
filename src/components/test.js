// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function DisplayEmployeeDetails(props) {
  const labels = ["Employee Id : ", "First Name : ", "Last Name : ", "Salary : ", "Designation : ", "Department : "]
  return (
    <table id="details">
      <tbody>
        {
          Object.keys(props.employee).map((key, index) => {
            if (key !== "") {
              if (key === "empDept") {
                // let dept = props.departments[props.employee[key]]
                return (
                  <tr>
                    <td>
                      <label>{labels[index]}</label>
                    </td>
                    <td>
                      <select id="myList" onchange="favTutorial()" value={props.departments[props.employee[key]].deptId} disabled={props.status}>
                        {/* <option defaultValue="" selected disabled hidden > {props.departments[props.employee[key]].deptName} </option> */}
                        <option value="1" > IT </option>
                        <option value="2" > HR </option>
                        <option value="3" > Engineering </option>
                      </select>
                    </td>
                  </tr>
                )
              }
              return (
                <tr>
                  <td>
                    <label>{labels[index]}</label>
                  </td>
                  <td>
                    <input type="text" value={props.employee[key]} disabled={props.status} />
                  </td>
                </tr>
              )
            }
          })
        }
        <tr>
          <td>
            <button >Edit</button>
          </td>
          <td>
            <button >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

// App() child
// const List = (props) => {
//   function setCss(empId) {
//     if (props.selectedEmployeeId === empId) {
//       return "yellowgreen"
//     } else {
//       return "#4caf50"
//     }
//   }

//   return (
//     <tbody>
//       {
//         Object.keys(props.clonedEmployess).map((empId) => {
//           return (
//             <tr><td><input key={empId} type="button" style={{ backgroundColor: setCss(empId) }}
//               value={props.clonedEmployess[empId].empFName + " " + props.clonedEmployess[empId].empLName}
//               onClick={() => { props.setEmpId(empId) }} ></input></td></tr>
//           )
//         })
//       }
//     </tbody>
//   )
// }

const List = (props) => {
  function setCss(empId) {
    if (props.selectedEmployeeId === empId) {
      return "yellowgreen"
    } else {
      return "#4caf50"
    }
  }

  return (
    <tbody>
      {
        Object.keys(props.clonedEmployessNamelist).map((empId) => {
          return (
            <tr><td><input key={empId} type="button" style={{ backgroundColor: setCss(empId) }}
              value={props.clonedEmployessNamelist[empId]}
              onClick={() => { props.setEmpId(empId) }} ></input></td></tr>
          )
        })
      }
    </tbody>
  )
}

// App() and DisplayEmployeeDetails() child
const NavBar = (props) => {
  return (
    <nav>
      {
        Object.keys(props.names).map((name) => {
          return (
            <input key={name} type="button" defaultValue={name} onClick={props.names[name]} />
          )
        })
      }
    </nav>
  )
}

function handleSearchEmployee(event, setClonedEmployessNamelist, employessNamelist) {
  if (event.target.value === "") {
    setClonedEmployessNamelist(employessNamelist)
  } else {
    let matchedEmployees = Object.keys(employessNamelist).filter(empId =>
      employessNamelist[empId].toLowerCase().includes(event.target.value.trim().toLowerCase())
    );

    let forclonedEmployessNamelist = {}

    matchedEmployees.map((empId) => {
      if (Object.keys(employessNamelist).includes(empId)) {
        forclonedEmployessNamelist[empId] = employessNamelist[empId]
      }
    })

    setClonedEmployessNamelist(forclonedEmployessNamelist)

    // console.log("matchedEmployees", matchedEmployees)
    // console.log("forclonedEmployessNamelist", forclonedEmployessNamelist)
  }
}

const Search = (props) => {
  return (
    <input placeholder='🔎︎ Search...' onInput={(e) => { handleSearchEmployee(e, props.setClonedEmployessNamelist, props.employessNamelist) }} />
  )
}

function sortEmployees(employees, event) {
  // console.log(event.target.value)

  // if (e.target.value == "ASC") {
  //   Object.keys.employees

  //   setClonedEmployess(employees)
  // }
  return true
}

function App() {
  const departments = {
    '1': {
      deptId: 1,
      deptName: "IT"
    },
    '2': {
      deptId: 2,
      deptName: "HR"
    },
    '3': {
      deptId: 3,
      deptName: "Engineering"
    }
  }

  let employees = {
    '1': {
      empId: 1,
      empFName: "Ashutosh",
      empLName: "Verulkar",
      empSalary: "20000",
      empDesignation: "Developer",
      empDept: departments[1]?.deptId
    },
    '2': {
      empId: 2,
      empFName: "Harshal",
      empLName: "Dhokane",
      empSalary: "37000",
      empDesignation: "Developer",
      empDept: departments[1]?.deptId
    },
    '3': {
      empId: 3,
      empFName: "Sanket",
      empLName: "Gupta",
      empSalary: "45000",
      empDesignation: "Data Engineer",
      empDept: departments[3]?.deptId
    }
  }

  const [empId, setEmpId] = useState('')

  // const [clonedEmployess, setClonedEmployess] = useState(employees)

  const employessNamelist = clonedEmployessNames(employees)

  const [clonedEmployessNamelist, setClonedEmployessNamelist] = useState(employessNamelist)

  function clonedEmployessNames(employees) {
    let emplist = {}
    Object.keys(employees).map((empId) => {
      emplist[empId] = employees[empId].empFName + " " + employees[empId].empLName
    })
    return emplist
  }


  

  return (
    <>
      <div id="navdiv">
        <NavBar names={{ "Home": App, "Add Employee": App }} />
      </div>
      <div id="downdiv">
        <div id="left">
          <div id='toolbar'>
            <Search setClonedEmployessNamelist={setClonedEmployessNamelist} employessNamelist={employessNamelist} />
            <select id="myList" value="ADD" onChange={(e) => sortEmployees(e, setClonedEmployessNamelist, employessNamelist)} >
              <option value="ADD" selected> Date Modified </option>
              <option value="ASC" > A to Z </option>
              <option value="DESC" > Z to A </option>
            </select>
          </div>
          <div>
            <table id="list">
              <thead>
                <tr>
                  <th>Employees List</th>
                </tr>
              </thead>
              {/* <List clonedEmployess={clonedEmployess} setEmpId={setEmpId} selectedEmployeeId={empId} /> */}
              <List clonedEmployessNamelist={clonedEmployessNamelist} setEmpId={setEmpId} selectedEmployeeId={empId} />
            </table>
          </div>
        </div>
        <div id="right">
          <div>
            <h3>Employee Details</h3>
          </div>
          <div id="view">{
            empId ? <DisplayEmployeeDetails employee={employees[empId]} departments={departments} status={true} /> : <p>Please select an employee to view details.</p>
          }
          </div>
        </div>
      </div>
    </>
  )
}

export default App;


// edit with useEffect
// import { useEffect, useState } from 'react';

// function DisplayEmployeeDetails(props) {
//     const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "]

//     const [newEmp, setnewEmp] = useState({})

//     useEffect(() => {
//         setnewEmp(props.selectedEmployee)
//     }, [props])

//     function handleOnChange(e, property) {
//         setnewEmp((prevEmp) => {
//             return {
//                 ...prevEmp,
//                 [property]: e.target.value,
//             };
//         });
//     }

//     // const [newEmp, setnewEmp] = useState(props.selectedEmployee)

//     // function handleOnChange(e, property) {
//     //     setnewEmp((prevEmp) => {
//     //         return {
//     //             ...prevEmp,
//     //             [property]: e.target.value,
//     //         };
//     //     });
//     // }

//     // function handleOnChange(e, property) {
//     //   let emp = { ...newEmp }
//     //   emp[property] = e.target.value
//     //   setnewEmp(emp)
//     //   console.log("handleOnChange newEmp", newEmp)
//     //   console.log("handleOnChange", emp)
//     // }


//     return (
//         <>
//             <div>
//                 <h3>Employee Details</h3>
//             </div>
//             <table id="details">
//                 <tbody>
//                     {
//                         Object.keys(newEmp).map((property, index) => {
//                             if (property === "empId") {
//                                 return (
//                                     <tr key={property}>
//                                         <td>
//                                             <label>{labels[index]}</label>
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 style={{ cursor: 'no-drop' }}
//                                                 value={newEmp[property]} disabled
//                                             />
//                                         </td>
//                                     </tr>
//                                 )
//                             } else if (property === "empDept") {
//                                 return (
//                                     <tr key={property}>
//                                         <td>
//                                             <label>{labels[index - 1]}</label>
//                                         </td>
//                                         <td>
//                                             <select
//                                                 id="myList"
//                                                 onChange={(e) => {
//                                                     handleOnChange(e, property)
//                                                 }}
//                                                 style={props.editFlag ? { cursor: 'pointer' } : { cursor: 'no-drop' }}
//                                                 value={newEmp.empDept} disabled={props.editFlag === false}
//                                             >
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
//                                     <tr key={property}>
//                                         <td>
//                                             <label>{labels[index - 1]}</label>
//                                         </td>
//                                         <td>
//                                             <input type="text" onChange={(e) => { handleOnChange(e, property) }} value={newEmp[property]} style={props.editFlag ? { cursor: 'pointer' } : { cursor: 'no-drop' }} disabled={props.editFlag === false} />
//                                         </td>
//                                     </tr>
//                                 )
//                             }
//                         })
//                     }
//                     <tr>
//                         <td>
//                             <button
//                                 onClick={() => {
//                                     props.setEditFlag(true);
//                                     // props.setEditFlag(editEmployee(newEmp, props.employees, props.setEmployess, props.setSelectedEmployee, props.setEditFlag))
//                                     editEmployee(newEmp, props.employees, props.setEmployess, props.setSelectedEmployee, props.setEditFlag)
//                                     // if (newEmp != props.setSelectedEmployee) {
//                                     //     setnewEmp({})
//                                     //     props.homeButton()
//                                     //     props.setEditFlag(false) 
//                                     //     alert("Employee details edited sucessfully")
//                                     // }
//                                 }}
//                             >
//                                 Edit
//                             </button>
//                         </td>
//                         <td>
//                             <button
//                                 onClick={() => { deleteEmployee(props.selectedEmployee, props.setSelectedEmployee, props.employees, props.setEmployess) }}
//                             >
//                                 Delete
//                             </button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </>
//     )
// }

// function editEmployee(employee, employees, setEmployess, setSelectedEmployee, setEditFlag) {
//     const index = employees.findIndex(emp => emp.empId === employee.empId);

//     const updatedEmployees = [...employees];

//     updatedEmployees[index] = employee;

//     setEmployess(updatedEmployees);
//     // return false
// }

// function deleteEmployee(selectedEmployee, setSelectedEmployee, employees, setEmployess) {
//     alert("You want to delete the employee")
//     const updatedEmployees = employees.filter(employee => employee.empId !== selectedEmployee.empId);
//     setEmployess(updatedEmployees);
//     setSelectedEmployee({});
// }

// export default DisplayEmployeeDetails;






// correctly working DisplayEmployeeDetails
// import { useEffect, useState } from 'react';

// function DisplayEmployeeDetails(props) {
//     const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "]

//     const [newEmp, setnewEmp] = useState({})

//     useEffect(() => {
//         setnewEmp(props.selectedEmployee)
//     }, [props])

//     // function handleOnChange(e, property) {
//     //   let emp = { ...newEmp }
//     //   emp[property] = e.target.value
//     //   setnewEmp(emp)
//     //   console.log("handleOnChange newEmp", newEmp)
//     //   console.log("handleOnChange", emp)
//     // }

//     function handleOnChange(e, property) {
//         setnewEmp((prevEmp) => {
//             return {
//                 ...prevEmp,
//                 [property]: e.target.value,
//             };
//         });
//     }

//     return (
//         <>
//             <div>
//                 <h3>Employee Details</h3>
//             </div>
//             <table id="details">
//                 <tbody>
//                     {
//                         Object.keys(newEmp).map((property, index) => {
//                             if (property === "empId") {
//                                 return (
//                                     <tr key={property}>
//                                         <td>
//                                             <label>{labels[index]}</label>
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 style={{ cursor: 'no-drop' }}
//                                                 value={newEmp[property]} disabled
//                                             />
//                                         </td>
//                                     </tr>
//                                 )
//                             } else if (property === "empDept") {
//                                 return (
//                                     <tr key={property}>
//                                         <td>
//                                             <label>{labels[index - 1]}</label>
//                                         </td>
//                                         <td>
//                                             <select
//                                                 id="myList"
//                                                 onChange={(e) => {
//                                                     handleOnChange(e, property)
//                                                 }}
//                                                 style={props.editFlag ? { cursor: 'pointer' } : { cursor: 'no-drop' }}
//                                                 value={newEmp.empDept} disabled={props.editFlag === false}
//                                             >
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
//                                     <tr key={property}>
//                                         <td>
//                                             <label>{labels[index - 1]}</label>
//                                         </td>
//                                         <td>
//                                             <input type="text" onChange={(e) => { handleOnChange(e, property) }} value={newEmp[property]} style={props.editFlag ? { cursor: 'pointer' } : { cursor: 'no-drop' }} disabled={props.editFlag === false} />
//                                         </td>
//                                     </tr>
//                                 )
//                             }
//                         })
//                     }
//                     <tr>
//                         <td>
//                             <button
//                                 onClick={() => { props.setEditFlag(true); 
//                                     editEmployee(newEmp, props.employees, props.setEmployess, props.setSelectedEmployee, props.setEditFlag) 
//                                 }}
//                             >
//                                 Edit
//                             </button>
//                         </td>
//                         <td>
//                             <button
//                                 onClick={() => { deleteEmployee(props.selectedEmployee, props.setSelectedEmployee, props.employees, props.setEmployess) }}
//                             >
//                                 Delete
//                             </button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </>
//     )
// }

// function editEmployee(employee, employees, setEmployess, setSelectedEmployee, setEditFlag) {
//     console.log("editEmployee", employee)

//     const index = employees.findIndex(emp => emp.empId === employee.empId);

//     const updatedEmployees = [...employees];

//     updatedEmployees[index] = employee;

//     setEmployess(updatedEmployees);

//     console.log("editEmployee", employees)

//     // alert("Employee details edited sucessfully")

//     // setSelectedEmployee('');
//     // setEditFlag(true);
// }

// function deleteEmployee(selectedEmployee, setSelectedEmployee, employees, setEmployess) {
//     alert("You want to delete the employee")
//     const updatedEmployees = employees.filter(employee => employee.empId !== selectedEmployee.empId);
//     setEmployess(updatedEmployees);
//     setSelectedEmployee({});
// }

// export default DisplayEmployeeDetails;



// Working employee registration Form

// import { useState } from "react";

// function EmployeeRegistrationForm(props) {
//     const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "]
//     const properties = ["empName", "empSalary", "empDesignation", "empDept"]

//     const [selectedDepartment, setSelectedDepartment] = useState('')

//     const [employeeName, setEmployeeName] = useState('')

//     const [employeeSalary, setEmployeeSalary] = useState('')

//     const [employeeDesignation, setEmployeeDesignation] = useState('')

//     // function validationForInputData(e, property) {
//     //   switch (property) {
//     //     case "empName":

//     //       break;
//     //     case "empSalary":

//     //       break;

//     //     case "empDesignation":

//     //       break;

//     //     default:
//     //       break;
//     //   }
//     // }


//     function correctionForInputData(e, property) {
//         switch (property) {
//             case "empName":
//                 // Split the input into individual words
//                 const words = e.target.value.trim().split(/\s+/);

//                 // Capitalize the first letter of each word
//                 const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

//                 // Join the words back together with a space between them
//                 const formattedFullName = formattedWords.join(' ');

//                 return formattedFullName;
//                 break;
//             case "empSalary":

//                 break;

//             case "empDesignation":

//                 break;

//             default:
//                 break;
//         }
//     }

//     const [employeeToRegister, setEmployeeToRegister] = useState({
//         empId: Number(props.employees[props.employees.length - 1].empId) + 1,
//         empName: '',
//         empSalary: '',
//         empDesignation: '',
//         empDept: ''
//     })

//     function handleOnChange(e, property) {
//         setEmployeeToRegister((prevEmp) => {
//             return {
//                 ...prevEmp,
//                 [property]: e.target.value,
//             };
//         });
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
//                                             <select id="myList" onChange={(e) => {
//                                                 handleOnChange(e, property)
//                                                 setSelectedDepartment(e.target.value)
//                                             }}
//                                                 style={{ cursor: 'pointer' }} value={selectedDepartment} required>
//                                                 <option value="" hidden>Select Department</option>
//                                                 {
//                                                     props.departments.map((department) => {
//                                                         return (
//                                                             <option key={department.deptId} value={department.deptId} >{department.deptName}</option>
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
//                                                 onChange={(e) => {
//                                                     handleOnChange(e, property)
//                                                 }}
//                                                 style={{ cursor: 'pointer' }} required
//                                             />
//                                         </td>
//                                     </tr>
//                                 )
//                             }
//                         })
//                     }
//                     <tr>
//                         <td>
//                             <button onClick={() => {
//                                 props.setEmployess([...props.employees, employeeToRegister])
//                                 if (props.employees.findIndex(emp => emp.empId === employeeToRegister.empId)) {
//                                     setEmployeeToRegister({})
//                                     props.homeButton()
//                                     alert("Employee Registered successfully");
//                                 }
//                             }}>Submit</button>
//                         </td>
//                         <td>
//                             <button onClick={() => {
//                                 setEmployeeToRegister({})
//                                 props.homeButton()
//                             }} >Cancel</button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </>
//     )
// }

// export default EmployeeRegistrationForm;


// employee registration version 2
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

//     const [employeeToRegister, setEmployeeToRegister] = useState({
//         empId: Number(props.employees[props.employees.length - 1].empId) + 1,
//         empName: '',
//         empSalary: '',
//         empDesignation: '',
//         empDept: ''
//     })

//     function createEmployeeToRegister(property, inputData) {
//         setEmployeeToRegister((prevEmp) => {
//             return {
//                 ...prevEmp,
//                 [property]: inputData,
//             };
//         });
//     }


//     function handleOnKeyUp(property, e) {
//         switch (e.key) {
//             case "Backspace":
//                 console.log("backsace")
//                 break;
//             case "Delete":
//                 console.log("deleter")
//                 break;
//             default:
//                 handleOnChange(property, e.target.value.trimStart())
//                 break;
//         }
//     }

//     function handleOnChange(property, dataToValidate) {
//         switch (property) {
//             case "empName":

//                 setEmployeeName(dataToValidate)

//                 // if (/^[A-Za-z\s]+$/.test(dataToValidate) || /^[A-Z][a-z]*(?:\s[A-Z][a-z]*)*$/.test(dataToValidate)) {
//                 //     // Split the input into individual words
//                 //     const words = dataToValidate.trim().split(/\s+/);

//                 //     // Capitalize the first letter of each word
//                 //     const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

//                 //     // Join the words back together with a space between them
//                 //     const formattedFullName = formattedWords.join(' ');

//                 //     console.log("formattedFullName", formattedFullName);

//                 //     setEmployeeName(formattedFullName);
//                 // } else if (/^\s+/.test(dataToValidate)) {
//                 //     setEmployeeName('')
//                 // } else {

//                 // }




//                 // if (/[A-Za-z]$/.test(dataToValidate) || /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)+$/.test(dataToValidate)) {
//                 //     // Split the input into individual words
//                 //     const words = dataToValidate.trim().split(/\s+/);

//                 //     // Capitalize the first letter of each word
//                 //     const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

//                 //     // Join the words back together with a space between them
//                 //     const formattedFullName = formattedWords.join(' ');

//                 //     console.log("formattedFullName", formattedFullName);

//                 //     setEmployeeName(formattedFullName)

//                 //     createEmployeeToRegister(property, employeeName)
//                 // } else if (/^[\s+/]/.test(dataToValidate)) {

//                 // } else {
//                 //     alert("Only alphabets are allowed")
//                 // }
//                 break;
//             case "empSalary":
//                 if (Number(dataToValidate) && Number(dataToValidate) === 0) {

//                 } else if (Number(dataToValidate)) {
//                     setEmployeeSalary(dataToValidate)
//                 } else if (dataToValidate[0] === '' && dataToValidate.length < 1) {
//                     setEmployeeSalary(dataToValidate)
//                 }
//                 break;
//             case "empDesignation":
//                 setEmployeeDesignation(dataToValidate)
//                 break;
//             default:
//                 createEmployeeToRegister(property, dataToValidate)
//                 setSelectedDepartment(dataToValidate)
//                 break;
//         }
//     }


//     function handleOnBlur(property, filteredDataToValidate) {
//         switch (property) {
//             case "empName":
//                 // setEmployeeName(filteredDataToValidate)
//                 createEmployeeToRegister(property, employeeName)
//                 break;
//             case "empSalary":
//                 if (filteredDataToValidate.length > 0 && filteredDataToValidate.length < 5) {
//                     alert("Salary should be at least 5 figures")
//                     // setEmployeeSalary(filteredDataToValidate)
//                 } else {
//                     createEmployeeToRegister(property, employeeSalary)
//                 }
//                 break;
//             case "empDesignation":
//                 // setEmployeeDesignation(filteredDataToValidate)
//                 createEmployeeToRegister(property, employeeDesignation)
//             default:
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
//                                                     handleOnChange(property, e.target.value)
//                                                     // createEmployeeToRegister(property, e.target.value)
//                                                     // setSelectedDepartment(e.target.value)
//                                                 }}
//                                                 // style={{ cursor: 'pointer' }}
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
//                                                 // value={employeeInfo[index]}
//                                                 onKeyUp={(e) => {
//                                                     handleOnKeyUp(property, e)
//                                                 }}
//                                                 // onChange={(e) => {
//                                                 //     console.log("oncjjafd", e.target.value)
//                                                 //     handleOnChange(property, e.target.value.trimStart())
//                                                 // }}
//                                                 onBlur={(e) => {
//                                                     handleOnBlur(property, employeeInfo[index].trimEnd())
//                                                 }}
//                                                 // style={{ cursor: 'pointer' }}
//                                                 style={employeeToRegisterFlag ? { cursor: 'no-drop' } : { cursor: 'pointer' }}
//                                             >
//                                                 {employeeInfo[index]}
//                                             </input>
//                                         </td>
//                                     </tr>
//                                 )
//                             }
//                         })
//                     }
//                     {/* <tr>
//                         <td>
//                             <button onClick={() => {
//                                 props.setEmployess([...props.employees, employeeToRegister])
//                                 if (props.employees.findIndex(emp => emp.empId === employeeToRegister.empId)) {
//                                     setEmployeeToRegister({})
//                                     props.homeButton()
//                                     alert("Employee Registered successfully");
//                                 }
//                             }}>Submit</button>
//                         </td>
//                         <td>
//                             <button onClick={() => {
//                                 setEmployeeToRegister({})
//                                 props.homeButton()
//                             }} >Cancel</button>
//                         </td>
//                     </tr> */}
//                     {
//                         employeeToRegisterFlag ?
//                             <tr>
//                                 <td>
//                                     <button onClick={() => {
//                                         props.setEmployess([...props.employees, employeeToRegister])
//                                         if (props.employees.findIndex(emp => emp.empId === employeeToRegister.empId)) {
//                                             setEmployeeToRegister({})
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
//                                         setEmployeeToRegister({})
//                                         props.homeButton()
//                                         setEmployeeToRegisterFlag(false)
//                                     }} >Cancel</button>
//                                 </td>
//                             </tr>
//                             :
//                             <tr>
//                                 <td>
//                                     <button onClick={() => {
//                                         if (Object.values(employeeToRegister).includes('')) {
//                                             alert("All fields required")
//                                         } else {
//                                             setEmployeeToRegisterFlag(true)
//                                         }
//                                     }}>Submit</button>
//                                 </td>
//                                 <td>
//                                     <button onClick={() => {
//                                         setEmployeeToRegister({})
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



// // employeeToRegisterFlag ?
// //     <tr>
// //         <td>
// //             <button onClick={() => {
// //                 props.setEmployess([...props.employees, employeeToRegister])
// //                 if (props.employees.findIndex(emp => emp.empId === employeeToRegister.empId)) {
// //                     setEmployeeToRegister({})
// //                     props.homeButton()
// //                     alert("Employee Registered successfully");
// //                 }
// //             }}>Confirm</button>
// //             <button onClick={() => {
// //                 setEmployeeToRegisterFlag(true)
// //             }}>Edit</button>
// //         </td>
// //         <td>
// //             <button onClick={() => {
// //                 setEmployeeToRegister({})
// //                 props.homeButton()
// //                 setEmployeeToRegisterFlag(false)
// //             }} >Cancel</button>
// //         </td>
// //     </tr>
// //     :
// //     <tr>
// //         <td>
// //             <button onClick={() => {
// //                 setEmployeeToRegisterFlag(true)
// //             }}>Submit</button>
// //         </td>
// //         <td>
// //             <button onClick={() => {
// //                 setEmployeeToRegister({})
// //                 props.homeButton()
// //                 setEmployeeToRegisterFlag(false)
// //             }} >Cancel</button>
// //         </td>
// //     </tr>

// export default EmployeeRegistrationForm;