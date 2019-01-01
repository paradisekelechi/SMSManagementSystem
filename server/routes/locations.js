import express from 'express';
import {
  getLocations, addLocation, editLocation, deleteLocation,
} from '../controllers/locations';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    getLocations(req, res);
  })
  .post((req, res) => {
    addLocation(req, res);
  });

router.route('/:id')
  .put((req, res) => {
    editLocation(req, res);
  });

router.route('/:id')
  .delete((req, res) => {
    deleteLocation(req, res);
  });

export default router;
