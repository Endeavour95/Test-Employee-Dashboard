import { useState } from 'react';
import DisplayAndEditButtons from './DisplayAndEditButtons';

function DisplayEmployeeDetails(props) {
    const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "]

    const [employeeToEdit, setEmployeeToEdit] = useState(props.selectedEmployee)

    const [delEmpFlag, setDelEmpFlag] = useState(false)

    function handleOnChange(e, property) {
        setEmployeeToEdit((prevEmp) => {
            return {
                ...prevEmp,
                [property]: e.target.value,
            };
        });
    }

    return (
        <>
            <div>
                <h3>Employee Details</h3>
            </div>
            <table id="details">
                <tbody>
                    {
                        Object.keys(employeeToEdit).map((property, index) => {
                            if (property === "empId") {
                                return (
                                    <tr key={property}>
                                        <td>
                                            <label>{labels[index]}</label>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                style={{ cursor: 'no-drop' }}
                                                value={employeeToEdit[property]} disabled
                                            />
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
                                            <select
                                                id="myList"
                                                onChange={(e) => {
                                                    handleOnChange(e, property)
                                                }}
                                                style={props.editFlag ? { cursor: 'pointer' } : { cursor: 'no-drop' }}
                                                value={employeeToEdit.empDept} disabled={props.editFlag === false}
                                            >
                                                {
                                                    props.departments.map((department) => {
                                                        return (
                                                            <option
                                                                key={department.deptId}
                                                                value={department.deptId}
                                                            >
                                                                {department.deptName}
                                                            </option>
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
                                            <input type="text" onChange={(e) => { handleOnChange(e, property) }} value={employeeToEdit[property]} style={props.editFlag ? { cursor: 'pointer' } : { cursor: 'no-drop' }} disabled={props.editFlag === false} />
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                    <DisplayAndEditButtons
                        employeeToEdit={employeeToEdit}
                        employees={props.employees}
                        setEmployess={props.setEmployess}
                        selectedEmployee={props.selectedEmployee}
                        setSelectedEmployee={props.setSelectedEmployee}
                        editFlag={props.editFlag}
                        setEditFlag={props.setEditFlag}
                        delEmpFlag={delEmpFlag}
                        setDelEmpFlag={setDelEmpFlag}
                    />
                    {/* <tr>
                        <td>
                            <button
                                onClick={() => {
                                    props.setEditFlag(true);
                                    editEmployee(employeeToEdit, props.employees, props.setEmployess, props.setSelectedEmployee, props.setEditFlag)
                                }}
                            >
                                Edit
                            </button>
                        </td>
                        <td>
                            <button
                                onClick={() => { deleteEmployee(props.selectedEmployee, props.setSelectedEmployee, props.employees, props.setEmployess) }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </>
    )
}

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

export default DisplayEmployeeDetails;