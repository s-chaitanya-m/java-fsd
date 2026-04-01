import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user?.role !== "ADMIN") {
    return <div>Access Denied</div>;
  }

  return children;
};

export default AdminRoute;
