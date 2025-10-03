import { useState } from "react";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    mobile: "",
    address: "",
    isParticipated: false,
    fatherName: "",
    motherName: "",
    uniqueId: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-center">Add Student</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">Student Name</label>
          <input name="studentName" value={formData.studentName} onChange={handleChange} className="input-box border-[1px] border-gray-50 focus:border-0 shadow p-2 w-full  ring focus:ring-indigo-300 rounded" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} className="input-box border-[1px] border-gray-50 focus:border-0 shadow p-2 w-full  ring focus:ring-indigo-300 rounded" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Mobile</label>
          <input name="mobile" value={formData.mobile} onChange={handleChange} className="input-box border-[1px] border-gray-50 focus:border-0 shadow p-2 w-full  ring focus:ring-indigo-300 rounded" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input name="address" value={formData.address} onChange={handleChange} className="input-box border-[1px] border-gray-50 focus:border-0 shadow p-2 w-full  ring focus:ring-indigo-300 rounded" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Father Name</label>
          <input name="fatherName" value={formData.fatherName} onChange={handleChange} className="input-box border-[1px] border-gray-50 focus:border-0 shadow p-2 w-full  ring focus:ring-indigo-300 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Mother Name</label>
          <input name="motherName" value={formData.motherName} onChange={handleChange} className="input-box border-[1px] border-gray-50 focus:border-0 shadow p-2 w-full  ring focus:ring-indigo-300 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">MongoDB Unique ID</label>
          <input name="uniqueId" value={formData.uniqueId} onChange={handleChange} className="input-box border-[1px] border-gray-50 focus:border-0 shadow p-2 w-full  ring focus:ring-indigo-300 rounded" required />
        </div>
        <div className="flex items-center space-x-2 mt-6">
          <input type="checkbox" name="isParticipated" checked={formData.isParticipated} onChange={handleChange} />
          <label className="font-medium">Participated</label>
        </div>
      </div>

      <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
        Submit
      </button>
    </form>
  );
};

export default AddStudent;
