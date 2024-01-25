import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

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

const message = {
  empRegistered: "Employee registered successfully",
  empExist: "Employee exist in the Employees table",
  empEdited: "Employee details updated successfully",
  empDeleted: "Employee associated with empId deleted successfully",
  empNotExist: "Employee empId not found in Employess table"

}


// let show = false

// let id;



// displayEmployeeDetails() child
function Details( props ) {
  const labels = ["Employee Id : ", "First Name : ", "Last Name : ", "Salary : ", "Designation : ", "Department : "]
  return (
    <table id="details">
      <tbody>
        {
          Object.values(props.employee).map((info, index) => {
            return (
              <tr>
                <td>
                  <label>{labels[index]}</label>
                </td>
                <td>
                  <input type="text" value={info} disabled={props.status} />
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

// List() child
function DisplayEmployeeDetails(props) {
  return (
    <>
      <Details employee={props.employee} status={true} />
      <NavBar names={{ "Edit": App, "Delete": App }} />
    </>
  )
}

// List() child

// App() child
const List = (props) => {
  return (
    <tbody>
      {
        Object.keys(props.emplist).map((employee, index) => {
          // console.log("11",employee, "222", index+1)
          return (
            <tr><td><input key={index+1} type="button" value={props.emplist[employee].empFName + " " + props.emplist[employee].empLName} onClick={() => {
              // const emp = props.emplist[employee]
              props.disp(employee)
            }}></input></td></tr>
            )
        })
      }
    </tbody>
  )
}

// App() and displayEmployeeDetails() child
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

  const [show, setshow] = useState(false)
  const [id, setid] = useState('')
  
  function displaystatus(employee) {
   setshow(true)
   setid(employee)
    // return {show, employee}
    // displayEmployeeDetails(employee)
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
  return (
    <>
      <div id="navdiv">
        <NavBar names={{ "Home": App, "Add Employee": App }} />
      </div>
      <div id="downdiv">
        <div id="left">
          <table id="list">
            <thead>
              <tr>
                <th>Employees List</th>
              </tr>
            </thead>
            <List emplist={employees} disp={displaystatus} />
          </table>
        </div>
        <div id="right">
          <div>
            <h3>Employee Details</h3>
          </div>
          <div id="view">{
            show ? <DisplayEmployeeDetails employee={employees[id]} /> : <p>Please select an employee to view details.</p>
          }
          </div>
        </div>
      </div>
    </>
  )
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
