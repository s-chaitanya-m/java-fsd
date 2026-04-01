import { useAuth } from "../auth/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (user?.role !== "ADMIN") {
    return <div>Access Denied</div>;
  }

  return children;
};

export default AdminRoute;