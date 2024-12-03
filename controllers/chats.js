const { Chat, validateChat } = require('../models/chat');
const axios = require('axios');

const getChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chats' });
  }
};

const getChatById = async (req, res) => {
  const { chatId } = req.body;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat' });
  }
};

const createChat = async (req, res) => {
  const { firstName, lastName, userId } = req.body;

  const { error } = validateChat(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const newChat = new Chat({ firstName, lastName, userId });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat' });
  }
};

const updateChat = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, userId } = req.body;

  const { error } = validateChat(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      { firstName, lastName, userId },
      { new: true }
    );
    if (!updatedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.status(200).json(updatedChat);
  } catch (error) {
    res.status(500).json({ message: 'Error updating chat' });
  }
};

const deleteChat = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedChat = await Chat.findByIdAndDelete(id);
    if (!deletedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chat' });
  }
};

const addMessage = async (req, res) => {
  const { sender, message, chatId } = req.body;

  if (!message || !sender) {
    return res.status(400).json({ message: 'Sender and message are required' });
  }

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    chat.messages.push({ sender, message, timestamp: new Date() });

    await chat.save();
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Error adding message' });
  }
};

const autoResponse = async (req, res) => {
  const { chatId } = req.body;
  try {
    const chat = await Chat.findById(chatId);
    const response = await axios.get('https://zenquotes.io/api/random');
    const quote = response.data[0]?.q || 'Stay positive!';
    const author = response.data[0]?.a || 'Anonymous';
    const autoMessage = `${quote} - ${author}`;

    chat.messages.push({
      sender: 'AutoResponder',
      message: autoMessage,
      timestamp: new Date(),
    });

    await chat.save();

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quote' });
  }
};

module.exports = {
  getChats,
  getChatById,
  createChat,
  updateChat,
  deleteChat,
  addMessage,
  autoResponse,
};
