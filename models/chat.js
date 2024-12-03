const mongoose = require('mongoose');
const Joi = require('joi');

const chatSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [
    {
      sender: { type: String, required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Chat = mongoose.model('Chat', chatSchema);

const validateChat = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userId: Joi.string().required(),
    messages: Joi.array().items(
      Joi.object({
        sender: Joi.string().required(),
        message: Joi.string().required(),
        timestamp: Joi.date().default(Date.now),
      })
    ),
  });

  return schema.validate(data);
};

module.exports = { Chat, validateChat };
