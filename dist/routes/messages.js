'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _messages = require('../controllers/messages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(function (req, res) {
  (0, _messages.getMessages)(req, res);
});

router.route('/send').post(function (req, res) {
  (0, _messages.sendMessage)(req, res);
});

router.route('/:id').get(function (req, res) {
  (0, _messages.getMessage)(req, res);
}).delete(function (req, res) {
  (0, _messages.deleteMessage)(req, res);
});

exports.default = router;