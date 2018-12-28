import db from '../models/index';
import { payloadResponse, plainResponse } from '../utils/response';

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

export const addLocation = (req, res) => {
  const {
    male, female, name, parent,
  } = req.body;
  let maleCount = 0;
  let femaleCount = 0;
  if (male) {
    maleCount = male;
  }
  if (female) {
    femaleCount = female;
  }
  const totalCount = +maleCount + +femaleCount;
  if (!name) {
    return plainResponse(req, res, 400, 'Location name is required', false);
  }

  return Locations.create({
    name, male: maleCount, female: femaleCount, total: totalCount, ParentLocationId: parent,
  })
    .then(location => payloadResponse(req, res, 200, 'Location added successfully', true, location, 'location'));
};
