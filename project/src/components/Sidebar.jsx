import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaCog } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";


const Sidebar = ({ isOpen }) => {
  return (
    <div className={`bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 z-20 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
      <div className="p-6 text-2xl font-bold">Dashboard</div>
      <nav className="space-y-2 px-4">
        <NavLink to="/" end className={({ isActive }) => `flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}>
          <FaHome />
          <span>Home</span>
        </NavLink>
        
        <NavLink to="/addStudent" className={({ isActive }) => `flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}>
          <FaUserPlus />
          <span>Students</span>
        </NavLink>
        <NavLink to="/students" className={({ isActive }) => `flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}>
          <FaUsers />
          <span>Students</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}>
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
