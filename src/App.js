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
//         Object.keys(props.clonedEmployessNamelist).map((empId) => {
//           return (
//             <tr><td><input key={empId} type="button" style={{ backgroundColor: setCss(empId) }}
//               value={props.clonedEmployessNamelist[empId]}
//               onClick={() => { props.setEmpId(empId) }} ></input></td></tr>
//           )
//         })
//       }
//     </tbody>
//   )
// }

const List = (props) => {
  function createlist(employees) {
    let emplist = {}
    Object.keys(employees).map((empId) => {
      emplist[empId] = employees[empId].empFName + " " + employees[empId].empLName
      // emplist.push({empId : employees[empId].empFName + " " + employees[empId].empLName})
    })
    return emplist
  }

  let emplist = createlist(props.employees)
  // console.log("props.searchText", props.searchText)

  if (props.sortOrder) {
    if (props.sortOrder === "DESC") {
      // let newEmpList = []

      // Object.keys(emplist).map((empId) => {
      //   newEmpList.push({[empId] : emplist[empId]})
      // })


      //https://byby.dev/js-sort-by-object-property#:~:text=When%20it%20comes%20to%20sorting,order%20of%20the%20two%20objects.



      let names = Object.values(emplist)
      names.sort()
      names.reverse()

      // names.map((name, index) => {
      //   if (Object.values(emplist).includes(name)) {
      //     // newEmpList[] = name
      //     // console.log("name", name)
      //   }
      // })
      // console.log("empList", emplist)

      let newEmplist = {}
      Object.keys(emplist).map((empId) => {
        names.forEach(name => {
          if (name == emplist[empId]) {
            
          }
          
        });
        // if (names.includes(emplist[empId])) {
        //   newEmplist[empId] = emplist[empId]
        // }
      })

      console.log("newEmplist", newEmplist)


    } else if (props.sortOrder === "ASC") {
      let names = Object.values(emplist).sort()
      // names.sort()

      Object.keys(emplist).map((empId, index) => {
        if (Object.values(emplist).includes(names[index])) {
          emplist[index + 1] = names[index]
        }
      })

      console.log(emplist)
    }
  }

  if (props.searchText !== "") {
    let matchedEmployees = Object.keys(emplist).filter(empId =>
      emplist[empId].toLowerCase().includes(props.searchText.trim().toLowerCase())
    );

    // console.log("matchedEmployees", matchedEmployees)

    let forclonedEmployessNamelist = {}

    matchedEmployees.map((empId) => {
      if (Object.keys(emplist).includes(empId)) {
        forclonedEmployessNamelist[empId] = emplist[empId]
      }
    })

    emplist = forclonedEmployessNamelist
  } else {
    emplist = createlist(props.employees)


  }

  // function setCss(empId) {
  //   if (props.selectedEmployeeId === empId) {
  //     return "yellowgreen"
  //   } else {
  //     return "#4caf50"
  //   }
  // }

  return (
    <tbody>
      {
        Object.keys(emplist).map((empId) => {
          return (
            // <tr><td><input key={empId} type="button" style={{ backgroundColor: setCss(empId) }}
            <tr><td><input key={empId} type="button" style={props.selectedEmployeeId === empId ? { backgroundColor: "yellowgreen" } : { backgroundColor: "#4caf50" }}
              value={emplist[empId]}
              onClick={() => { props.setSelectedEmployeeId(empId) }} ></input></td></tr>
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

// const Search = (props) => {
//   return (
//     <input placeholder='🔎︎ Search...' onInput={(e) => { handleSearchEmployee(e, props.setClonedEmployessNamelist, props.employessNamelist) }} />
//   )
// }

const Search = (props) => {
  return (
    <input placeholder='🔎︎ Search...' onInput={(e) => { props.setSearchText(e.target.value) }} />
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

const Sort = (props) => {
  return (
    <select id="myList" value={props.sortOrder} onChange={(e) => { props.setSortOrder(e.target.value) }} >
      <option value="" selected> Date Modified </option>
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

  const [selectedEmployeeId, setSelectedEmployeeId] = useState('')

  // const employessNamelist = clonedEmployessNames(employees)

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
            selectedEmployeeId ? <DisplayEmployeeDetails employee={employees[selectedEmployeeId]} departments={departments} status={true} /> : <p>Please select an employee to view details.</p>
          }
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
