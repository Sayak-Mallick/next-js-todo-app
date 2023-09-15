'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@/app/components/Modal";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState({});
    const [loading, setLoading] = useState(true);
    const [deleteTask, setDeleteTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:3005/tasks");
            setTasks(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const openModal = (task) => {
        setCurrentTask(task);
        setModalOpen(true);
    };

    const closeModal = () => {
        setCurrentTask({});
        setModalOpen(false);
        setDeleteTask(null);
    };

    const handleCreate = async (task) => {
        try {
            await axios.post("http://localhost:3005/tasks", task);
            fetchTasks();
            closeModal();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleUpdate = async (task) => {
        try {
            await axios.put(`http://localhost:3005/tasks/${task.id}`, task);
            fetchTasks();
            closeModal();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDelete = (taskId) => {
        const taskToDelete = tasks.find((task) => task.id === taskId);
        setDeleteTask(taskToDelete);
        setModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3005/tasks/${deleteTask.id}`);
            fetchTasks();
            closeModal();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {tasks.length === 0 ? (
                        <p>No tasks available. Create a task to get started.</p>
                    ) : (
                        <ul>
                            {tasks.map((task) => (
                                <li
                                    key={task.id}
                                    className={`flex justify-between items-center ${
                                        task.completed ? "line-through" : ""
                                    }`}
                                >
                                    <span>{task.title}</span>
                                    <div>
                                        <button
                                            className="btn btn-primary mr-2"
                                            onClick={() => openModal(task)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(task.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => openModal({})}
                    >
                        Create Task
                    </button>
                </>
            )}

            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={confirmDelete}
                task={currentTask}
                deleteTask={deleteTask}
            />
        </div>
    );
}
