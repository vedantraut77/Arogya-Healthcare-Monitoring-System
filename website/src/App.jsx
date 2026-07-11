import React from "react";
import "./App.css";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./config/firebase";

// Services
import RealtimeSyncService from "./services/RealtimeSyncService";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Public Pages
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Contact from "./pages/public/Contact";
import Login from "./pages/public/Login";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Patients from "./pages/dashboard/Patients";
import Analytics from "./pages/dashboard/Analytics";

// Dashboard Components
import Alerts from "./components/alerts/Alerts";

function App() {

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return null;
  }

  return (
    <>
      {user && <RealtimeSyncService />}

      <Routes>

        {/* ================= PUBLIC WEBSITE ================= */}

        <Route element={<PublicLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* Always show Login page */}
          <Route
            path="/login"
            element={<Login />}
          />

        </Route>

        {/* ================= DASHBOARD ================= */}

        <Route
          element={
            user
              ? <DashboardLayout />
              : <Navigate to="/" replace />
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/patients"
            element={<Patients />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/alerts"
            element={<Alerts />}
          />

        </Route>

        {/* Unknown Routes */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </>
  );
}

export default App;