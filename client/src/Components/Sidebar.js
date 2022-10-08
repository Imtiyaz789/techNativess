import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

    return (
        <div>
            <div>
                <div>
                    <NavLink to='/task/new'>New Task</NavLink>
                    {/* <a href='/hr/leave-status'>Leave Requests</a> */}
                </div>
                <div>
                    <NavLink to='/tasks'>View Task</NavLink>
                    {/* <a href='payroll_hr'>Payroll</a> */}
                </div>
                <div>
                    <NavLink to='/logout'>Logout</NavLink>
                    {/* <a href='/logout'>Logout</a> */}
                </div>

            </div>
        </div>
    )
}

export default Sidebar