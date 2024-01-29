import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function DisplayEmployeeDetails(props) {
  const labels = ["Employee Id : ", "First Name : ", "Last Name : ", "Salary : ", "Designation : ", "Department : "]
  return (
    <table id="details">
      <tbody>
        {
          Object.keys(props.employee).map((key, index) => {
            if (key != "") {
              if (key == "empDept") {
                // let dept = props.departments[props.employee[key]]
                return (
                  <tr>
                    <td>
                      <label>{labels[index]}</label>
                    </td>
                    <td>
                      <select id="myList" onchange="favTutorial()" disabled={props.status}>
                        <option value="" selected disabled hidden > {props.departments[props.employee[key]].deptName} </option>
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
const List = (props) => {
  function setCss(employee) {
    if (props.selectedEmployee === employee) {
      return "hsla(64, 84%, 58%, 0.89)"
    } else {
      return "#4caf50"
    }
  }

  // const handelSetEmployee = (employee) =>{
  //   console.log("em---ployee", employee)
  //   props.setEmpId(employee)
  // }

  return (
    <tbody>
      {
        Object.keys(props.employees).map((employee, index) => {
          return (
            <tr><td><input key={index + 1} type="button" style={{ backgroundColor: setCss(employee) }}
              value={props.employees[employee].empFName + " " + props.employees[employee].empLName}
              onClick={() => { props.setEmpId(employee) }} ></input></td></tr>
          )
        })


        // Object.keys(props.employees).map((employee, index) => {
        //   console.log("11", employee)
        //   return (
        //     <tr><td><input key={index + 1} type="button" style={{ backgroundColor: setCss(employee) }}
        //       value={props.employees[employee].empFName + " " + props.employees[employee].empLName}
        //       onClick={() => handelSetEmployee(employee)} ></input></td></tr>
        //   )
        // })

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

  const [clonedEmployess, setClonedEmployess] = useState(employees)

  function arrangeEmployees(employees, e) {
    
    if (e.target.value == "ASC") {
      Object.keys.employees

      setClonedEmployess(employees)
    }
  }

  return (
    <>
      <div id="navdiv">
        <NavBar names={{ "Home": App, "Add Employee": App }} />
      </div>
      <div id="downdiv">
        <div id="left">
          <div id='toolbar'>
            <input placeholder='search'></input>
            <select id="myList" onchange={(e)=>arrangeEmployees(employees, e)} setClonedEmployess={setClonedEmployess} >
              <option value="" selected disabled hidden > Sort </option>
              <option value="ASC" > ASC </option>
              <option value="DESC" > DESC </option>
            </select>
          </div>
          <div>
            <table id="list">
              <thead>
                <tr>
                  <th>Employees List</th>
                </tr>
              </thead>
              <List employees={clonedEmployess} setEmpId={setEmpId} selectedEmployee={empId} />
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
