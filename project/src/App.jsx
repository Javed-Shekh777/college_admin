import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>

      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
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
