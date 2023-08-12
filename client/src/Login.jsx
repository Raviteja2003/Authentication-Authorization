import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login()
{
    axios.defaults.withCredentials=true;
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(
                'http://localhost:3001/api/auth/login',
                { email, password },
                { withCredentials: true }
            );
    
           // console.log(result.data);
    
            if (result.data.status === true) {
                localStorage.setItem('token', result.data.token);
                console.log("Role:", result.data.role);
                if (result.data.role === "admin") {
                    console.log("Navigating to admin");
                    navigate('/dashboard');
                } else {
                    console.log("Navigating to home");
                    navigate('/home');
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    
    return (
        <div className=" flex h-screen bg-gray-500 justify-center items-center">
            <div className=" bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2 className="font-bold text-xl text-center">Login</h2>
                    
                    <div className="mb-3">
                        <label htmlFor="">
                            <strong>Email</strong>
                        </label>
                        <input 
                            type = "email"
                            placeholder="Enter Email"
                            name="email"
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                            onChange={(e)=> setEmail(e.target.value)}
                        />  
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type = "password"
                            placeholder="Enter Password"
                            name="password"
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                            onChange={(e)=> setPassword(e.target.value)}
                        />  
                    </div>
                    <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-500 w-full">Login</button>
                </form>
                <p className="mb-3">Did Not  Have An Account?</p>
                <Link to='/register' className=" block text-center w-full bg-slate-400 p-2 rounded no-underline">SignUp</Link>
            </div>
        </div>
    )
}

export default Login;