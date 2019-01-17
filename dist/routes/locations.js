'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _locations = require('../controllers/locations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(function (req, res) {
  (0, _locations.getLocations)(req, res);
}).post(function (req, res) {
  (0, _locations.addLocation)(req, res);
});

router.route('/:id').put(function (req, res) {
  (0, _locations.editLocation)(req, res);
});

router.route('/:id').delete(function (req, res) {
  (0, _locations.deleteLocation)(req, res);
});

exports.default = router;