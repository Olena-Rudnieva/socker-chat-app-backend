const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
});

const User = mongoose.model('user', userSchema);

const validateUser = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { User, validateUser };
