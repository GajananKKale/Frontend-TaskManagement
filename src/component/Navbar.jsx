import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ token, setToken, }) {

    let navigate = useNavigate()
    let logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken(null)
        navigate("/login")
    }
    let user = JSON.parse(localStorage.getItem("user"))

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src="/g.webp" alt="Logo" height="50" width="50" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    {
                        (!token || token === "null" || token === "undefined")
                            ?
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </ul>
                            :
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={`/userprofile/${user._id}`}>Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/addtask">Addtask</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/viewtask">viewtask</Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        onClick={logout}
                                        className="btn btn-link nav-link text-danger"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                    }

                </div>
            </div>
        </nav>
    );
}

export default Navbar;