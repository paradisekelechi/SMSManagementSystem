'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteContact = exports.editContact = exports.addContact = exports.getContacts = undefined;

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

var _response = require('../utils/response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Contacts = _index2.default.Contacts;
var getContacts = exports.getContacts = function getContacts(req, res) {
  return Contacts.findAndCountAll({ order: [['createdAt', 'DESC']] }).then(function (contacts) {
    res.status(200).send({
      contacts: contacts,
      message: 'Contacts gotten successfully',
      success: true
    });
  }).catch(function (error) {
    (0, _response.payloadResponse)(req, res, 400, 'Contacts retrieval failed', false, error, 'error');
  });
};

var addContact = exports.addContact = function addContact(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      phone = _req$body.phone;


  if (!name) {
    return (0, _response.plainResponse)(req, res, 400, 'Contact name is required', false);
  }

  if (!phone) {
    return (0, _response.plainResponse)(req, res, 400, 'Contact phone is required', false);
  }

  return Contacts.create({
    name: name.toLowerCase(), phone: phone
  }).then(function (contact) {
    return (0, _response.payloadResponse)(req, res, 200, 'Contact added successfully', true, contact, 'contact');
  });
};

var editContact = exports.editContact = function editContact(req, res) {
  var id = req.params.id;
  var phone = req.body.phone;

  if (!phone) {
    return (0, _response.plainResponse)(req, res, 400, 'Contact phone is required', false);
  }

  return Contacts.update({ phone: phone }, { where: { id: id } }).then(function (contact) {
    return (0, _response.payloadResponse)(req, res, 200, 'Contact updated successfully', true, contact, 'contact');
  });
};

var deleteContact = exports.deleteContact = function deleteContact(req, res) {
  var id = req.params.id;

  return Contacts.destroy({ where: { id: id } }).then(function (contact) {
    return (0, _response.payloadResponse)(req, res, 200, 'Contact deleted successfully', true, contact, 'contact');
  });
};