import React, { useState, useRef, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
    const taksNavigation = useNavigate();
    const focusOnField = useRef(null);
    const [priority, setPriority] = useState('');
    const [newTask, setNewTask] = useState({
        taskName: '',
        assigndTo: '',
        description: '',
        dueDate: ''
    });

    useEffect(() => {
        focusOnField.current.focus();
    }, [])
    const addTask = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');
        let decoded = jwt_decode(token);
        let email = decoded.email;

        const response = await fetch('http://localhost:8000/api/user/task/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                taskName: newTask.taskName,
                assigndTo: newTask.assigndTo,
                description: newTask.description,
                priority: priority,
                dueDate: newTask.dueDate,
                user: email
            })

        })


        const data = await response.json();
        console.log(" data", data);
        if (response.status === 200) {
            swal(' New Task added successfully', '', 'success');
            taksNavigation('/');
        }
        else {
            swal('Something went wrong', 'All Fields are Required', 'error');
            taksNavigation('/task/new');
        }


    }
    const onChange = (e) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name]: value
        })
        setPriority()
    }

    return (

        <div className='payroll_main_container container'>
            <div className='payroll_heading' >
                <h3>Tasks</h3>
            </div>
            <hr />
            <form onSubmit={addTask}>
                <div className='form-container'>
                    <table className='table rounded p-2'>
                        <thead>
                            <tr className='table-info rounded'>
                                <th scope='col' className='m2'>Task Name</th>
                                <th scope='col' className='m2'>Assigned To</th>
                                <th scope='col' className='m2'>Description</th>
                                <th scope='col' className='m2'>Due Date</th>
                                <th scope='col' className='m2'>Priority</th>
                            </tr>
                        </thead>
                        <tbody>

                            {/* below is hra */}
                            <tr>
                                <td>
                                    <input type='text' className='form-control' id='taskName'
                                        // defaultValue={payroll.hra}
                                        onChange={onChange}
                                        ref={focusOnField}
                                        placeholder='Task Name' />
                                </td>
                                <td>
                                    <input type='text' className='form-control' id='assignedTo'
                                        // defaultValue={payroll.hra}
                                        onChange={onChange}
                                        placeholder='Assigned To' />
                                </td>
                                <td>
                                    <input type='text' className='form-control' id='desc'
                                        // defaultValue={payroll.hra}
                                        onChange={onChange}
                                        placeholder='Description' />
                                </td>
                                <td>
                                    <input type='date' className='form-control' id='dueDate'
                                        // defaultValue={payroll.hra}
                                        onChange={onChange}
                                        placeholder='Due Date' />
                                </td>
                                <td>
                                    {/* <input type='text' className='form-control' id='priority'
                                        // defaultValue={payroll.hra}
                                        onChange={onChange}
                                        placeholder='Priority' /> */}
                                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                        <option style={{ display: 'none' }}></option>
                                        <option value="High">High</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <button type='submit' className='add_salary_btn' onClick={() => setNewTask(newTask)}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default Tasks