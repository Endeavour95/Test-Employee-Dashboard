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
              if (key === "empId") {
                return (
                  <tr key={index}>
                    <td>
                      <label>{labels[index]}</label>
                    </td>
                    <td>
                      <input type="text" style={{ cursor: 'no-drop' }} value={props.employee[key]} disabled />
                    </td>
                  </tr>
                )
              } else if (key === "empDept") {
                return (
                  <tr key={index}>
                    <td>
                      <label>{labels[index]}</label>
                    </td>
                    <td>
                      <select id="myList" style={props.editFlag ? { cursor: 'no-drop' } : { cursor: 'pointer' }} value={props.employee.empDept} disabled={props.editFlag}>
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
                      <input type="text" value={props.employee[key]} style={props.editFlag ? { cursor: 'no-drop' } : { cursor: 'pointer' }} disabled={props.editFlag} />
                    </td>
                  </tr>
                )
              }
            }
          })
        }
        <tr>
          <td>
            <button onClick={() => { props.seteditFlag(false) }} >Edit</button>
          </td>
          <td>
            <button >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

function EmployeeRegistrationForm(props) {
  const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "]
  const properties = ["empName", "empSalary", "empDesignation", "empDept"]

  let employee = {
    "empId": Number(props.employees[props.employees.length - 1].empId) + 1
  }

  const [newEmp, setnewEmp] = useState("")

  function handleOnChange(e, property) {
    if (property === "empDept") {
      employee = { ...employee, [property]: e.target.value, }
      console.log("handleOnChange", employee)
      setnewEmp(employee)
    } else {
      employee = { ...employee, [property]: e.target.value, }
    }
  }

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
                      props.setSelectedDepartment(e.target.value)
                    }}
                      style={{ cursor: 'pointer' }} value={props.selectedDepartment} required>
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
              props.setEmployess([ ...props.employees, newEmp, ])
            }}>Submit</button>
          </td>
          <td>
            <button >Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}


const List = (props) => {
  let dummyEmployees = [...props.employees]

  if (props.sortOrder) {
    if (props.sortOrder === "DESC") {
      dummyEmployees.sort((a, b) => b.empName.localeCompare(a.empName));
    }
    if (props.sortOrder === "ASC") {
      dummyEmployees.sort((a, b) => a.empName.localeCompare(b.empName));
    }
  }

  if (props.searchText) {
    dummyEmployees = props.employees.filter(employee =>
      employee.empName.toLowerCase().includes(props.searchText.toLowerCase())
    );
  }

  return (
    <tbody>
      {
        dummyEmployees.map((employee, index) => {
          return (
            <tr key={index}><td><input type="button" style={props.selectedEmployee.empId === employee.empId ? { backgroundColor: "yellowgreen" } : { backgroundColor: "#4caf50" }}
              value={employee.empName}
              onClick={() => { props.setSelectedEmployee(employee) }} ></input></td></tr>
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
            <input key={name} id={index + 1} type="button" defaultValue={name} onClick={(e) => props.setclickedButton(e.target.id)} />
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
  const departments = [
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
  ]

  let employees1 = [
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
  ]

  const [employees, setEmployess] = useState(employees1)

  const [selectedEmployee, setSelectedEmployee] = useState('')

  const [selectedDepartment, setSelectedDepartment] = useState('')

  const [editFlag, seteditFlag] = useState(selectedEmployee ? false : true)
  // const [editflag, setEditflag] = useState(false)

  const [clickedButton, setclickedButton] = useState('')

  const [searchText, setSearchText] = useState('')

  const [sortOrder, setSortOrder] = useState("")

  return (
    <>
      <div id="navdiv">
        <NavBar names={["Home", "Add Employee"]} setclickedButton={setclickedButton} />
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
              <List employees={employees} setSelectedEmployee={setSelectedEmployee} selectedEmployee={selectedEmployee} searchText={searchText} sortOrder={sortOrder} />
            </table>
          </div>
        </div>
        <div id="right">
          <div>
            <h3>Employee Details</h3>
          </div>
          <div id="view">{
            selectedEmployee ? <DisplayEmployeeDetails employee={selectedEmployee} departments={departments} editFlag={editFlag} seteditFlag={seteditFlag} /> : <p>Please select an employee to view details.</p>
          }
          </div>

          {/* <div>
            <EmployeeRegistrationForm employees={employees} setEmployess={setEmployess} departments={departments} selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment} />
          </div> */}
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
