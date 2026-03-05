import React from "react";
import { Link } from "react-router-dom";

function Pagenotfound() {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light"
            style={{ fontFamily: "Arial, sans-serif" }}
        >
            {/* Big 404 */}
            <h1 className="display-1 fw-bold text-danger">404</h1>

            {/* Message */}
            <h3 className="mb-3">Oops! Page Not Found</h3>
            <p className="text-muted mb-4">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            {/* Home Button */}
            <Link to="/" className="btn btn-primary btn-lg shadow">
                Go Back Home
            </Link>

            {/* Optional Illustration */}
            <div className="mt-5">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                    alt="404 Illustration"
                    style={{ width: "200px", opacity: 0.7 }}
                />
            </div>
        </div>
    );
}

export default Pagenotfound;