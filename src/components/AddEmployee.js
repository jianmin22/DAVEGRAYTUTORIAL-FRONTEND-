import { useRef, useState, useEffect } from 'react';
import {useNavigate, useLocation, Link } from 'react-router-dom';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AddEmployee = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const addEmployeeRef = useRef();
    const errRef = useRef();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        addEmployeeRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [firstname, lastname])

    const handleAddEmployee = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post('/employees',
                JSON.stringify({ firstname, lastname }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            if (response?.status == 201) {
                alert('Employee Added!')
                setFirstname('');
                setLastname('');
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Firstname or Lastname');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
                navigate('/login', { state: { from: location }, replace: true });
            } else {
                setErrMsg('Add Employee Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Add Employee</h1>
            <form onSubmit={handleAddEmployee}>
                <label htmlFor="Firstname">Firstname:</label>
                <input
                    type="text"
                    id="firstname"
                    ref={addEmployeeRef}
                    autoComplete="off"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                    required
                />

                <label htmlFor="Lastname">Lastname:</label>
                <input
                    type="text"
                    id="lastname"
                    ref={addEmployeeRef}
                    autoComplete="off"
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                    required
                />
                <button>Add Employee</button>
            </form>
            <Link to="/lounge">Go to the Lounge</Link>
        </section>


    )
}

export default AddEmployee
