import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
function Register() {

    let [userdata, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        image: null
    })
    let navigate = useNavigate()
    let handleChange = (e) => {
        let { name, value, type, files } = e.target
        setUserData((pre) => {
            if (type === "file") {
                return {
                    ...pre,
                    image: files[0]
                }
            }
            return {
                ...pre,
                [name]: value
            }
        })
    }

    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let formData = new FormData()

            formData.append("name", userdata.name)
            formData.append("email", userdata.email)
            formData.append("password", userdata.password)
            formData.append("mobile", userdata.mobile)
            formData.append("image", userdata.image)

            let res = await axios.post("https://backend-taskmanagement-erlm.onrender.com/api/userregister", formData, { withCredentials: true })
            alert(res.data.message)
            navigate("/login")
        }
        catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
                navigate("/register")
            } else {
                alert("Something went wrong, please try again.");
                navigate("/register")
            }
        }
    }


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Register</h3>

                            <form onSubmit={handleSubmit}>

                                {/* Name */}
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your name"
                                        required
                                        name="name"
                                        value={userdata.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        required
                                        name="email"
                                        value={userdata.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        required
                                        name="password"
                                        value={userdata.password}
                                        onChange={handleChange}
                                        autoComplete="password"
                                    />
                                </div>

                                {/* Mobile */}
                                <div className="mb-3">
                                    <label className="form-label">Mobile</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Enter your mobile number"
                                        required
                                        name="mobile"
                                        value={userdata.mobile}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="mb-3">
                                    <label className="form-label">Profile Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        name="image"
                                        onChange={handleChange}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Register
                                </button>

                            </form>

                            <div className="text-center mt-3">
                                <small>
                                    Already have an account?{" "}
                                    <Link to="/login">Login here</Link>
                                </small>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;