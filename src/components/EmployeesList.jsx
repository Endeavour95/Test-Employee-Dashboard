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
                props.searchText ?
                    <tr>
                        <td>
                            {
                                employees.length > 0 ?
                                    <p style={{ fontFamily: "cursive" }}>{employees.length} Records found</p>
                                    :
                                    <p style={{ color: "red", fontFamily: "cursive" }}>No Record found</p>
                            }
                        </td>
                    </tr>
                    : <></>
            }
            {
                employees.map((employee, index) => {
                    return (
                        <tr key={index}><td><input type="button" style={props.selectedEmployee.empId === employee.empId ? { backgroundColor: "green" } : { backgroundColor: "#4caf50" }}
                            value={employee.empName}
                            onClick={() => {
                                if (props.addEmpFlag === true) {
                                    if (props.addEmployeeAndSelectEmployeeHandler()) {
                                        props.setAddEmpFlag(false)
                                        props.setSelectedEmployee(employee)
                                    } else {
                                        alert("Please cancel button or submit the employess details")
                                    }
                                } else {
                                    props.setSelectedEmployee(employee)
                                }
                            }} ></input></td></tr>
                    )
                })
            }
        </tbody>
    )
}

const EmployeesList = (props) => {
    return (
        <div>
            <table id="list">
                <thead>
                    <tr>
                        <th>Employees List</th>
                    </tr>
                </thead>
                <List
                    employees={props.employees}
                    selectedEmployee={props.selectedEmployee}
                    setSelectedEmployee={props.setSelectedEmployee}
                    addEmpFlag={props.addEmpFlag}
                    setAddEmpFlag={props.setAddEmpFlag}
                    searchText={props.searchText}
                    sortOrder={props.sortOrder}
                    addEmployeeAndSelectEmployeeHandler={props.addEmployeeAndSelectEmployeeHandler}
                />
            </table>
        </div>
    )
}

export default EmployeesList;