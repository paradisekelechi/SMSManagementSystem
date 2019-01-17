'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = require('../utils/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var databaseConfiguration = _config2.default[process.env.NODE_ENV];
var basename = _path2.default.basename(module.filename);
var db = {};
var sequelize = void 0;

if (databaseConfiguration.use_env_variable) {
  sequelize = new _sequelize2.default(databaseConfiguration.use_env_variable, {
    pool: {
      max: 10,
      min: 0,
      idle: 1000
    }
  });
} else {
  var database = databaseConfiguration.database,
      username = databaseConfiguration.username,
      password = databaseConfiguration.password;

  sequelize = new _sequelize2.default(database, username, password, databaseConfiguration);
}

_fs2.default.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize.import(_path2.default.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;

exports.default = db;