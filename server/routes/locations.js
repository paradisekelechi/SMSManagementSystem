import express from 'express';
import {
  getLocations, addLocation,
} from '../controllers/locations';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    getLocations(req, res);
  })
  .post((req, res) => {
    addLocation(req, res);
  });

export default router;
