import './App.css';
import { useEffect, useState } from 'react';

function DisplayEmployeeDetails(props) {
  const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "]

  const [newEmp, setnewEmp] = useState({})

  useEffect(() => {
    setnewEmp(props.selectedEmployee)
  }, [props])

  // function handleOnChange(e, property) {
  //   let emp = { ...newEmp }
  //   emp[property] = e.target.value
  //   setnewEmp(emp)
  //   console.log("handleOnChange newEmp", newEmp)
  //   console.log("handleOnChange", emp)
  // }

  function handleOnChange(e, property) {
    setnewEmp((prevEmp) => {
      return {
        ...prevEmp,
        [property]: e.target.value,
      };
    });
    console.log("handleOnChange newEmp", newEmp);
    console.log("handleOnChange", newEmp);
  }

  return (
    <table id="details">
      <tbody>
        {
          Object.keys(newEmp).map((property, index) => {
            if (property === "empId") {
              return (
                <tr key={property}>
                  <td>
                    <label>{labels[index]}</label>
                  </td>
                  <td>
                    <input type="text" style={{ cursor: 'no-drop' }} value={newEmp[property]} disabled />
                  </td>
                </tr>
              )
            } else if (property === "empDept") {
              return (
                <tr key={property}>
                  <td>
                    <label>{labels[index - 1]}</label>
                  </td>
                  <td>
                    <select id="myList" onChange={(e) => {
                      handleOnChange(e, property)
                    }} style={props.editFlag ? { cursor: 'no-drop' } : { cursor: 'pointer' }} value={newEmp.empDept} disabled={props.editFlag}>
                      {
                        props.departments.map((department) => {
                          return (
                            <option key={department.deptId} value={department.deptId} >{department.deptName}</option>
                          )
                        })
                      }
                    </select>
                  </td>
                </tr>
              )
            } else {
              return (
                <tr key={property}>
                  <td>
                    <label>{labels[index - 1]}</label>
                  </td>
                  <td>
                    <input type="text" onChange={(e) => { handleOnChange(e, property) }} value={newEmp[property]} style={props.editFlag ? { cursor: 'no-drop' } : { cursor: 'pointer' }} disabled={props.editFlag} />
                  </td>
                </tr>
              )
            }
          })
        }
        <tr>
          <td>
            <button onClick={() => { props.setEditFlag(false); editEmployee(newEmp, props.employees, props.setEmployess, props.setSelectedEmployee, props.setEditFlag) }} >Edit</button>
          </td>
          <td>
            <button onClick={() => { deleteEmployee(props.selectedEmployee, props.setSelectedEmployee, props.employees, props.setEmployess) }}>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

function editEmployee(employee, employees, setEmployess, setSelectedEmployee, setEditFlag) {
  console.log("editEmployee", employee)


  const index = employees.findIndex(emp => emp.empId === employee.empId);

  const updatedEmployees = [...employees];

  updatedEmployees[index] = employee;

  setEmployess(updatedEmployees);

  console.log("editEmployee", employees)

  alert("Employee details edited sucessfully")

  // setSelectedEmployee('');
  // setEditFlag(true);
}

function deleteEmployee(selectedEmployee, setSelectedEmployee, employees, setEmployess) {
  alert("You want to delete the employee")
  const updatedEmployees = employees.filter(employee => employee.empId !== selectedEmployee.empId);
  setEmployess(updatedEmployees);
  setSelectedEmployee('');
}

function EmployeeRegistrationForm(props) {
  const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "]
  const properties = ["empName", "empSalary", "empDesignation", "empDept"]

  const [selectedDepartment, setSelectedDepartment] = useState('')

  let employee = {
    "empId": Number(props.employees[props.employees.length - 1].empId) + 1
  }

  const [newEmp, setnewEmp] = useState({})

  function handleOnChange(e, property) {
    if (property === "empDept") {
      employee = { ...employee, [property]: e.target.value }
      console.log("handleOnChange", employee)
      setnewEmp(employee)
    } else {
      employee = { ...employee, [property]: e.target.value }
    }
  }


  // function validate(e, property) {
  //   switch (property) {
  //     case "empName":

  //       break;
  //     case "empSalary":

  //       break;

  //     case "empDesignation":

  //       break;

  //     default:
  //       break;
  //   }
  // }


  // const [newEmp, setnewEmp] = useState({
  //   "empId": Number(props.employees[props.employees.length - 1].empId) + 1
  // })

  // function handleOnChange(e, property) {
  //   setnewEmp((prevEmp) => {
  //     return {
  //       ...prevEmp,
  //       [property]: e.target.value,
  //     };
  //   });
  //   console.log("handleOnChange", newEmp)
  // }

  return (
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
                    <select id="myList" onChange={(e) => {
                      handleOnChange(e, property)
                      setSelectedDepartment(e.target.value)
                    }}
                      style={{ cursor: 'pointer' }} value={selectedDepartment} required>
                      <option value="" disabled hidden>Select Department</option>
                      {
                        props.departments.map((department) => {
                          return (
                            <option key={department.deptId} value={department.deptId} >{department.deptName}</option>
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
                    <input type="text" onChange={(e) => {
                      // if (validate(e, property)) {
                      //   handleOnChange(e, property)
                      // }
                      handleOnChange(e, property)
                    }} style={{ cursor: 'pointer' }} required />
                  </td>
                </tr>
              )
            }
          })
        }
        <tr>
          <td>
            <button onClick={() => {
              props.setEmployess([...props.employees, newEmp])
            }}>Submit</button>
          </td>
          <td>
            <button onClick={() => {
              setnewEmp({})
              props.homeButton()
              console.log("cancel", newEmp)
            }} >Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

function searchSortHandle(employees, sortOrder, searchText) {
  let dummyEmployees = [...employees]

  if (sortOrder && searchText) {
    if (sortOrder === "ASC" && searchText) {
      dummyEmployees = employees.filter(employee =>
        employee.empName.toLowerCase().includes(searchText.toLowerCase()));
      dummyEmployees.sort((a, b) => a.empName.localeCompare(b.empName));
    } else
      if (sortOrder === "DESC" && searchText) {
        dummyEmployees = employees.filter(employee =>
          employee.empName.toLowerCase().includes(searchText.toLowerCase()));
        dummyEmployees.sort((a, b) => b.empName.localeCompare(a.empName));
      }
  } else
    if (searchText) {
      dummyEmployees = employees.filter(employee =>
        employee.empName.toLowerCase().includes(searchText.toLowerCase()));
    } else
      if (sortOrder) {
        if (sortOrder === "DESC") {
          dummyEmployees.sort((a, b) => b.empName.localeCompare(a.empName));
        }
        if (sortOrder === "ASC") {
          dummyEmployees.sort((a, b) => a.empName.localeCompare(b.empName));
        }
      }

  return dummyEmployees
}

const List = (props) => {
  let employees = searchSortHandle(props.employees, props.sortOrder, props.searchText)

  return (
    <tbody>
      {
        employees.map((employee, index) => {
          return (
            <tr key={index}><td><input type="button" style={props.selectedEmployee.empId === employee.empId ? { backgroundColor: "green" } : { backgroundColor: "#4caf50" }}
              value={employee.empName}
              onClick={() => {
                // if (props.addEmpFlag === true) {
                //   props.setAddEmpFlag(false)
                // }
                props.setSelectedEmployee(employee)
              }} ></input></td></tr>
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
        props.names.map((name, index) => {
          return (
            <input key={name.val} type="button" value={name.val} onClick={() => name.func(true)} />
          )
        })
      }
    </nav>
  )
}


const Search = (props) => {
  return (
    <input placeholder='🔎︎ Search ...' onInput={(e) => { props.setSearchText(e.target.value) }} />
  )
}

const Sort = (props) => {
  return (
    <select id="myList" value={props.sortOrder} onChange={(e) => { props.setSortOrder(e.target.value) }} >
      <option value="" > Date Modified </option>
      <option value="ASC" > A to Z </option>
      <option value="DESC" > Z to A </option>
    </select>
  )
}

const EmployeesDashboard = () => {
  const [departments, setDepartments] = useState([
    {
      deptId: 1,
      deptName: "IT"
    },
    {
      deptId: 2,
      deptName: "HR"
    },
    {
      deptId: 3,
      deptName: "Engineering"
    }
  ])

  const [employees, setEmployess] = useState([
    {
      empId: 1,
      empName: "Ashutosh Verulkar",
      empSalary: "20000",
      empDesignation: "Developer",
      empDept: departments[2].deptId
    },
    {
      empId: 2,
      empName: "Nikhilesh Mane",
      empSalary: "30000",
      empDesignation: "Team Lead",
      empDept: departments[1].deptId
    },
    {
      empId: 3,
      empName: "Harshal Dhokane",
      empSalary: "37000",
      empDesignation: "Developer",
      empDept: departments[2].deptId
    },
    {
      empId: 4,
      empName: "Sanket Gupta",
      empSalary: "45000",
      empDesignation: "Data Engineer",
      empDept: departments[0]?.deptId
    }
  ])

  const [selectedEmployee, setSelectedEmployee] = useState({})

  const [addEmpFlag, setAddEmpFlag] = useState(false)

  const [editFlag, setEditFlag] = useState(selectedEmployee ? false : true)

  const [searchText, setSearchText] = useState('')

  const [sortOrder, setSortOrder] = useState('')

  function homeButton() {
    setSelectedEmployee({})
    setAddEmpFlag(false)
    setSearchText('')
    setSortOrder('')
  }

  // function mountingDivs() {
  //   if (Object.keys(selectedEmployee).length === 0 && addEmpFlag === false) {
  //     return (
  //       <p>Please select an employee to view details.</p>
  //     )
  //   } else if (addEmpFlag === true) {
  //     setSelectedEmployee({})
  //     return (
  //       <EmployeeRegistrationForm employees={employees} setEmployess={setEmployess} departments={departments} homeButton={homeButton} />
  //     )
  //   } else if (Object.keys(selectedEmployee).length >= 1) {
  //     return (
  //       <DisplayEmployeeDetails employees={employees} setEmployess={setEmployess} selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} departments={departments} editFlag={editFlag} seteditFlag={setEditFlag} />
  //     )
  //   }
  // }

  return (
    <>
      <div id="navdiv">
        <NavBar names={[{ val: "Home", func: homeButton }, { val: "Add Employee", func: setAddEmpFlag }]} />
      </div>
      <div id="downdiv">
        <div id="left">
          <div id='toolbar'>
            <Search setSearchText={setSearchText} />
            <Sort setSortOrder={setSortOrder} sortOrder={sortOrder} />
          </div>
          <div>
            <table id="list">
              <thead>
                <tr>
                  <th>Employees List</th>
                </tr>
              </thead>
              <List employees={employees} selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} addEmpFlag={addEmpFlag} setAddEmpFlag={setAddEmpFlag} searchText={searchText} sortOrder={sortOrder} />
            </table>
          </div>
        </div>
        <div id="right">
          <div>
            <h3>Employee Details</h3>
          </div>
          {/* <div id="view">{
            Object.keys(selectedEmployee).length ? <DisplayEmployeeDetails employees={employees} setEmployess={setEmployess} selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} departments={departments} editFlag={editFlag} seteditFlag={setEditFlag} /> : <p>Please select an employee to view details.</p>
          }
          </div> */}

          {/* <div id="view">{
            addEmpFlag ? <EmployeeRegistrationForm employees={employees} setEmployess={setEmployess} departments={departments} homeButton={homeButton} /> : <p>Please select an employee to view details.</p>
          }
          </div> */}

          <div id="view">
            {
              // mountingDivs()

              (Object.keys(selectedEmployee).length === 0 && addEmpFlag === false) ?
                <p>Please select an employee to view details.</p> :
                (addEmpFlag === true) ?
                  (() => {
                    // setSelectedEmployee({})
                    return (
                      <EmployeeRegistrationForm
                        employees={employees}
                        setEmployess={setEmployess}
                        departments={departments}
                        homeButton={homeButton}
                      />
                    )
                  })() :
                  (Object.keys(selectedEmployee).length >= 1) ?
                    <DisplayEmployeeDetails
                      employees={employees}
                      setEmployess={setEmployess}
                      selectedEmployee={selectedEmployee}
                      setSelectedEmployee={setSelectedEmployee}
                      departments={departments}
                      editFlag={editFlag}
                      setEditFlag={setEditFlag}
                    /> :
                    null
            }
          </div>
        </div>
      </div>
    </>
  )
}

function App() {
  return (
    <>
      <EmployeesDashboard />
    </>
  )
}

export default App;
