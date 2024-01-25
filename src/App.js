import logo from './logo.svg';
import './App.css';

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

const List = () => {
  return (
    <tbody>
      {
        Object.keys(employees).map((key) => {
          return (
            <tr><td><input type="button" value={employees[key].empFName + " " + employees[key].empLName}></input></td></tr>
          )
        })
      }
    </tbody>
  )
}

function App() {
  return (
    <>
      <div id="navdiv">
        <nav>
          <input type="button" defaultValue="Home" onClick={App} />
          <input type="button" defaultValue="Add Employee" onClick={App} />
        </nav>
      </div>
      <div id="downdiv">
        <div id="left">
          <table id="list">
            <thead>
              <tr>
                <th>Employees List</th>
              </tr>
            </thead>
            <List />
          </table>
        </div>
        <div id="right">
          <div>
            <h3>Employee Details</h3>
          </div>
          <div id="view">Please select an employee to view details.</div>
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
