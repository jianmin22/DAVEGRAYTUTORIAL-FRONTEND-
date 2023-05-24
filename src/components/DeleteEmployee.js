import { useState, useEffect } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation ,Link } from 'react-router-dom';

const DeleteEmployee = () => {
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
    }, []);


    const handleDelete = async (id) => {
        try {
            const response = await axiosPrivate.delete('/employees',
            { data: {id} },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            alert("success");
            
        } catch (err) {
            if (!err?.response) {
                alert('No Server Response');
            } else if (err.response?.status === 401) {
                alert('Unauthorized');
                navigate('/login', { state: { from: location }, replace: true });
            } else {
                alert('Delete employee failed');
            }
        }
    }


    return (
        <section>
            <h1>Delete Employee</h1>
            <br />
            <div>
                <h1>Delete Employee</h1>
                {employees?.length
                    ? <ul>
                        {employees.map((employee, i) => (
                            <div>
                                <li key={i}>
                                {employee?.firstname + " " + employee?.lastname}
                            </li>
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </div>
                            
                            
                        ))}
                    </ul> :
                    <p>No employees to display</p>}

            </div>
            <Link to="/admin">Admin Page</Link>
        </section>
    )
}


export default DeleteEmployee;
