import { useState } from 'react';

import ToolBar from './ToolBar';
import EmployeesList from './EmployeesList';
import Header from './Header';
import ViewDiv from './ViewDiv';


const EmployeesDashboard = () => {
    const [departments, setDepartments] = useState([
        {
            deptId: 1,
            deptName: "Information Technology"
        },
        {
            deptId: 2,
            deptName: "Human Resources"
        },
        {
            deptId: 3,
            deptName: "Engineering"
        },
        {
            deptId: 4,
            deptName: "Quality Assurance"
        },
        {
            deptId: 5,
            deptName: "Finance and Accounting"
        }
    ])

    // const departments = [
    //     {
    //         deptId: 1,
    //         deptName: "Information Technology",
    //         designations: [
    //             {
    //                 designationId: 1,
    //                 designation: "Chief Technology Officer"
    //             },
    //             {
    //                 designationId: 2,
    //                 designation: "System Administrator"
    //             },
    //             {
    //                 designationId: 3,
    //                 designation: "Network Administrator"
    //             }
    //         ]
    //     },
    //     {
    //         deptId: 2,
    //         deptName: "Human Resources",
    //         designations: [
    //             {
    //                 designationId: 1,
    //                 designation: "HR Director"
    //             },
    //             {
    //                 designationId: 2,
    //                 designation: "HR Manager"
    //             },
    //             {
    //                 designationId: 3,
    //                 designation: "Talent Acquisition Manager"
    //             }
    //         ]
    //     }
    // ]

    const [employees, setEmployess] = useState([
        {
            empId: 1,
            empName: "Ashutosh Verulkar",
            empSalary: "20000",
            empDesignation: "Developer",
            empDept: departments[2].deptId
        },
        {
            empId: 2,
            empName: "Nikhilesh Mane",
            empSalary: "30000",
            empDesignation: "Team Lead",
            empDept: departments[1].deptId
        },
        {
            empId: 3,
            empName: "Harshal Dhokane",
            empSalary: "37000",
            empDesignation: "Developer",
            empDept: departments[2].deptId
        },
        {
            empId: 4,
            empName: "Sanket Gupta",
            empSalary: "45000",
            empDesignation: "Data Engineer",
            empDept: departments[0]?.deptId
        }
    ])

    const [selectedEmployee, setSelectedEmployee] = useState({})

    const [addEmpFlag, setAddEmpFlag] = useState(false)

    const [editFlag, setEditFlag] = useState(false)

    const [searchText, setSearchText] = useState('')

    const [sortOrder, setSortOrder] = useState('')

    const [employeeToRegister, setEmployeeToRegister] = useState({
        empId: Number(employees[employees.length - 1].empId) + 1,
        empName: '',
        empSalary: '',
        empDesignation: '',
        empDept: ''
    })

    function addEmployeeAndSelectEmployeeHandler() {
        if (employeeToRegister.empName === '' && employeeToRegister.empSalary === '') {
            return true
        } else {
            return false
        }
    }

    function homeButton() {
        setSelectedEmployee({})
        setEditFlag(false)
        setAddEmpFlag(false)
        setSearchText('')
        setSortOrder('')
    }

    return (
        <>
            <Header
                employees={employees}
                homeButton={homeButton}
                setAddEmpFlag={setAddEmpFlag}
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
            />
            <div id="downdiv">
                <div id="left">
                    <ToolBar
                        searchText={searchText}
                        setSearchText={setSearchText}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />
                    <EmployeesList
                        employees={employees}
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                        addEmpFlag={addEmpFlag}
                        setAddEmpFlag={setAddEmpFlag}
                        searchText={searchText}
                        sortOrder={sortOrder}
                        addEmployeeAndSelectEmployeeHandler={addEmployeeAndSelectEmployeeHandler}
                    />
                </div>
                <div id="right">
                    <ViewDiv
                        employees={employees}
                        setEmployess={setEmployess}
                        departments={departments}
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                        editFlag={editFlag}
                        setEditFlag={setEditFlag}
                        addEmpFlag={addEmpFlag}
                        setAddEmpFlag={setAddEmpFlag}
                        employeeToRegister={employeeToRegister}
                        setEmployeeToRegister={setEmployeeToRegister}
                        homeButton={homeButton}
                    />
                </div>
            </div>
        </>
    )
}

export default EmployeesDashboard;