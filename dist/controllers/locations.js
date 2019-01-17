'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteLocation = exports.editLocation = exports.addLocation = exports.getLocations = undefined;

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

var _response = require('../utils/response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Locations = _index2.default.Locations;
var getLocations = exports.getLocations = function getLocations(req, res) {
  return Locations.findAndCountAll({ order: [['createdAt', 'DESC']] }).then(function (locations) {
    res.status(200).send({
      locations: locations,
      message: 'Locations gotten successfully',
      success: true
    });
  }).catch(function (error) {
    (0, _response.payloadResponse)(req, res, 400, 'Locations retrieval failed', false, error, 'error');
  });
};

var addLocation = exports.addLocation = function addLocation(req, res) {
  var _req$body = req.body,
      male = _req$body.male,
      female = _req$body.female,
      name = _req$body.name,
      parent = _req$body.parent;

  var maleCount = 0;
  var femaleCount = 0;
  if (male) {
    maleCount = male;
  }
  if (female) {
    femaleCount = female;
  }
  if (!name) {
    return (0, _response.plainResponse)(req, res, 400, 'Location name is required', false);
  }

  return Locations.create({
    name: name.toLowerCase(), male: maleCount, female: femaleCount, ParentLocationId: parent
  }).then(function (location) {
    return (0, _response.payloadResponse)(req, res, 200, 'Location added successfully', true, location, 'location');
  });
};

var editLocation = exports.editLocation = function editLocation(req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      male = _req$body2.male,
      female = _req$body2.female,
      parent = _req$body2.parent;

  var payload = {};
  if (male) {
    payload.male = _index2.default.sequelize.literal('male - ' + male);
  }
  if (female) {
    payload.female = _index2.default.sequelize.literal('female - ' + female);
  }
  if (parent) {
    payload.ParentLocationId = parent;
  }

  return Locations.update(payload, { where: { id: id } }).then(function (location) {
    return (0, _response.payloadResponse)(req, res, 200, 'Location updated successfully', true, location, 'location');
  });
};

var deleteLocation = exports.deleteLocation = function deleteLocation(req, res) {
  var id = req.params.id;

  return Locations.destroy({ where: { id: id } }).then(function (location) {
    return (0, _response.payloadResponse)(req, res, 200, 'Location deleted successfully', true, location, 'location');
  });
};