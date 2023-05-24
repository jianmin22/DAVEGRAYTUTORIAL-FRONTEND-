import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Employees = () => {
    const [employees, setEmployees] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getEmployees = async () => {
            try {
                const response = await axiosPrivate.get('/employees', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setEmployees(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getEmployees();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Employee List</h2>
            {employees?.length
                ? (
                    <ul>
                        {employees.map((employee, i) => <li key={i}>{employee?.firstname +" "+ employee?.lastname}</li>)}
                    </ul>
                ) : <p>No employees to display</p>
            }
        </article>
    );
};

export default Employees;
