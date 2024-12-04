const express = require('express');
const router = express.Router();
const {
  getChats,
  getChatById,
  createChat,
  updateChat,
  deleteChat,
  // addMessage,
  autoResponse,
} = require('../controllers/chats');

router.get('/', getChats);

router.get('/:id', getChatById);

router.post('/', createChat);

router.put('/:id', updateChat);

router.delete('/:id', deleteChat);

// router.post('/:id/message', addMessage);

router.post('/auto-response', autoResponse);

module.exports = router;
