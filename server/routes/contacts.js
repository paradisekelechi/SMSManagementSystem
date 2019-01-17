import express from 'express';
import {
  getContacts, addContact, editContact, deleteContact,
} from '../controllers/contacts';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    getContacts(req, res);
  })
  .post((req, res) => {
    addContact(req, res);
  });

router.route('/:id')
  .put((req, res) => {
    editContact(req, res);
  });

router.route('/:id')
  .delete((req, res) => {
    deleteContact(req, res);
  });

export default router;
