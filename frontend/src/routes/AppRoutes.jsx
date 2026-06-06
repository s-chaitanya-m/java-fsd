import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ProtectedRoute from "../auth/ProtectedRoute";
import ProjectPage from "../pages/ProjectPage";
import ProjectDetails from "../pages/ProjectDetails";
import AdminRoute from "../auth/AdminRoute";
import AdminPanel from "../pages/AdminPanel";
import UserPage from "../pages/UserPage";
import Navbar from "../components/Navbar";

const AppRoutes = () => (
  <BrowserRouter>
    <div className="min-h-screen bg-slate-50">

      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
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
            path="/users"
            element={
              <ProtectedRoute>
                <UserPage />
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
      </main>
    </div>
  </BrowserRouter>
);

export default AppRoutes;
