import { useState } from 'react';

import ToolBar from './ToolBar';
import EmployeesList from './EmployeesList';
import Header from './Header';
import ViewDiv from './ViewDiv';

const EmployeesDashboard = () => {
    const [departments, setDepartments] = useState([
        {
            deptId: 1,
            deptName: "IT"
        },
        {
            deptId: 2,
            deptName: "HR"
        },
        {
            deptId: 3,
            deptName: "Engineering"
        }
    ])

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

    // const [editFlag, setEditFlag] = useState(Object.keys(selectedEmployee).length === 0 ? false : true)
    const [editFlag, setEditFlag] = useState(false)

    const [searchText, setSearchText] = useState('')

    const [sortOrder, setSortOrder] = useState('')

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
                homeButton={homeButton}
                setAddEmpFlag={setAddEmpFlag}
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
            />
            <div id="downdiv">
                <div id="left">
                    <ToolBar
                        setSearchText={setSearchText}
                        setSortOrder={setSortOrder}
                        sortOrder={sortOrder}
                    />
                    <EmployeesList
                        employees={employees}
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                        addEmpFlag={addEmpFlag}
                        setAddEmpFlag={setAddEmpFlag}
                        searchText={searchText}
                        sortOrder={sortOrder}
                    />
                </div>
                <div id="right">
                    <ViewDiv
                        employees={employees}
                        setEmployess={setEmployess}
                        departments={departments}
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                        homeButton={homeButton}
                        editFlag={editFlag}
                        setEditFlag={setEditFlag}
                        addEmpFlag={addEmpFlag}
                        setAddEmpFlag={setAddEmpFlag}
                    />
                </div>
            </div>
        </>
    )
}

export default EmployeesDashboard;