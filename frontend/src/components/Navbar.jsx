import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { usePermission } from "../hooks/usePermission";
import { useContext } from "react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { can } = usePermission();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div style={styles.nav}>
      {/* Left */}
      <div style={styles.left}>
        <span style={styles.logo}>TaskTracker</span>

        <Link to="/projects">Projects</Link>

        <Link to="/">My Tasks</Link>

        {/* Admin only */}
        {user?.role === "ADMIN" && (
          <Link to="/admin">Admin</Link>
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