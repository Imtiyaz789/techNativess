import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwd_confirm, setPwd_confirm] = useState('')

    async function registerUser(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:8000/api/register', {
            // credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                pwd_confirm
            })
        })

        const data = await response.json();
        if (response.status === 201) {
            swal('Signup successfully', '', 'success');
            navigate('/');
        }
        else {
            swal('Something went wrong', 'All Fields are Required', 'error');
        }
        console.log(data);
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    placeholder="Name"
                />
                <input type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    placeholder="Email"
                />
                <input type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    placeholder="Password"
                />
                <input type="password"
                    value={pwd_confirm}
                    onChange={(e) => { setPwd_confirm(e.target.value) }}
                    placeholder="Confirm Password"
                />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
}

export default Signup;
