import React, { useState } from 'react'
import Styles from './Register.module.css'
import { Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        gender: 'male',
        dateOfBirth: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); 

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            alert('Please fill in all the fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/LaptopAPI/web/users', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Success:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className={Styles.container}>
            <div className="container form-container d-flex justify-content-center align-items-center vh-100">
                <div className="form-wrapper bg-white p-4 shadow rounded w-50">
                    <h2 className="text-center mb-4">Registration Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter username"
                                onChange={handleInputChange}
                                name="username"
                                value={formData.username}
                            />
                            {errors.username && <div className="text-danger">{errors.username}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                onChange={handleInputChange}
                                name="email"
                                value={formData.email}
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                onChange={handleInputChange}
                                name="password"
                                value={formData.password}
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select
                                className="form-select"
                                id="gender"
                                onChange={handleInputChange}
                                name="gender"
                                value={formData.gender}
                            >
                                <option value="DEFAULT" disabled>Choose...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <div className="text-danger">{errors.gender}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dob"
                                onChange={handleInputChange}
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                            />
                            {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                        <div className="mt-3"><Link to="/login">Already have an account? Login</Link></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;
