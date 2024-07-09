import React, { useState } from 'react';
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import "../../css/register.css"
import { useNavigate, NavLink } from 'react-router-dom';
// import Navbar from '../../Pages/navbar';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "",role: "tenant", password: "" })
  let navigate = useNavigate()

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        role: credentials.role,
        password: credentials.password
      })
    });
  
    const json = await response.json();
  
    if (json.success) {
      // Save user details to local storage
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('token', json.authToken);
      
      // Assuming the server sends back the user ID in the response
      const userId = json.userId;
      localStorage.setItem('userId', userId);
  
      if (credentials.role === 'landlord') {
        navigate("/landlordProfile");
      } else {
        navigate("/home");
      }
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div>
    
      <div className="register-page">
      <div className={registerstyle.register}>
        <form onSubmit={handleSubmit}>
          <h1>Create your account</h1>
          
          <select
            name="role"
            id="role"
            onChange={onChange}
            value={credentials.role}
          >
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
          </select>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            onChange={onChange}
            value={credentials.name}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={onChange}
            value={credentials.email}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={onChange}
            value={credentials.password}
          />
          <button className={basestyle.button_common}>
            Sign Up
          </button>
        </form>
        <NavLink to="/">Already registered? Sign in</NavLink>
      </div>
    </div>
    </div>
  );
}

