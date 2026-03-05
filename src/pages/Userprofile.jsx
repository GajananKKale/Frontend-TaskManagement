import React from "react";
import { useNavigate } from "react-router-dom";

function Userprofile({ }) {

    let user = JSON.parse(localStorage.getItem("user"))
    let navigate = useNavigate()
    let updateuserprofile = (id) => {
        navigate(`/updateprofile/${id}`)
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow">
                        <div className="card-body text-center">
                            <h3 className="mb-4">User Profile</h3>

                            {/* Profile Image */}
                            <div className="mb-3">
                                {user.image ? (
                                    <img
                                        src={user.image ? `http://localhost:8000/uploads/${user.image}` : null}
                                        alt="Profile"
                                        className="rounded-circle img-thumbnail"
                                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                    />
                                ) : (
                                    <div
                                        className="rounded-circle bg-secondary d-flex align-items-center justify-content-center"
                                        style={{ width: "150px", height: "150px" }}
                                    >
                                        <span className="text-white fs-4">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Name */}
                            <p>
                                <strong>Name: </strong> {user.name}
                            </p>

                            {/* Email */}
                            <p>
                                <strong>Email: </strong> {user.email}
                            </p>

                            {/* Mobile */}
                            <p>
                                <strong>Mobile: </strong> {user.mobile}
                            </p>

                            {/* Optional Action Button */}
                            <button className="btn btn-primary mt-3" onClick={() => updateuserprofile(user._id)}>Edit Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Userprofile;