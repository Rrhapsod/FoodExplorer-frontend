import { Routes, Route } from "react-router-dom";

import { useAuth } from "../hooks/auth";

import { Home } from "../pages/Home";
import { New } from "../pages/New";
import { Edit } from "../pages/Edit";
import { DishViewAdmin } from "../pages/DishViewAdmin";
import { DishView } from "../pages/DishView";

export function AppRoutes() {
  const { user } = useAuth();

  const handleRoutes = () => {
    if (user.id == 1) {
      return (
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/dish/:id" element={<DishViewAdmin />} />
          <Route path="/edit/">
            <Route path=":id" element={<Edit />} />
            <Route path="" element={<Edit />} />
          </Route>
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/dish/:id" element={<DishView />} />
        </Routes>
      );
    }
  };

  return handleRoutes();
}
