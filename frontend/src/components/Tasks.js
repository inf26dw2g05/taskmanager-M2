import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../api";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);

  useEffect(() => {
    async function loadTasks() {
      const data = await getTasks();
      setTasks(data);
    }

    loadTasks();
  }, []);

  async function reloadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await createTask(title, description, false, Number(projectId));

    await reloadTasks();

    setTitle("");
    setDescription("");
    setProjectId("");
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditCompleted(task.completed);
  }

  async function handleUpdate(event) {
    event.preventDefault();

    await updateTask(editingId, editTitle, editDescription, editCompleted);

    await reloadTasks();

    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditCompleted(false);
  }

  async function handleDelete(id) {
    await deleteTask(id);
    await reloadTasks();
  }

  return (
    <div>
      <h2>Tasks</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Project ID"
            value={projectId}
            onChange={(event) => setProjectId(event.target.value)}
          />
        </div>

        <button type="submit">Create Task</button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {editingId === task.id ? (
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                  />

                  <input
                    type="text"
                    value={editDescription}
                    onChange={(event) =>
                      setEditDescription(event.target.value)
                    }
                  />

                  <label>
                    Completed:
                    <input
                      type="checkbox"
                      checked={editCompleted}
                      onChange={(event) =>
                        setEditCompleted(event.target.checked)
                      }
                    />
                  </label>

                  <button type="submit">Save</button>

                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div>
                  <strong>{task.title}</strong> - {task.description}
                  <br />
                  Completed: {task.completed ? "Yes" : "No"}
                  <br />
                  Project ID: {task.project_id}

                  <button onClick={() => startEdit(task)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(task.id)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks;