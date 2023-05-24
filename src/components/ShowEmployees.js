import { Link } from "react-router-dom";
import Employees from './EmployeeList';

const ShowEmployees = () => {
    return (
        <section>
            <h1>Show Employee Page</h1>
            <br />
            <Employees />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
                
            </div>
            <Link to="/linkpage">Go to the Link Page</Link>
        </section>
    )
}

export default ShowEmployees