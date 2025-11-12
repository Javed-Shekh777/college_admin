const User = require('../model/userModel');
const Student = require('../model/studentModel');
const {  user, students } = require('../utils/data');


exports.seedInitialData = async () => {
  const userCount = await User.countDocuments();
  const studentCount = await Student.countDocuments();

  if (userCount === 0) {
    await User.create(user);
    console.log('✅ Default admin user created');
  }

  if (studentCount === 0) {
    await Student.insertMany(students);
    console.log('✅ Default students added');
  }
};
