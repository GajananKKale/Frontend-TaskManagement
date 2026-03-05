import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container mt-5">
            {/* Hero Section */}
            <div className="text-center bg-light p-5 rounded shadow-sm">
                <h1 className="display-4 fw-bold mb-3">Welcome to Your Task Manager</h1>
                <p className="lead mb-4">
                    Manage your tasks efficiently, set priorities, and never miss a deadline.
                    Built with React and Bootstrap for a smooth experience.
                </p>
                <Link to="/addtask" className="btn btn-primary btn-lg">
                    Add a Task
                </Link>
            </div>

            {/* Feature Cards */}
            <div className="row mt-5 g-4">
                <div className="col-md-4">
                    <div className="card shadow-sm h-100 text-center">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Organize Tasks</h5>
                            <p className="card-text">
                                Keep all your tasks in one place and manage them with ease.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm h-100 text-center">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Set Priorities</h5>
                            <p className="card-text">
                                Mark tasks as High, Medium, or Low priority to stay focused.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm h-100 text-center">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Track Deadlines</h5>
                            <p className="card-text">
                                Never miss a task with clear due dates and reminders.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Call-to-Action */}
            <div className="text-center mt-5">
                <Link to="/viewtask" className="btn btn-outline-primary btn-lg">
                    View All Tasks
                </Link>
            </div>
        </div>
    );
}

export default Home;