import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAdmin from "./ProtectedAdmin";
import { AdminProvider } from "./context/Admin.Context.jsx";
import AdminUserList from "./pages/AdminUserList";
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
      <AdminProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>

              {/* ruta admin */}
              <Route element={<ProtectedAdmin />}>
              <Route path="/admin" element={<AdminPage />}></Route>
              <Route path="/users" element={<AdminUserList />} />
              </Route>

              {/* rutas protegidas */}
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />}></Route>
                <Route path="/add-task" element={<TaskFormPage />}></Route>
                <Route path="/tasks/:id" element={<TaskFormPage />}></Route>
                {/* <Route path="/profile" element={<ProfilePage />}></Route> */}
              </Route>
            </Routes>
            <Footer />
          </main>
        </BrowserRouter>
        </AdminProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
