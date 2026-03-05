import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-dark text-light mt-5 py-4">
            <div className="container">
                <div className="row">

                    {/* Brand */}
                    <div className="col-md-4 mb-3">
                        <h5>MyApp</h5>
                        <p className="small">
                            Simple React app with Bootstrap styling.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="col-md-4 mb-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link className="text-light text-decoration-none" to="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className="text-light text-decoration-none" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link className="text-light text-decoration-none" to="/register">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-md-4 mb-3">
                        <h5>Contact</h5>
                        <p className="small mb-1">email@example.com</p>
                        <p className="small">+1 234 567 890</p>
                    </div>

                </div>

                <hr className="border-secondary" />

                <div className="text-center small">
                    © {new Date().getFullYear()} MyApp. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;