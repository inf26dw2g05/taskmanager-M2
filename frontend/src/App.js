import { useState } from "react";

import Login from "./components/Login";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import Tasks from "./components/Tasks";

import { getToken, removeToken } from "./api";

import "./App.css";

function App() {
  const [logged, setLogged] = useState(getToken() !== null);
  const [page, setPage] = useState("profile");

  function handleLogin() {
    setLogged(true);
  }

  function handleLogout() {
    removeToken();
    setLogged(false);
  }

  function renderPage() {
    if (page === "profile") {
      return <Profile />;
    }

    if (page === "projects") {
      return <Projects />;
    }

    if (page === "tasks") {
      return <Tasks />;
    }
  }

  if (!logged) {
    return (
      <div className="App">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>TaskManager</h1>

      <button onClick={() => setPage("profile")}>
        Profile
      </button>

      <button onClick={() => setPage("projects")}>
        Projects
      </button>

      <button onClick={() => setPage("tasks")}>
        Tasks
      </button>

      <button onClick={handleLogout}>
        Logout
      </button>

      <hr />

      {renderPage()}
    </div>
  );
}

export default App;
