import { Link, useNavigate } from 'react-router-dom';
import Styles from './Login.module.css'
import React, { useState } from 'react'
import axios from 'axios';
import { useUser } from '../../Components/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch existing users
      const response = await axios.get('http://localhost:8081/LaptopAPI/web/users');
      const users = response.data;
      //write logic to check if the entered credentials match any user

      console.log(users)

      // Check if the entered credentials match any user
      const user = users.find(user => user.email === email && user.password === password);

      console.log(user)

      if (user) {
        // Credentials are correct
        setUser(user);
        console.log(user);
        console.log(user.id);
        navigate('/dashboard');
      } else {
        // Credentials are incorrect
        setError('Invalid username or password.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const { setUser } = useUser();
  return (
    <>
     
       <div className={Styles.container}>
       <div className="container mt-5 " >
          <div className="row justify-content-center ">
            <div className="col-md-6 ">
              <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                  <h3 className="card-title text-center">Login</h3>
                  <form>
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        onChange={handleEmailChange}
                        value={email}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        value={password}
                      />
                    </div>
                    {error && <p className="text-danger text-center">{error}</p>}
                    <button type="submit" className="btn btn-primary btn-block w-100 mt-3" onClick={handleSubmit}>
                      Login
                    </button>
                    <p className="mt-3 text-center">Don't have an account? <Link to="/register">Register</Link></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>
     
    </>


  )
}

export default Login 