import { FaBars, FaUserCircle, FaCog } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="flex justify-between items-center bg-white shadow px-4 py-3 sticky top-0 z-10">
      <button onClick={toggleSidebar} className="md:hidden text-xl">
        <FaBars />
      </button>
      <div className="flex items-center space-x-4">
        <FaUserCircle className="text-2xl" />
        <FaCog className="text-2xl" />
      </div>
    </div>
  );
};

export default Navbar;
