import db from '../models/index';
import { payloadResponse, plainResponse } from '../utils/response';

const { Messages } = db;

export const getMessages = (req, res) => Messages.findAndCountAll({ order: [['createdAt', 'DESC']] })
  .then((messages) => {
    res.status(200).send({
      messages,
      message: 'Messages gotten successfully',
      success: true,
    });
  })
  .catch((error) => {
    payloadResponse(req, res, 400, 'Messages retrieval failed', false, error, 'error');
  });

export const getMessage = (req, res) => {
  const { id } = req.params;


  Messages.find({ order: [['createdAt', 'DESC']] }, { where: { id } })
    .then((message) => {
      res.status(200).send({
        message,
        info: 'Message gotten successfully',
        success: true,
      });
    })
    .catch((error) => {
      payloadResponse(req, res, 400, 'Message retrieval failed', false, error, 'error');
    });
};

export const sendMessage = (req, res) => {
  const {
    senderId, receiverId, body,
  } = req.body;

  if (!senderId) {
    return plainResponse(req, res, 400, 'Sender id is required', false);
  }

  if (!receiverId) {
    return plainResponse(req, res, 400, 'Receiver id is required', false);
  }

  return Messages.create({
    senderId, receiverId, body,
  })
    .then(message => payloadResponse(req, res, 200, 'Message sent successfully', true, message, 'message'));
};

export const deleteMessage = (req, res) => {
  const { id } = req.params;
  return Messages.destroy({ where: { id } })
    .then(message => payloadResponse(req, res, 200, 'Message deleted successfully', true, message, 'message'));
};
