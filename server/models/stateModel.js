//Schema and model for component configuration state.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
  email: { type: String, unique: true, default: '' },
  page2Components: { type: [String], default: ['birthdate', 'address'] },
  page3Components: { type: [String], default: ['aboutMe'] },
});

module.exports = mongoose.model('StateModel', StateSchema);
