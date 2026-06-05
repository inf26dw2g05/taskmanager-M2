import { useEffect, useState } from "react";
import { getProjects, createProject, deleteProject, updateProject} from "../api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects();
      setProjects(data);
    }

    loadProjects();
  }, []);

    async function handleSubmit(event) {
    event.preventDefault();

    await createProject(name, description);

    const data = await getProjects();
    setProjects(data);

    setName("");
    setDescription("");
  }

  async function handleDelete(id) {
  await deleteProject(id);

  const data = await getProjects();
  setProjects(data);
}

function startEdit(project) {
  setEditingId(project.id);
  setEditName(project.name);
  setEditDescription(project.description);
}

async function handleUpdate(event) {
  event.preventDefault();

  await updateProject(editingId, editName, editDescription);

  const data = await getProjects();
  setProjects(data);

  setEditingId(null);
  setEditName("");
  setEditDescription("");
}

  return (
    <div>
      <h2>Projects</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Project name"
            value={name}
            onChange={(event) => setName(event.target.value)}
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

        <button type="submit">Create Project</button>
      </form>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul>
          {projects.map((project) => (
              <li key={project.id}>
                  {editingId === project.id ? (
                      <form onSubmit={handleUpdate}>
                          <input
                              type="text"
                              value={editName}
                              onChange={(event) => setEditName(event.target.value)}
                          />

                          <input
                              type="text"
                              value={editDescription}
                              onChange={(event) => setEditDescription(event.target.value)}
                          />

                          <button type="submit">Save</button>

                          <button type="button" onClick={() => setEditingId(null)}>
                              Cancel
                          </button>
                      </form>
                  ) : (
                      <div>
                          <strong>{project.name}</strong> (ID: {project.id})- {project.description}

                          <button onClick={() => startEdit(project)}>
                              Edit
                          </button>

                          <button onClick={() => handleDelete(project.id)}>
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

export default Projects;