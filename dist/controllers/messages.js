'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMessage = exports.sendMessage = exports.getMessage = exports.getMessages = undefined;

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

var _response = require('../utils/response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Messages = _index2.default.Messages;
var getMessages = exports.getMessages = function getMessages(req, res) {
  return Messages.findAndCountAll({ order: [['createdAt', 'DESC']] }).then(function (messages) {
    res.status(200).send({
      messages: messages,
      message: 'Messages gotten successfully',
      success: true
    });
  }).catch(function (error) {
    (0, _response.payloadResponse)(req, res, 400, 'Messages retrieval failed', false, error, 'error');
  });
};

var getMessage = exports.getMessage = function getMessage(req, res) {
  var id = req.params.id;


  Messages.find({ order: [['createdAt', 'DESC']] }, { where: { id: id } }).then(function (message) {
    res.status(200).send({
      message: message,
      info: 'Message gotten successfully',
      success: true
    });
  }).catch(function (error) {
    (0, _response.payloadResponse)(req, res, 400, 'Message retrieval failed', false, error, 'error');
  });
};

var sendMessage = exports.sendMessage = function sendMessage(req, res) {
  var _req$body = req.body,
      senderId = _req$body.senderId,
      receiverId = _req$body.receiverId,
      body = _req$body.body;


  if (!senderId) {
    return (0, _response.plainResponse)(req, res, 400, 'Sender id is required', false);
  }

  if (!receiverId) {
    return (0, _response.plainResponse)(req, res, 400, 'Receiver id is required', false);
  }

  return Messages.create({
    senderId: senderId, receiverId: receiverId, body: body
  }).then(function (message) {
    return (0, _response.payloadResponse)(req, res, 200, 'Message sent successfully', true, message, 'message');
  });
};

var deleteMessage = exports.deleteMessage = function deleteMessage(req, res) {
  var id = req.params.id;

  return Messages.destroy({ where: { id: id } }).then(function (message) {
    return (0, _response.payloadResponse)(req, res, 200, 'Message deleted successfully', true, message, 'message');
  });
};