const DisplayAndEditButtons = (props) => {
    return (
        <>
            {
                props.editFlag ?
                    (
                        <tr>
                            <td>
                                <button
                                    onClick={() => {
                                        editEmployee(props.employeeToEdit, props.employees, props.setEmployess, props.setSelectedEmployee, props.setEditFlag)
                                    }}
                                >
                                    Save
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        props.setEditFlag(false)
                                    }}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    )
                    : props.delEmpFlag ?
                    (
                            <tr>
                                <td>
                                    <button
                                        onClick={() => {
                                            deleteEmployee(props.selectedEmployee, props.setSelectedEmployee, props.employees, props.setEmployess, props.setDelEmpFlag)
                                        }}
                                    >
                                        Confirm
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            props.setDelEmpFlag(false)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        )
                        :
                        (
                            <tr>
                                <td>
                                    <button
                                        onClick={() => {
                                            props.setEditFlag(true);
                                        }}
                                        >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            props.setDelEmpFlag(true)
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
            }
        </>
    )
}

function editEmployee(employee, employees, setEmployess, setSelectedEmployee, setEditFlag) {
    const index = employees.findIndex(emp => emp.empId === employee.empId);

    const updatedEmployees = [...employees];

    updatedEmployees[index] = employee;
    
    setEmployess(updatedEmployees);
    
    setSelectedEmployee({})
    
    setEditFlag(false)
}

function deleteEmployee(selectedEmployee, setSelectedEmployee, employees, setEmployess, setDelEmpFlag) {
    const updatedEmployees = employees.filter(employee => employee.empId !== selectedEmployee.empId);
    setEmployess(updatedEmployees);
    setSelectedEmployee({});
    setDelEmpFlag(false)
}

// function editEmployee(employee, employees, setEmployess, setSelectedEmployee, setEditFlag) {
//     const index = employees.findIndex(emp => emp.empId === employee.empId);

//     const updatedEmployees = [...employees];

//     updatedEmployees[index] = employee;

//     setEmployess(updatedEmployees);
// }

// function deleteEmployee(selectedEmployee, setSelectedEmployee, employees, setEmployess) {
//     const updatedEmployees = employees.filter(employee => employee.empId !== selectedEmployee.empId);
//     setEmployess(updatedEmployees);
//     setSelectedEmployee({});
// }

// const DisplayAndEditButtons = (props) => {
//     return (
//         <tr>
//             <td>
//                 <button
//                     onClick={() => {
//                         props.setEditFlag(true);
//                         editEmployee(props.employeeToEdit, props.employees, props.setEmployess, props.setSelectedEmployee, props.setEditFlag)
//                     }}
//                 >
//                     Update
//                 </button>
//             </td>
//             <td>
//                 <button
//                     onClick={() => { deleteEmployee(props.selectedEmployee, props.setSelectedEmployee, props.employees, props.setEmployess) }}
//                 >
//                     Delete
//                 </button>
//             </td>
//         </tr>
//     )
// }

export default DisplayAndEditButtons;