import axios from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaUsers, FaUserPlus, FaUserCheck, FaCog } from "react-icons/fa";

const stats = [
  // { title: "Total Students", value: 120, icon: <FaUsers />, color: "bg-blue-500" },
  { title: "New Admissions", value: 15, icon: <FaUserPlus />, color: "bg-green-500" },
  { title: "Participants", value: 45, icon: <FaUserCheck />, color: "bg-purple-500" },
  { title: "Settings Updated", value: "Today", icon: <FaCog />, color: "bg-yellow-500" },
];

const Home = () => {
  const [totalStudent,setTotalStudent] = useState(0);

  useEffect(() => {
      axios.get('/student/getUsers')
        .then(res => {
          console.log(res.data.data);
          setTotalStudent(res.data?.data?.length);
        })
        .catch(err => {
          toast.error(err.response?.data?.message || 'Error fetching total students');
        });
    }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       <div  className={`flex items-center p-4 rounded-lg shadow-md text-white bg-blue-500`}>
          <div className="text-3xl mr-4"><FaUsers /></div>
          <div>
            <h4 className="text-lg font-semibold">Total Students</h4>
            <p className="text-xl">{totalStudent|| 0}</p>
          </div>
        </div>
      {stats.map((stat, index) => (
        <div key={index} className={`flex items-center p-4 rounded-lg shadow-md text-white ${stat.color}`}>
          <div className="text-3xl mr-4">{stat.icon}</div>
          <div>
            <h4 className="text-lg font-semibold">{stat.title}</h4>
            <p className="text-xl">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
