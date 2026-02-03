import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import ProtectedRoute from "../auth/ProtectedRoute";
import AppShell from "../components/layout/AppShell";
import Sidebar from "../components/layout/Sidebar/Sidebar";

import Home from "../pages/Home";
import Auth from "../pages/Auth";

function AppShellWithSidebar() {
  const [activeKey, setActiveKey] = useState("inbox");

  return (
    <AppShell sidebar={<Sidebar activeKey={activeKey} onChange={setActiveKey} />}>
      <Home activeKey={activeKey} />
    </AppShell>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppShellWithSidebar />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
