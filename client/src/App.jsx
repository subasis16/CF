import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Pricing from "./pages/Pricing";
import InstructorDashboard from "./pages/InstructorDashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./components/AdminRoute";
import Admin from "./pages/admin";
import CourseDetails from "./pages/CourseDetails";
import LearnCourse from "./pages/LearnCourse";
import Checkout from "./pages/Checkout";
import Notes from "./pages/Notes";
import OAuthSuccess from "./pages/OAuthSuccess";
import StudentDashboard from "./pages/StudentDashboard";



function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <Admin />
                  </AdminRoute>
                }
              />

              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />

              <Route
                path="/learn/:id"
                element={
                  <ProtectedRoute roles={["student", "instructor", "admin"]}>
                    <LearnCourse />
                  </ProtectedRoute>
                }
              />

              <Route path="/pricing" element={<Pricing />} />

              <Route
                path="/instructor"
                element={
                  <ProtectedRoute roles={["instructor", "admin"]}>
                    <InstructorDashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="/dashboard" element={<StudentDashboard />} />



              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute roles={["student", "instructor", "admin"]}>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route path="/notes" element={<Notes />} />


              <Route
                path="/checkout/course/:id"
                element={
                  <ProtectedRoute roles={["student", "instructor", "admin"]}>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout/plan/:plan"
                element={
                  <ProtectedRoute roles={["student", "instructor", "admin"]}>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              <Route path="/oauth-success" element={<OAuthSuccess />} />


            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

