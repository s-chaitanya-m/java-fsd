import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) return;

  return (
    <div style={styles.nav}>
      {/* Left */}
      <div style={styles.left}>
        <span style={styles.logo}>TaskTracker</span>

        <NavLink
          to="/"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: isActive ? "underline" : "None",
          })}
        >
          My Tasks
        </NavLink>
        <NavLink
          to="/projects"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: isActive ? "underline" : "None",
          })}
        >
          Projects
        </NavLink>

        {/* Admin only */}
        {user?.role === "ADMIN" && (
          <NavLink
            to="/admin"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: isActive ? "underline" : "None",
            })}
          >
            Admin
          </NavLink>
        )}
      </div>

      {/* Right */}
      <div style={styles.right}>
        <span>{user?.email}</span>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    borderBottom: "1px solid #ccc",
    background: "#f9f9f9",
  },
  left: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  right: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  logo: {
    fontWeight: "bold",
  },
};

export default Navbar;
