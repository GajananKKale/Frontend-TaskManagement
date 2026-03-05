import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Updatetask() {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "pending",
        priority: "low",
        duedate: ""
    });

    const [loading, setLoading] = useState(true);

    // Fetch task by ID
    const getTaskById = async () => {
        try {
            const res = await axios.get(
                `https://backend-taskmanagement-erlm.onrender.com/api/gettask/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            const data = res.data.task;

            setTask({
                title: data.title || "",
                description: data.description || "",
                status: data.status || "pending",
                priority: data.priority || "low",
                duedate: data.duedate
                    ? data.duedate.substring(0, 10)
                    : ""
            });

            setLoading(false);

        } catch (error) {
            console.error(error);
            alert("Failed to load task");
            navigate("/viewtask");
        }
    };

    useEffect(() => {
        getTaskById();
    }, []);

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
            const res = await axios.put(
                `https://backend-taskmanagement-erlm.onrender.com/api/updatetask/${id}`,
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
            console.error(error);
            alert("Update failed");
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h5>Loading task...</h5>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Update Task</h3>

                            <form onSubmit={handleSubmit}>

                                {/* Title */}
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={task.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="description"
                                        value={task.description}
                                        onChange={handleChange}
                                        required
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
                                        <option value="medium">Medium</option>
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


                                <button type="submit" className="btn btn-success w-100">
                                    Update Task
                                </button>
                            </form>

                            <div className="text-center mt-3">
                                <Link to="/viewtask" className="text-decoration-none">
                                    Back to Tasks
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Updatetask;