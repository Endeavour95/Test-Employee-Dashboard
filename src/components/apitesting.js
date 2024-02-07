// {
//     "departments": [
//         {
//             "deptId": 1,
//             "deptName": "Information Technology"
//         },
//         {
//             "deptId": 2,
//             "deptName": "Human Resources"
//         },
//         {
//             "deptId": 3,
//             "deptName": "Engineering"
//         },
//         {
//             "deptId": 4,
//             "deptName": "Quality Assurance"
//         },
//         {
//             "deptId": 5,
//             "deptName": "Finance and Accounting"
//         }
//     ],

//         "employees": [
//             {
//                 "empId": 1,
//                 "empName": "Ashutosh Verulkar",
//                 "empSalary": "20000",
//                 "empDesignation": "Developer",
//                 "empDept": 3
//             },
//             {
//                 "empId": 2,
//                 "empName": "Nikhilesh Mane",
//                 "empSalary": "30000",
//                 "empDesignation": "Team Lead",
//                 "empDept": 2
//             },
//             {
//                 "empId": 3,
//                 "empName": "Harshal Dhokane",
//                 "empSalary": "37000",
//                 "empDesignation": "Developer",
//                 "empDept": 3
//             },
//             {
//                 "empId": 4,
//                 "empName": "Sanket Gupta",
//                 "empSalary": "45000",
//                 "empDesignation": "Data Engineer",
//                 "empDept": 1
//             },
//             {
//                 "empId": 5,
//                 "empName": "Abhishek Chopade",
//                 "empSalary": "45000",
//                 "empDesignation": "Tester",
//                 "empDept": 4
//             }
//         ]
// }

// const [departments, setDepartments] = useState([])

// const [employees, setEmployess] = useState([])
// const fetchData = () => {
//     return new Promise((resolve, reject) => {
//         fetch('https://5d617cf65cec45aa9541cb715e4b254c.api.mockbin.io/')
//             .then((response) => {
//                     if (!response.ok) {
//                             throw new Error('Failed to fetch data');
//                         }
//                         return response.json();
//                     })
//                     .then((data) => {
//                             resolve(data);
//             })
//             .catch((error) => {
//                     reject(error);
//                 });
//         });
//     };

// useEffect(() => {
//     fetchData()
//         .then((result) => {
//             setEmployess(result.employees);
//             setDepartments(result.departments);
//         })
//         .catch((error) => {
//             console.error("error", error);
//         });
// }, []);


// const fetchData = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const response = await fetch('https://5d617cf65cec45aa9541cb715e4b254c.api.mockbin.io/');
//             console.log("response", response)
//             const data = await response.json();
//             resolve(data);
//             // return data
//         } catch (error) {
//             reject(error);
//             // throw new error
//         }
//     });
// };

// useEffect(() => {
//     fetchData()
//         .then((result, error) => {
//             setEmployess(result.employees);
//             setDepartments(result.departments);
//             console.log("result", result);
//             // console.log("error", error)
//         })
//         .catch((error) => {
//             console.error("error", error);
//         });
// }, []);

// const fetchData = () => {
//     return fetch('https://5d617cf65cec45aa9541cb715e4b254c.api.mockbin.io/')
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('Failed to fetch data');
//             }
//             return response.json();
//         })
//         .catch((error) => {
//             console.error('Error fetching data:', error);
//             throw error;
//         });
// };

// useEffect(() => {
//     const fetchDataFromApi = () => {
//         fetchData()
//             .then((data) => {
//                 setEmployess(data.employees);
//                 setDepartments(data.departments);
//             })
//             .catch((error) => {
//                 console.error('Error fetching employee data:', error);
//             });
//     };

//     fetchDataFromApi();
// }, []);

// const fetchData = async () => {
//     try {
//         const response = await axios.get('https://5d617cf65cec45aa9541cb715e4b254c.api.mockbin.io/');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// };

// useEffect(() => {
//     const fetchDataFromApi = async () => {
//         try {
//             const data = await fetchData();
//             setEmployess(data.employees);
//             setDepartments(data.departments);
//         } catch (error) {
//             console.error('Error fetching employee data:', error);
//         }
//     };

//     fetchDataFromApi();
// }, []);