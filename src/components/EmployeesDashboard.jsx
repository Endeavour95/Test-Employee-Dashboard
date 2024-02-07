import React, { useEffect, useState } from 'react';
import { Paper, Grid } from "@mui/material";


// https://css-tricks.com/snippets/css/a-guide-to-flexbox/

import ToolBar from './ToolBar';
import EmployeesList from './EmployeesList';
import Header from './Header';
import ViewDiv from './ViewDiv';

const EmployeesDashboard = () => {
    const [departments, setDepartments] = useState([
        {
            "deptId": 1,
            "deptName": "Information Technology"
        },
        {
            "deptId": 2,
            "deptName": "Human Resources"
        },
        {
            "deptId": 3,
            "deptName": "Engineering"
        },
        {
            "deptId": 4,
            "deptName": "Quality Assurance"
        },
        {
            "deptId": 5,
            "deptName": "Finance and Accounting"
        }
    ]);

    const [employees, setEmployess] = useState([
        {
            "empId": 1,
            "empName": "Ashutosh Verulkar",
            "empSalary": "20000",
            "empDesignation": "Developer",
            "empDept": 3
        },
        {
            "empId": 2,
            "empName": "Nikhilesh Mane",
            "empSalary": "30000",
            "empDesignation": "Team Lead",
            "empDept": 2
        },
        {
            "empId": 3,
            "empName": "Harshal Dhokane",
            "empSalary": "37000",
            "empDesignation": "Developer",
            "empDept": 3
        },
        {
            "empId": 4,
            "empName": "Sanket Gupta",
            "empSalary": "45000",
            "empDesignation": "Data Engineer",
            "empDept": 1
        },
        {
            "empId": 5,
            "empName": "Abhishek Chopade",
            "empSalary": "45000",
            "empDesignation": "Tester",
            "empDept": 4
        }
    ])

    const [selectedEmployee, setSelectedEmployee] = useState({});

    const [addEmpFlag, setAddEmpFlag] = useState(false);

    const [editFlag, setEditFlag] = useState(false);

    const [searchText, setSearchText] = useState('');

    const [sortOrder, setSortOrder] = useState('');

    const [employeeToRegister, setEmployeeToRegister] = useState({});

    useEffect(() => {
        setEmployeeToRegister(() => ({
            "empId": employees.length > 0 ? Number(employees[employees.length - 1].empId) + 1 : 1,
            "empName": '',
            "empSalary": '',
            "empDesignation": '',
            "empDept": ''
        }));
    }, [employees]);

    function addEmployeeAndSelectEmployeeHandler() {
        if (employeeToRegister.empName === '' && employeeToRegister.empSalary === '') {
            return true;
        } else {
            return false;
        }
    }

    function homeButton() {
        setSelectedEmployee({});
        setEditFlag(false);
        setAddEmpFlag(false);
        setSearchText('');
        setSortOrder('');
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
            <Grid container spacing={2}>
                <Grid item ontainer xs={3} spacing={5}>
                    <Paper elevation={3} 
                    // style={{ padding: '10px', marginBottom: '10px' }}
                    >
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
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
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
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default EmployeesDashboard;