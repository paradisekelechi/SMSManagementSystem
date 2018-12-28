import express from 'express';
import {
  getLocations,
} from '../controllers/locations';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    getLocations(req, res);
  });

export default router;
