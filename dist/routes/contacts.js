'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _contacts = require('../controllers/contacts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(function (req, res) {
  (0, _contacts.getContacts)(req, res);
}).post(function (req, res) {
  (0, _contacts.addContact)(req, res);
});

router.route('/:id').put(function (req, res) {
  (0, _contacts.editContact)(req, res);
});

router.route('/:id').delete(function (req, res) {
  (0, _contacts.deleteContact)(req, res);
});

exports.default = router;