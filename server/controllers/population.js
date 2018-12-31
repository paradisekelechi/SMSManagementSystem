import db from '../models/index';
import { payloadResponse } from '../utils/response';

const { Locations } = db;

const getPopulationData = (rawData) => {
  let malePopulation = 0;
  let femalePopulation = 0;
  rawData.forEach((location) => {
    malePopulation += +location.dataValues.male;
    femalePopulation += +location.dataValues.female;
  });
  return {
    malePopulation,
    femalePopulation,
    totalPopulation: malePopulation + femalePopulation,
  };
};

export const getPopulation = (req, res) => Locations.findAll({ order: [['createdAt', 'DESC']] })
  .then((locations) => {
    const population = getPopulationData(locations);
    res.status(200).send({
      population,
      message: 'Population gotten successfully',
      success: true,
    });
  })
  .catch((error) => {
    payloadResponse(req, res, 400, 'Population retrieval failed', false, error, 'error');
  });

export const getPopulationByLocation = (req, res) => {
  const { location } = req.params;

  Locations.findAll({ order: [['createdAt', 'DESC']], where: { name: location.toLowerCase() } })
    .then((locations) => {
      const population = getPopulationData(locations);
      res.status(200)
        .send({
          population,
          message: 'Population gotten successfully',
          success: true,
        });
    })
    .catch((error) => {
      payloadResponse(req, res, 400, 'Population retrieval failed', false, error, 'error');
    });
};
