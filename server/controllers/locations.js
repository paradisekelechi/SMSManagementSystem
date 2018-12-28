import db from '../models/index';
import { payloadResponse } from '../utils/response';

const { Locations } = db;

export const getLocations = (req, res) => Locations.findAndCountAll({ order: [['createdAt', 'DESC']], where: { deleted: false } })
  .then((locations) => {
    res.status(200).send({
      locations,
      message: 'Locations gotten successfully',
      success: true,
    });
  })
  .catch((error) => {
    payloadResponse(req, res, 400, 'Locations retrieval failed', false, error, 'error');
  });

export const addLocation = () => { };
