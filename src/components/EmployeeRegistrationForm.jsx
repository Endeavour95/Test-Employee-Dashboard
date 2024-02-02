import { useState } from "react";

function EmployeeRegistrationForm(props) {
    const labels = ["Full Name : ", "Salary : ", "Designation : ", "Department : "]
    const properties = ["empName", "empSalary", "empDesignation", "empDept"]

    const [selectedDepartment, setSelectedDepartment] = useState('')

    // function validate(e, property) {
    //   switch (property) {
    //     case "empName":
            
    //       break;
    //     case "empSalary":

    //       break;

    //     case "empDesignation":

    //       break;

    //     default:
    //       break;
    //   }
    // }


    const [newEmp, setnewEmp] = useState({
      "empId": Number(props.employees[props.employees.length - 1].empId) + 1
    })

    function handleOnChange(e, property) {
      setnewEmp((prevEmp) => {
        return {
          ...prevEmp,
          [property]: e.target.value,
        };
      });
    }

    return (
        <>
            <div>
                <h3>Employee Registration</h3>
            </div>
            <table id="details">
                <tbody>
                    {
                        properties.map((property, index) => {
                            if (property === "empDept") {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <label>{labels[index]}</label>
                                        </td>
                                        <td>
                                            <select id="myList" onChange={(e) => {
                                                handleOnChange(e, property)
                                                setSelectedDepartment(e.target.value)
                                            }}
                                                style={{ cursor: 'pointer' }} value={selectedDepartment} required>
                                                <option value="" disabled hidden>Select Department</option>
                                                {
                                                    props.departments.map((department) => {
                                                        return (
                                                            <option key={department.deptId} value={department.deptId} >{department.deptName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <label>{labels[index]}</label>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    handleOnChange(e, property)
                                                }}
                                                style={{ cursor: 'pointer' }} required
                                            />
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                    <tr>
                        <td>
                            <button onClick={() => {
                                props.setEmployess([...props.employees, newEmp])
                                if (props.employees.findIndex(emp => emp.empId === newEmp.empId)) {
                                    setnewEmp({})
                                    props.homeButton() 
                                    alert("Employee Registered successfully");
                                }
                            }}>Submit</button>
                        </td>
                        <td>
                            <button onClick={() => {
                                setnewEmp({})
                                props.homeButton()
                            }} >Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default EmployeeRegistrationForm;