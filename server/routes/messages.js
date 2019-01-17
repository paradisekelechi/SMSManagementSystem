import express from 'express';
import {
  getMessages, sendMessage, getMessage, deleteMessage,
} from '../controllers/messages';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    getMessages(req, res);
  });

router.route('/send')
  .post((req, res) => {
    sendMessage(req, res);
  });

router.route('/:id')
  .get((req, res) => {
    getMessage(req, res);
  })
  .delete((req, res) => {
    deleteMessage(req, res);
  });

export default router;
