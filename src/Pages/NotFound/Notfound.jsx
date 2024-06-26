import React from 'react'
import { Link } from 'react-router-dom'

function Notfound() {
  return (
    <div>
         <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <h2 className="display-4">Oops! Page Not Found</h2>
        <p className="lead">The page you are looking for could not be found.</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    </div>
    </div>
  )
}

export default Notfound