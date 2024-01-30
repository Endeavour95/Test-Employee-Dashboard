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
