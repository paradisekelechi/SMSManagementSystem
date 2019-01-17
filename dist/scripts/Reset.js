'use strict';

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = _index2.default.sequelize;

sequelize.sync({ force: true }).then(function () {
  (0, _logger2.default)('info', 'Database forcefully reset');
  process.exit(0);
});