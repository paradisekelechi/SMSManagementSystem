'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _contacts = require('./contacts');

var _contacts2 = _interopRequireDefault(_contacts);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({
  extended: false
})).use(_bodyParser2.default.text({
  type: 'text/html'
})).use(_bodyParser2.default.json({
  type: 'application/*+json'
})).use(_bodyParser2.default.json()).use(_bodyParser2.default.raw()).use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, user-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api/contacts', _contacts2.default);
app.use('/api/messages', _messages2.default);

exports.default = app;