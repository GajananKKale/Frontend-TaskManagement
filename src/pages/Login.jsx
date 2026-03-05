import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login({ setToken }) {

    let [user, setUser] = useState({
        email: "",
        password: ""
    })
    let navigate = useNavigate()

    let handleChange = (e) => {
        let { name, value } = e.target
        setUser((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post("http://localhost:8000/api/userlogin", user, { withCredentials: true })
            alert(res.data.message)
            let token = res.data.token
            let userdata = JSON.stringify(res.data.user)
            localStorage.setItem("token", token)
            localStorage.setItem("user", userdata)
            setToken(token)

            navigate("/")
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                console.log(error);
                alert("something went wrong try again")
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Login</h3>

                            <form onSubmit={handleSubmit}>
                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={user.email}
                                        required
                                        name="email"
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        autoComplete="password"
                                        required
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Button */}
                                <button type="submit" className="btn btn-primary w-100">
                                    Login
                                </button>
                            </form>

                            {/* Register Link */}
                            <div className="text-center mt-3">
                                <small>
                                    Don't have an account?{" "}
                                    <Link to="/register">Register here</Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;