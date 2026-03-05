import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Viewasks() {
    let token = localStorage.getItem("token")
    let [task, setTask] = useState([])
    let navigate = useNavigate()

    let getTasks = async () => {
        let res = await axios.get("http://localhost:8000/api/gettasks", {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        setTask(res.data.tasks)
    }

    useEffect(() => {
        getTasks()
    }, [])

    let HandleDelete = async (id) => {
        let res = await axios.delete(`http://localhost:8000/api/deletetask/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        alert(res.data.message)
        // console.log(res.data);
        getTasks()
    }

    let HandleUpdate = (id) => {
        navigate(`/updatetask/${id}`)
    }

    return (
        <div className="container mt-5">

            {/* Page Title */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Your Tasks</h2>
                <span className="badge bg-primary">
                    Total: {task.length}
                </span>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">

                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">

                            <thead className="table-dark">
                                <tr>
                                    <th>Sr.</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Due Date</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {task.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-muted">
                                            No tasks available
                                        </td>
                                    </tr>
                                ) : (
                                    task.map((t, index) => (
                                        <tr key={t._id}>
                                            <td>{index + 1}</td>
                                            <td className="fw-semibold">
                                                {t.title}
                                            </td>

                                            <td className="text-muted">
                                                {t.description}
                                            </td>

                                            <td>
                                                <span className={
                                                    t.status === "completed"
                                                        ? "badge bg-success"
                                                        : "badge bg-warning text-dark"
                                                }>
                                                    {t.status}
                                                </span>
                                            </td>

                                            <td>
                                                <span className={
                                                    t.priority === "high"
                                                        ? "badge bg-danger"
                                                        : t.priority === "midium"
                                                            ? "badge bg-warning text-dark"
                                                            : "badge bg-info text-dark"
                                                }>
                                                    {t.priority}
                                                </span>
                                            </td>

                                            <td>
                                                {new Date(t.duedate).toLocaleDateString()}
                                            </td>

                                            <td className="text-center">
                                                <button
                                                    className="btn btn-sm btn-primary me-2"
                                                    onClick={() => HandleUpdate(t._id)}
                                                >
                                                    Update
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => HandleDelete(t._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}



export default Viewasks