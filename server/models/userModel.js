//Schema and models for components
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//The 3 components and progress
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  aboutMe: { type: String, default: '' },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zip: { type: String, default: '' },
  },
  birthdate: { type: Date },
  progress: { type: Number, default: 1 }, // Tracks onboarding progress
});

module.exports = mongoose.model('User', UserSchema);
