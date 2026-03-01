const API_BASE = "http://localhost:5000/api/v1";

export const api = async (path, opts = {}, token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  return res.json();
};
