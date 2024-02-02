function addEmployeeButtonHandler(selectedEmployee, setSelectedEmployee, setAddEmpFlag) {
    if (Object.keys(selectedEmployee).length === 0) {
        setAddEmpFlag(true)
    } else {
        setSelectedEmployee({})
        setAddEmpFlag(true)
    }
}

const NavBar = (props) => {
    return (
        <nav>
            {
                props.names.map((name) => {
                    if (name.val === "Add Employee") {
                        return (
                            <input
                                key={name.val} type="button" value={name.val}
                                onClick={() => addEmployeeButtonHandler(props.selectedEmployee, props.setSelectedEmployee, props.setAddEmpFlag)}
                            />
                        )
                    } else {
                        return (
                            <input
                                key={name.val} type="button" value={name.val}
                                onClick={() => name.func(true)}
                            />
                        )
                    }
                })
            }
        </nav>
    )
}


export default NavBar;