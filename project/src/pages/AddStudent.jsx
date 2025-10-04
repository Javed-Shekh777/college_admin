import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../api/axios";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    isParticipated: false,
    fatherName: "",
    motherName: "",
  });
  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Student name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Father's name is required";
    }

    if (!formData.motherName.trim()) {
      newErrors.motherName = "Mother's name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(formData);
  if (validateForm()) {
    try {
      const res = await axios.post('/student/add', formData);
      console.log(res);
      toast.success(res.data.message);
      setFormData({ name: "", email: "", mobile: "", address: "", isParticipated: false, fatherName: "", motherName: "" });
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || 'Submission failed');
    }
  }
};



  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-center">Add Student</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">Student Name</label>
          <input name="name" value={formData.name} onChange={handleChange} className="input-box border-[1px] border-gray-50 focus:border-0 shadow p-2 w-full  ring focus:ring-indigo-300 rounded" required />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} className="input-box border-[1px] border-gray-50 focus:border-0 shadow p-2 w-full  ring focus:ring-indigo-300 rounded" required />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Mobile</label>
          <input name="mobile" value={formData.mobile} onChange={handleChange} className="input-box border-[1px] border-gray-50 focus:border-0 shadow p-2 w-full  ring focus:ring-indigo-300 rounded" required />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input name="address" value={formData.address} onChange={handleChange} className="input-box border-[1px] border-gray-50 focus:border-0 shadow p-2 w-full  ring focus:ring-indigo-300 rounded" required />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Father Name</label>
          <input name="fatherName" value={formData.fatherName} onChange={handleChange} className="input-box border-[1px] border-gray-50 focus:border-0 shadow p-2 w-full  ring focus:ring-indigo-300 rounded" />
          {errors.fatherName && (
            <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Mother Name</label>
          <input name="motherName" value={formData.motherName} onChange={handleChange} className="input-box border-[1px] border-gray-50 focus:border-0 shadow p-2 w-full  ring focus:ring-indigo-300 rounded" />
          {errors.motherName && (
            <p className="text-red-500 text-sm mt-1">{errors.motherName}</p>
          )}
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
