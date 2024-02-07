import { Button } from "@mui/material"

const DisplayAndEditButtons = (props) => {
    return (
        <>
            {
                props.editFlag ?
                    (
                        <tr>
                            <td>
                                <Button
                                    onClick={() => {
                                        editEmployee(props.employees, props.setEmployess, props.selectedEmployee, props.setSelectedEmployee, props.setEditFlag)
                                    }}
                                >
                                    Save
                                </Button>
                            </td>
                            <td>
                                <Button
                                    onClick={() => {
                                        props.setEditFlag(false)
                                    }}
                                >
                                    Cancel
                                </Button>
                            </td>
                        </tr>
                    )
                    : props.delEmpFlag ?
                    (
                            <tr>
                                <td>
                                    <Button
                                        onClick={() => {
                                            deleteEmployee(props.employees, props.setEmployess, props.selectedEmployee, props.setSelectedEmployee, props.setDelEmpFlag)
                                        }}
                                    >
                                        Confirm
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            props.setDelEmpFlag(false)
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </td>
                            </tr>
                        )
                        :
                        (
                            <tr>
                                <td>
                                    <Button
                                        onClick={() => {
                                            props.setEditFlag(true);
                                        }}
                                        >
                                        Update
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            props.setDelEmpFlag(true)
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        )
            }
        </>
    )
}

function editEmployee(employees, setEmployess, selectedEmployee, setSelectedEmployee, setEditFlag) {
    const index = employees.findIndex(emp => emp.empId === selectedEmployee.empId);

    const updatedEmployees = [...employees];

    updatedEmployees[index] = selectedEmployee;
    
    setEmployess(updatedEmployees);
    
    setSelectedEmployee({});
    
    setEditFlag(false);
}

function deleteEmployee(employees, setEmployess, selectedEmployee, setSelectedEmployee, setDelEmpFlag) {
    const updatedEmployees = employees.filter(employee => employee.empId !== selectedEmployee.empId);
    setEmployess(updatedEmployees);
    setSelectedEmployee({});
    setDelEmpFlag(false);
}

export default DisplayAndEditButtons;