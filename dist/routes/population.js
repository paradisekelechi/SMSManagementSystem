'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _population = require('../controllers/population');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(function (req, res) {
  (0, _population.getPopulation)(req, res);
});

router.route('/:location').get(function (req, res) {
  (0, _population.getPopulationByLocation)(req, res);
});

exports.default = router;