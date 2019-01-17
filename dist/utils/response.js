"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var plainResponse = exports.plainResponse = function plainResponse(req, res, status, message, success) {
  var responseObject = {
    message: message,
    success: success
  };
  res.status(status).send(responseObject);
};

var payloadResponse = exports.payloadResponse = function payloadResponse(req, res, status, message, success, payload, payloadName) {
  var responseObject = {
    message: message,
    success: success
  };
  responseObject[payloadName] = payload;
  res.status(status).send(responseObject);
};