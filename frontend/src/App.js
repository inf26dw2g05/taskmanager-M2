import { useState } from "react";
import Login from "./components/Login";
import { getToken, removeToken } from "./api";
import "./App.css";

function App() {
  const [logged, setLogged] = useState(getToken() !== null);

  function handleLogin() {
    setLogged(true);
  }

  function handleLogout() {
    removeToken();
    setLogged(false);
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
      <p>Usuario autenticado correctamente.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default App;
