import EmployeeRegistrationForm from "./EmployeeRegistrationForm";
import DisplayEmployeeDetails from "./DisplayEmployeeDetails";

const ViewDiv = (props) => {
    return (
        <>
            <div id="view">
                {
                    (Object.keys(props.selectedEmployee).length === 0 && props.addEmpFlag === false) ?
                        <p>Please select an employee to view details.</p> :
                        (props.addEmpFlag === true) ?
                            <EmployeeRegistrationForm
                                employees={props.employees}
                                setEmployess={props.setEmployess}
                                departments={props.departments}
                                employeeToRegister={props.employeeToRegister}
                                setEmployeeToRegister={props.setEmployeeToRegister}
                                addEmpFlag={props.addEmpFlag}
                                homeButton={props.homeButton}
                            />
                            :
                            (Object.keys(props.selectedEmployee).length >= 1) ?
                                <DisplayEmployeeDetails
                                    employees={props.employees}
                                    setEmployess={props.setEmployess}
                                    departments={props.departments}
                                    selectedEmployee={props.selectedEmployee}
                                    setSelectedEmployee={props.setSelectedEmployee}
                                    editFlag={props.editFlag}
                                    setEditFlag={props.setEditFlag}
                                    homeButton={props.homeButton}
                                />
                                :
                                null
                }
            </div>
        </>
    )
}

export default ViewDiv;