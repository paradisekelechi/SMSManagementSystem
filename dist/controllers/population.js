'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPopulationByLocation = exports.getPopulation = undefined;

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

var _response = require('../utils/response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Locations = _index2.default.Locations;


var getPopulationData = function getPopulationData(rawData) {
  var malePopulation = 0;
  var femalePopulation = 0;
  rawData.forEach(function (location) {
    malePopulation += +location.dataValues.male;
    femalePopulation += +location.dataValues.female;
  });
  return {
    malePopulation: malePopulation,
    femalePopulation: femalePopulation,
    totalPopulation: malePopulation + femalePopulation
  };
};

var getPopulation = exports.getPopulation = function getPopulation(req, res) {
  return Locations.findAll({ order: [['createdAt', 'DESC']] }).then(function (locations) {
    var population = getPopulationData(locations);
    res.status(200).send({
      population: population,
      message: 'Population gotten successfully',
      success: true
    });
  }).catch(function (error) {
    (0, _response.payloadResponse)(req, res, 400, 'Population retrieval failed', false, error, 'error');
  });
};

var getPopulationByLocation = exports.getPopulationByLocation = function getPopulationByLocation(req, res) {
  var location = req.params.location;


  Locations.findAll({ order: [['createdAt', 'DESC']], where: { name: location.toLowerCase() } }).then(function (locations) {
    var population = getPopulationData(locations);
    res.status(200).send({
      population: population,
      message: 'Population gotten successfully',
      success: true
    });
  }).catch(function (error) {
    (0, _response.payloadResponse)(req, res, 400, 'Population retrieval failed', false, error, 'error');
  });
};