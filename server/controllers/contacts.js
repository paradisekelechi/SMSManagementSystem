import db from '../models/index';
import { payloadResponse, plainResponse } from '../utils/response';

const { Contacts } = db;

export const getContacts = (req, res) => Contacts.findAndCountAll({ order: [['createdAt', 'DESC']] })
  .then((contacts) => {
    res.status(200).send({
      contacts,
      message: 'Contacts gotten successfully',
      success: true,
    });
  })
  .catch((error) => {
    payloadResponse(req, res, 400, 'Contacts retrieval failed', false, error, 'error');
  });

export const addContact = (req, res) => {
  const {
    name, phone,
  } = req.body;

  if (!name) {
    return plainResponse(req, res, 400, 'Contact name is required', false);
  }

  if (!phone) {
    return plainResponse(req, res, 400, 'Contact phone is required', false);
  }

  return Contacts.create({
    name: name.toLowerCase(), phone,
  })
    .then(contact => payloadResponse(req, res, 200, 'Contact added successfully', true, contact, 'contact'));
};

export const editContact = (req, res) => {
  const { id } = req.params;
  const {
    phone,
  } = req.body;
  if (!phone) {
    return plainResponse(req, res, 400, 'Contact phone is required', false);
  }

  return Contacts.update({ phone }, { where: { id } })
    .then(contact => payloadResponse(req, res, 200, 'Contact updated successfully', true, contact, 'contact'));
};

export const deleteContact = (req, res) => {
  const { id } = req.params;
  return Contacts.destroy({ where: { id } })
    .then(contact => payloadResponse(req, res, 200, 'Contact deleted successfully', true, contact, 'contact'));
};
