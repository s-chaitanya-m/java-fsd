import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>

      <a href={import.meta.env.VITE_BACKEND_URL + "/oauth2/authorize/google"}>
        Login with Google
      </a>
    </form>
  );
};

export default Login;
