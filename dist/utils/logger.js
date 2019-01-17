'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var combine = _winston.format.combine,
    timestamp = _winston.format.timestamp,
    label = _winston.format.label,
    prettyPrint = _winston.format.prettyPrint;


var config = _winston2.default.createLogger({
  format: combine(label({
    label: 'Population'
  }), timestamp(), prettyPrint()),
  transports: [new _winston2.default.transports.File({
    filename: _path2.default.join(__dirname, '../logs/error.logs'),
    level: 'error'
  }), new _winston2.default.transports.File({
    filename: _path2.default.join(__dirname, '../logs/combined.logs')
  }), new _winston2.default.transports.Console({
    format: _winston2.default.format.simple()
  })]
});

var logger = function logger(level, message) {
  config.log({
    level: level,
    message: message
  });
  return {
    isLogged: true,
    message: message,
    level: level
  };
};

exports.default = logger;