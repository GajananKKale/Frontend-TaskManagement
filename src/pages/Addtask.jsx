import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddTask() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "pending",
        priority: "low",
        duedate: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8000/api/addtask",
                task,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            alert(res.data.message);
            navigate("/viewtask");

        } catch (error) {
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong. Task not added.");
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Add New Task</h3>

                            <form onSubmit={handleSubmit}>

                                {/* Title */}
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter task title"
                                        required
                                        name="title"
                                        value={task.title}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Enter task description"
                                        required
                                        name="description"
                                        value={task.description}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Status */}
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        name="status"
                                        value={task.status}
                                        onChange={handleChange}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                {/* Priority */}
                                <div className="mb-3">
                                    <label className="form-label">Priority</label>
                                    <select
                                        className="form-select"
                                        name="priority"
                                        value={task.priority}
                                        onChange={handleChange}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option> {/* fixed */}
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                {/* Due Date */}
                                <div className="mb-3" onClick={() => document.getElementById("duedate").showPicker()}>
                                    <label className="form-label" htmlFor="duedate">Due Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        required
                                        name="duedate"
                                        value={task.duedate}
                                        onChange={handleChange}
                                        id="duedate"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Add Task
                                </button>
                            </form>

                            <div className="text-center mt-3">
                                <Link to="/" className="text-decoration-none">
                                    Back to Home
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTask;