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
                <tr key={index}>
                  <td>
                    <label>{labels[index]}</label>
                  </td>
                  <td>
                    <input type="number" value={props.employee[key]} disabled />
                  </td>
                </tr>
              }
              if (key === "empDept") {
                return (
                  <tr key={index}>
                    <td>
                      <label>{labels[index]}</label>
                    </td>
                    <td>
                      <select id="myList" onChange={true} value={props.departments[props.employee[key]].deptId} disabled={props.editflag}>
                        <option value="1" > IT </option>
                        <option value="2" > HR </option>
                        <option value="3" > Engineering </option>
                      </select>
                    </td>
                  </tr>
                )
              }
              return (
                <tr key={index}>
                  <td>
                    <label>{labels[index]}</label>
                  </td>
                  <td>
                    <input type="text" value={props.employee[key]} disabled={props.editflag} />
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

const List = (props) => {
  let emplist = Object.keys(props.employees).map((empId) => {
    return [empId, (props.employees[empId].empFName + " " + props.employees[empId].empLName)]
  })

  if (props.sortOrder) {
    if (props.sortOrder === "DESC") {
      let empArray = [...emplist]
      empArray.sort((a, b) => b[1].localeCompare(a[1]));
      emplist = empArray
    }
    if (props.sortOrder === "ASC") {
      let empArray = [...emplist]
      empArray.sort((a, b) => a[1].localeCompare(b[1]));
      emplist = empArray
    }
  }

  if (props.searchText !== "") {
    let matchedEmployees = emplist.filter(([empId, empName]) =>
      empName.toLowerCase().includes(props.searchText.trim().toLowerCase())
    ).map(([empId]) => [empId, (props.employees[empId].empFName + " " + props.employees[empId].empLName)]);

    emplist = matchedEmployees
  }

  return (
    <tbody>
      {
        emplist.map((empId, index) => {
          return (
            <tr key={index}><td><input type="button" style={props.selectedEmployeeId === emplist[index][0] ? { backgroundColor: "yellowgreen" } : { backgroundColor: "#4caf50" }}
              value={emplist[index][1]}
              onClick={() => { props.setSelectedEmployeeId(emplist[index][0]) }} ></input></td></tr>
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
      empFName: "Nikhilesh",
      empLName: "Mane",
      empSalary: "30000",
      empDesignation: "Team Lead",
      empDept: departments[2]?.deptId
    },
    '3': {
      empId: 3,
      empFName: "Harshal",
      empLName: "Dhokane",
      empSalary: "37000",
      empDesignation: "Developer",
      empDept: departments[1]?.deptId
    },
    '4': {
      empId: 4,
      empFName: "Sanket",
      empLName: "Gupta",
      empSalary: "45000",
      empDesignation: "Data Engineer",
      empDept: departments[3]?.deptId
    }
  }

  const [selectedEmployeeId, setSelectedEmployeeId] = useState('')

  // const employessNamelist = clonedEmployessNames(employees)

  const [editflag, setEditflag] = useState(selectedEmployeeId ? false : true)

  const [searchText, setSearchText] = useState('')

  const [sortOrder, setSortOrder] = useState("")

  // function clonedEmployessNames(employees) {
  //   let emplist = {}
  //   Object.keys(employees).map((empId) => {
  //     emplist[empId] = employees[empId].empFName + " " + employees[empId].empLName
  //   })
  //   return emplist
  // }


  return (
    <>
      <div id="navdiv">
        <NavBar names={{ "Home": App, "Add Employee": App }} />
      </div>
      <div id="downdiv">
        <div id="left">
          <div id='toolbar'>
            {/* <Search setClonedEmployessNamelist={setClonedEmployessNamelist} employessNamelist={employessNamelist} /> */}
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
              {/* <List clonedEmployess={clonedEmployess} setEmpId={setEmpId} selectedEmployeeId={empId} /> */}
              <List employees={employees} setSelectedEmployeeId={setSelectedEmployeeId} selectedEmployeeId={selectedEmployeeId} searchText={searchText} sortOrder={sortOrder} />
            </table>
          </div>
        </div>
        <div id="right">
          <div>
            <h3>Employee Details</h3>
          </div>
          <div id="view">{
            selectedEmployeeId ? <DisplayEmployeeDetails employee={employees[selectedEmployeeId]} departments={departments} editflag={editflag} /> : <p>Please select an employee to view details.</p>
          }
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
