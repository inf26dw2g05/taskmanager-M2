const API_URL = "http://localhost:3000";

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export async function login(email, password) {
  const response = await fetch(API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return response.json();
}

export async function getUser() {
  const response = await fetch(API_URL + "/users/me", {
    headers: {
      Authorization: "Bearer " + getToken()
    }
  });

  return response.json();
}

export async function getProjects() {
  const response = await fetch(API_URL + "/projects", {
    headers: {
      Authorization: "Bearer " + getToken()
    }
  });

  return response.json();
}

export async function createProject(name, description) {
  const response = await fetch(API_URL + "/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken()
    },
    body: JSON.stringify({
      name,
      description
    })
  });

  return response.json();
}

export async function deleteProject(id) {
  const response = await fetch(API_URL + "/projects/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + getToken()
    }
  });

  return response.json();
}

export async function updateProject(id, name, description) {
  const response = await fetch(API_URL + "/projects/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken()
    },
    body: JSON.stringify({
      name,
      description
    })
  });

  return response.json();
}

export async function getTasks() {
  const response = await fetch(API_URL + "/tasks", {
    headers: {
      Authorization: "Bearer " + getToken()
    }
  });

  return response.json();
}