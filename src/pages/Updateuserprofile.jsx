import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Updateuserprofile() {
    // Load user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    let token = localStorage.getItem("token")
    let navigate = useNavigate()

    const [userdata, setUserData] = useState({
        name: storedUser.name || "",
        mobile: storedUser.mobile || "",
        email: storedUser.email,
        image: null,
    });

    const [preview, setPreview] = useState(
        storedUser.image ? `https://backend-taskmanagement-erlm.onrender.com/uploads/${storedUser.image}` : null
    );

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setUserData((prev) => ({ ...prev, image: files[0] }));
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setUserData((prev) => ({ ...prev, [name]: value }));
        }
    };

    let handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", userdata.name);
        formData.append("mobile", userdata.mobile);
        if (userdata.image) formData.append("image", userdata.image);
        try {
            let res = await axios.put(`https://backend-taskmanagement-erlm.onrender.com/api/updateuser/${storedUser._id}`,
                formData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
            alert(res.data.message)
            let user = res.data.user
            localStorage.setItem("user", JSON.stringify(user))
            navigate(`/userprofile/${user._id}`)
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert("user is not updated try again")
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Update Profile</h3>

                            <form onSubmit={handleSubmit}>
                                {/* Profile Image Preview */}
                                <div className="mb-3 text-center">
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Profile Preview"
                                            className="rounded-circle img-thumbnail mb-3"
                                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                        />
                                    ) : (
                                        <div
                                            className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-3"
                                            style={{ width: "150px", height: "150px" }}
                                        >
                                            <span className="text-white fs-4">No Image</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        name="image"
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Name */}
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={userdata.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Email (read-only) */}
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={userdata.email}
                                        readOnly
                                        disabled
                                    />
                                </div>

                                {/* Mobile */}
                                <div className="mb-3">
                                    <label className="form-label">Mobile</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="mobile"
                                        value={userdata.mobile}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Update Button */}
                                <button type="submit" className="btn btn-success w-100">
                                    Update Profile
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Updateuserprofile;