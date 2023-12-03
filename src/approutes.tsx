import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Bot from "./pages/bot";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Dashboard} />
        <Route path="/bot/:botId" Component={Bot} />
        <Route
          path="*"
          Component={() => (
            <p className="text-center h-screen flex flex-col items-center justify-center">404, Page not found</p>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}
