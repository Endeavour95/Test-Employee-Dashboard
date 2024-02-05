import { useState, useEffect } from 'react';

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

    // const [employees, setEmployess] = useState([
    //     {
    //         empId: 1,
    //         empName: "Ashutosh Verulkar",
    //         empSalary: "20000",
    //         empDesignation: "Developer",
    //         empDept: departments[2].deptId
    //     },
    //     {
    //         empId: 2,
    //         empName: "Nikhilesh Mane",
    //         empSalary: "30000",
    //         empDesignation: "Team Lead",
    //         empDept: departments[1].deptId
    //     },
    //     {
    //         empId: 3,
    //         empName: "Harshal Dhokane",
    //         empSalary: "37000",
    //         empDesignation: "Developer",
    //         empDept: departments[2].deptId
    //     },
    //     {
    //         empId: 4,
    //         empName: "Sanket Gupta",
    //         empSalary: "45000",
    //         empDesignation: "Data Engineer",
    //         empDept: departments[0]?.deptId
    //     }
    // ])


    // {
    //     departments: [
    //         {
    //             deptId: 1,
    //             deptName: "Information Technology"
    //         },
    //         {
    //             deptId: 2,
    //             deptName: "Human Resources"
    //         },
    //         {
    //             deptId: 3,
    //             deptName: "Engineering"
    //         },
    //         {
    //             deptId: 4,
    //             deptName: "Quality Assurance"
    //         },
    //         {
    //             deptId: 5,
    //             deptName: "Finance and Accounting"
    //         }
    //     ],


    //         employees: [
    //             {
    //                 empId: 1,
    //                 empName: "Ashutosh Verulkar",
    //                 empSalary: "20000",
    //                 empDesignation: "Developer",
    //                 empDept: departments[2].deptId
    //             },
    //             {
    //                 empId: 2,
    //                 empName: "Nikhilesh Mane",
    //                 empSalary: "30000",
    //                 empDesignation: "Team Lead",
    //                 empDept: departments[1].deptId
    //             },
    //             {
    //                 empId: 3,
    //                 empName: "Harshal Dhokane",
    //                 empSalary: "37000",
    //                 empDesignation: "Developer",
    //                 empDept: departments[2].deptId
    //             },
    //             {
    //                 empId: 4,
    //                 empName: "Sanket Gupta",
    //                 empSalary: "45000",
    //                 empDesignation: "Data Engineer",
    //                 empDept: departments[0]?.deptId
    //             }
    //         ]
    // }

    [
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
        }
    ]

    const [selectedEmployee, setSelectedEmployee] = useState({})

    const [addEmpFlag, setAddEmpFlag] = useState(false)

    const [editFlag, setEditFlag] = useState(false)

    const [searchText, setSearchText] = useState('')

    const [sortOrder, setSortOrder] = useState('')

    const [employeeToRegister, setEmployeeToRegister] = useState({})



    // const [departments, setDepartments] = useState([
    //     // {
    //     //     deptId: '',
    //     //     deptName: ''
    //     // }
    // ])

    const [employees, setEmployess] = useState([
        // {
        //     empId: '',
        //     empName: '',
        //     empSalary: '',
        //     empDesignation: '',
        //     empDept: ''
        // }
    ])


    const fetchData = () => {
        return new Promise((resolve, reject) => {
            try {
                const response = fetch('https://6956bc84bdb848c48b9dd4bb42f2b8e6.api.mockbin.io/');
                const data = response.json();
                console.log("1111", data)
                // console.log("data", data)
                resolve(data);
            } catch (error) {
                // console.error('Error fetching data:', error);
                reject(error);
            }
        });
    };

    useEffect(() => {
        const fetchDataFromApi = () => {
            try {
                const data = fetchData();
                setDepartments(data.departments);
                setEmployess(data.employees)
            } catch (error) {
                // console.error('Error fetching employee data:', error);
            }
        };

        fetchDataFromApi();
    }, [fetchData, setDepartments, setEmployess]);

    console.log("employees", employees)

    // const fetchData = async () => {
    //     try {
    //       const response = await fetch('https://jsonplaceholder.typicode.com/users');
    //       const data = await response.json();
    //       return data;
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //       throw error;
    //     }
    //   };

    //   useEffect(() => {
    //     const fetchDataFromApi = async () => {
    //       try {
    //         const data = await fetchData();
    //         setEmployess(data);
    //       } catch (error) {
    //         console.error('Error fetching employee data:', error);
    //       }
    //     };

    //     fetchDataFromApi();
    //   }, []);

    // const [employeeToRegister, setEmployeeToRegister] = useState({
    //     empId: Number(employees[employees.length - 1].empId) + 1,
    //     empName: '',
    //     empSalary: '',
    //     empDesignation: '',
    //     empDept: ''
    // })

    useEffect(() => {
        setEmployeeToRegister((prevEmployeeToRegister) => ({
            ...prevEmployeeToRegister,
            empId: Number(employees[employees.length - 1].empId) + 1,
            empName: '',
            empSalary: '',
            empDesignation: '',
            empDept: ''
        }));
    }, [employees]);

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