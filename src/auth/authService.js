import axios from "axios";

export const API_URL = "http://localhost:3001";

// login
export const login = async (email, password) => {
  email = email.trim();
  password = password.trim();

  const res = await axios.get(
    `${API_URL}/users?email=${email}&password=${password}`
  );

  if (res.data.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = res.data[0];
  const token = btoa(`${user.id}:${user.email}`);

  return { user, token };
};

// register
export const register = async (name, email, password) => {
  name = name.trim();
  email = email.trim();
  password = password.trim();

  const check = await axios.get(`${API_URL}/users?email=${email}`);
  if (check.data.length > 0) {
    throw new Error("This email is already registered");
  }

  const res = await axios.post(`${API_URL}/users`, {
    name,
    email,
    password
  });

  const user = res.data;
  const token = btoa(`${user.id}:${user.email}`);

  return { user, token };
};
