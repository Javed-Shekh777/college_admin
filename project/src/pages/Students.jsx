import { useEffect, useState } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import { FaRegEye } from 'react-icons/fa';
import { MdDelete, MdEdit } from "react-icons/md";



const Students = () => {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);


  console.log("Students:", students);
  const fetchStudents = async () => {
  try {
    const res = await axios.get('/user/getUsers');
    setStudents(res.data.data);
    toast.success(res.data.message);
  } catch (err) {
    toast.error(err.response?.data?.message || 'Error fetching students');
  }
};




 useEffect(() => {
  fetchStudents();
}, []);


  // Filtered list based on search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle selection
  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Send certificates to selected users
  const handleSendCertificates = async () => {
    if (selectedIds.length === 0) {
      toast.error('Please select at least one participant.');
      return;
    }
    setLoading(true);
    setMessage('');

    // In handleSendCertificates
    const total = selectedIds.length;
    let completed = 0;

    try {

      const res = await axios.post('/user/send-certificates', { userIds: selectedIds });
      toast.success(res.data.message || 'Certificates sent successfully!');
      setMessage(res.data.message || 'Certificates sent successfully!');
    } catch (err) {
      toast.error('Error sending certificates.')
      setMessage('Error sending certificates.');
    } finally {
      setLoading(false);
    }
  };


 
 // Delete User 
 const deleteUser = async (id) => {
  try {
    const res = await axios.delete("/user/deleteUser", { data: { id } });
    toast.success(res.data.message || "User deleted");
    fetchStudents(); // Refresh list
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete user.");
  }
};

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-20 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 text-blue-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <p className="text-blue-700 font-semibold">Sending certificates... Please wait.</p>
          </div>
        </div>
      )}



      {message && (
        <div className="mb-4 text-green-600 font-semibold">
          {message}
        </div>
      )}
      <div className="p-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Student List</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or email"
          className="mb-4 px-4 py-2 border rounded w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Send Button */}
        <button
          onClick={handleSendCertificates}
          className="mb-6 px-4 sm:ml-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Send Certificates to Selected
        </button>

        {/* Responsive Layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Select</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Mobile</th>
                <th className="px-4 py-2">Participated</th>
                <th className="px-4 py-2">Operations</th>

              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id} className="border-t">
                  <td className="px-4 py-2">
                    {student.isParticipated && (
                      <input
                        type="checkbox"
                        className='h-5 w-5'
                        checked={selectedIds.includes(student._id)}
                        onChange={() => toggleSelect(student._id)}
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  <td className="px-4 py-2">{student.mobile}</td>
                  <td className="px-4 py-2">{student.isParticipated ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 flex items-center gap-3">
                    <button type='button' className='bg-slate-200 rounded-full p-1 h-8 w-8 flex items-center justify-center hover:text-white hover:bg-yellow-500 cursor-pointer' onClick={() => setSelectedStudent(student)}><FaRegEye /></button>
                    <button type='button' className='bg-slate-200 rounded-full p-1 h-8 w-8 flex items-center justify-center hover:text-white hover:bg-green-500 cursor-pointer' ><MdEdit /></button>
                    <button type='button' className='bg-slate-200 rounded-full p-1 h-8 w-8 flex items-center justify-center hover:text-white hover:bg-red-500 cursor-pointer' onClick={()=>deleteUser(student?._id)}><MdDelete /></button>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {filteredStudents.map((student) => (
            <div key={student._id} className="bg-white border rounded shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{student.name}</h3>
                {student.isParticipated && (
                  <input
                    type="checkbox"
                    className='h-5 w-5'

                    checked={selectedIds.includes(student._id)}
                    onChange={() => toggleSelect(student._id)}
                  />
                )}
              </div>
              <p className="text-sm text-gray-600">📧 {student.email}</p>
              <p className="text-sm text-gray-600">📱 {student.mobile}</p>
              <p className="text-sm text-gray-600">
                ✅ Participated: {student.isParticipated ? 'Yes' : 'No'}
              </p>
            </div>
          ))}
        </div>
      </div>

      <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />


    </>

  );
};

export default Students;



const StudentModal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
          🎓 Student Profile
        </h2>

        {/* Info Grid */}
        <div className="space-y-3 text-gray-700">
          <div>
            <span className="font-semibold">👤 Name:</span> {student.name}
          </div>
          <div>
            <span className="font-semibold">📧 Email:</span> {student.email}
          </div>
          <div>
            <span className="font-semibold">📱 Mobile:</span> {student.mobile}
          </div>
          <div>
            <span className="font-semibold">🏠 Address:</span> {student.address}
          </div>
          <div>
            <span className="font-semibold">👨 Father:</span> {student.fatherName}
          </div>
          <div>
            <span className="font-semibold">👩 Mother:</span> {student.motherName}
          </div>
          <div>
            <span className="font-semibold">📅 Participation Date:</span>{' '}
            {new Date(student.dateOfParticipation).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">✅ Participated:</span>{' '}
            {student.isParticipated ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
    </div>
  );
};



