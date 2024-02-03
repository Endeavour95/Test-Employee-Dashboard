import EmployeeRegistrationForm from "./EmployeeRegistrationForm";
import DisplayEmployeeDetails from "./DisplayEmployeeDetails";

// function mountingDivs(employees, setEmployess, departments, selectedEmployee, setSelectedEmployee, editFlag, setEditFlag, homeButton) {
//     if (Object.keys(selectedEmployee).length === 0 && addEmpFlag === false) {
//         return (
//             <p>Please select an employee to view details.</p>
//         )
//     } else if (addEmpFlag === true) {
//         setSelectedEmployee({})
//         return (
//             <EmployeeRegistrationForm
//                 employees={employees}
//                 setEmployess={setEmployess}
//                 departments={departments}
//                 homeButton={homeButton} />
//         )
//     } else if (Object.keys(selectedEmployee).length >= 1) {
//         return (
//             <DisplayEmployeeDetails
//                 employees={employees}
//                 departments={departments}
//                 setEmployess={setEmployess}
//                 selectedEmployee={selectedEmployee}
//                 setSelectedEmployee={setSelectedEmployee}
//                 editFlag={editFlag}
//                 seteditFlag={setEditFlag} />
//         )
//     }
// }

// mountingDivs(props.employees, props.setEmployess, props.departments, props.selectedEmployee, props.setSelectedEmployee, props.editFlag, props.setEditFlag, props.homeButton)

const ViewDiv = (props) => {
    return (
        <>
            {/* <div id="view">
                {
                    Object.keys(props.selectedEmployee).length ?
                        <DisplayEmployeeDetails
                            employees={props.employees}
                            setEmployess={props.setEmployess}
                            departments={props.departments}
                            selectedEmployee={props.selectedEmployee}
                            setSelectedEmployee={props.setSelectedEmployee}
                            editFlag={props.editFlag}
                            setEditFlag={props.setEditFlag}
                        /> :
                        <p>Please select an employee to view details.</p>
                }
            </div> */}

            {/* <div id="view">
                {
                    props.addEmpFlag ?
                        <EmployeeRegistrationForm
                            employees={props.employees}
                            setEmployess={props.setEmployess}
                            departments={props.departments}
                            homeButton={props.homeButton}
                        /> :
                        <p>Please select an employee to view details.</p>
                }
            </div> */}

            <div id="view">
                {
                    (Object.keys(props.selectedEmployee).length === 0 && props.addEmpFlag === false) ?
                        <p>Please select an employee to view details.</p> :
                        (props.addEmpFlag === true) ?
                            (() => {
                                return (
                                    <EmployeeRegistrationForm
                                        employees={props.employees}
                                        setEmployess={props.setEmployess}
                                        departments={props.departments}
                                        homeButton={props.homeButton}
                                    />
                                )
                            })() :
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
                                /> :
                                null
                }
            </div>
        </>
    )
}

export default ViewDiv;