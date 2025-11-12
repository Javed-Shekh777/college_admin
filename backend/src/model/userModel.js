const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { SchemaName, SALT } = require('../constans');



const userSchema = new mongoose.Schema({
  username: { type: String, required: true ,trim:true},
  email: { type: String, unique: true, lowercase: true, required: true,trim:true },
  password: { type: String, required: true ,trim:true},
},{timestamps: true});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, SALT);
  next();
});

module.exports = mongoose.model(SchemaName.user, userSchema);
