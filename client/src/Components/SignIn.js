import { useState } from 'react';
// import { Email, Lock } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function loginUser(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        })

        const data = await response.json();

        console.log("data", data);

        if (data.token) {
            localStorage.setItem('token', data.token);
            // alert('User logged in successfully');
            navigate('/')
            swal('User logged in successfully', '', 'success');

        } else {
            // alert('Invalid credentials or User does not exist');
            swal('Invalid credentials or User does not exist', '', 'error');
        }

    }

    return (
        // <div>
        //     <form onSubmit={loginUser}>
        //     <input type="email"
        //            value={email}
        //            onChange={(e) => {setEmail(e.target.value)}}
        //            placeholder="Email" 
        //     />
        //     <input type="password"
        //            value={password}
        //            onChange={(e) => {setPassword(e.target.value)}}
        //            placeholder="Password"
        //     />
        //     <input type="submit" value="Login" />
        //   </form>
        // </div>

        <div className='sign_in_form'>
            <form onSubmit={loginUser} className='form'>
                <div>
                    <h1>Login</h1>
                    <hr />
                </div>
                <div>
                    <h3>Email Address</h3>
                    <div className='input_field'>
                        <div className='input_line'></div>
                        {/* <span><Email /></span> */}
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Your Email" />
                    </div>

                </div>
                <div>
                    <h3>Password</h3>
                    <div className='input_field'>
                        <div className='input_line'></div>
                        {/* <span><Lock /></span> */}
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Your Password" />
                    </div>
                </div>
                {/* <input type="submit" value="Login" /> */}
                <button className='button_login' type='submit'>Login</button>
                <h5>Don't have a account yet ? <Link to='/register'>Register</Link></h5>
            </form>
        </div>
    )
}

export default SignIn;
