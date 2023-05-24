import { useState, useEffect } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from 'react-router-dom';

const EditEmployees = () => {
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

    const handleFirstNameChange = (event, employeeId) => {
        const updatedEmployees = employees.map(employee => {
            if (employee._id === employeeId) {
                return { ...employee, firstname: event.target.value };
            }
            return employee;
        });
        setEmployees(updatedEmployees);
    }

    const handleLastNameChange = (event, employeeId) => {
        const updatedEmployees = employees.map(employee => {
            if (employee._id === employeeId) {
                return { ...employee, lastname: event.target.value };
            }
            return employee;
        });
        setEmployees(updatedEmployees);
    }

    const handleEdit = async (employeeId) => {
        try {
            const updatedEmployee = employees.find(employee => employee._id === employeeId);
            const response = await axiosPrivate.put('/employees',
                JSON.stringify({ id: employeeId, firstname: updatedEmployee.firstname, lastname: updatedEmployee.lastname }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            if (response?.status == 200) {
                alert('updated');
            }
        } catch (err) {
            if (!err?.response) {
                alert('No Server Response');
            } else if (err.response?.status === 401) {
                alert('Unauthorized');
                navigate('/login', { state: { from: location }, replace: true });
            } else {
                alert('Edit employee failed');
            }
        }
    }


    return (
        <section>
            <div>
                <h1>Employee List</h1>
                {employees?.length
                    ? <ul>
                        {employees.map((employee, i) => (
                            <div key={i}>
                                <label>First Name:</label>
                                <input
                                    type="text"
                                    value={employee.firstname}
                                    onChange={event => handleFirstNameChange(event, employee._id)}
                                />
                                <br />
                                <label>Last Name:</label>
                                <input
                                    type="text"
                                    value={employee.lastname}
                                    onChange={event => handleLastNameChange(event, employee._id)}
                                />
                                <br />
                                <button onClick={() => handleEdit(employee._id)}>Save</button>
                            </div>
                        ))}
                    </ul> :
                    <p>No employees to display</p>}
                <Link to="/lounge">Go to the Lounge</Link>
            </div>

        </section>
    )
}


export default EditEmployees;
