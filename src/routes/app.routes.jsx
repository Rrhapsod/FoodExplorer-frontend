import { Routes, Route } from "react-router-dom";

import { useAuth } from "../hooks/auth";

import { Home } from "../pages/Home";
import { New } from "../pages/New";

export function AppRoutes() {
  const { user } = useAuth();

  const handleRoutes = () => {
    if (user.id == 1) {
      return (
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/new" element={<New />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/" index element={<Home />} />
        </Routes>
      );
    }
  };

  return handleRoutes();
}
