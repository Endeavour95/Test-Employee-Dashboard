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
