'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var port = process.env.PORT || 4000;
_routes2.default.set('port', port);

_routes2.default.get('*', function (req, res) {
  res.status(200).send({
    message: 'Base route for population management application',
    success: true
  });
});

_routes2.default.listen(port, function () {
  (0, _logger2.default)('info', 'Population management application started and running on port ' + port);
});

exports.default = _routes2.default;