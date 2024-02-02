import NavBar from "./NavBar";

const Header = (props) => {
    return (
        <div id="navdiv">
            <NavBar 
            names={[{ val: "Home", func: props.homeButton }, { val: "Add Employee", func: "" }]} 
            setAddEmpFlag={props.setAddEmpFlag}
            selectedEmployee={props.selectedEmployee}
            setSelectedEmployee={props.setSelectedEmployee}
            />
        </div>
    )
}

export default Header;