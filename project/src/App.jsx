import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");

  // Redirect if not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 md:ml-64">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
