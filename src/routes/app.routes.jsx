import { Routes, Route } from "react-router-dom";

import { useAuth } from "../hooks/auth";

import { Home } from "../pages/Home";

export function AppRoutes() {
  const { user } = useAuth();

  function handleRoutes() {
    if (user.id == 1) {
      return (
        <Routes>
          <Route path="/" index element={<Home />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/" index element={<Home />} />
        </Routes>
      );
    }
  }

  return handleRoutes();
}
