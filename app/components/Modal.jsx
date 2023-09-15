import { useState, useEffect } from "react";

export default function Modal({
                                  isOpen,
                                  onRequestClose,
                                  onCreate,
                                  onUpdate,
                                  onDelete,
                                  task,
                                  deleteTask,
                              }) {
    const [title, setTitle] = useState("");

    useEffect(() => {
        setTitle(task.title || "");
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = { ...task, title };
        if (task.id) {
            onUpdate(updatedTask);
        } else {
            onCreate(updatedTask);
        }
        setTitle("");
    };

    const handleDelete = () => {
        onDelete(deleteTask.id);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {deleteTask ? (
                <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                    <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                    <p>Are you sure you want to delete this task?</p>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onRequestClose}
                            className="btn btn-secondary mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                    <h2 className="text-xl font-bold mb-4">
                        {task.id ? "Edit Task" : "Create Task"}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Task title"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={onRequestClose}
                                className="btn btn-secondary mr-2"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {task.id ? "Save Changes" : "Create Task"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
