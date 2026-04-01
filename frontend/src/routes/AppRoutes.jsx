import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ProtectedRoute from "../auth/ProtectedRoute";
import ProjectPage from "../pages/ProjectPage";
import ProjectDetails from "../pages/ProjectDetails";
import AdminRoute from "../auth/AdminRoute";
import AdminPanel from "../pages/AdminPanel";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ProjectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:projectId"
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
