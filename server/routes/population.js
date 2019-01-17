import express from 'express';
import {
  getPopulation, getPopulationByLocation,
} from '../controllers/population';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    getPopulation(req, res);
  });

router.route('/:location')
  .get((req, res) => {
    getPopulationByLocation(req, res);
  });

export default router;
