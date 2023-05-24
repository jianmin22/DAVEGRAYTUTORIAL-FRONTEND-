
import { Link } from "react-router-dom"

const Lounge = () => {
    return (
        <section>
            <h1>Employee Settings available for editor and admin</h1>
            <Link to="/editEmployees">Edit Employees</Link>
            <Link to="/addEmployee">Add Employee</Link>
            <br/>
            <Link to="/">Home</Link>
        </section>
    )
}

export default Lounge;