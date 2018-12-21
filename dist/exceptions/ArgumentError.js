"use strict";
/**
 * Attribution: https://github.com/ngonzalvez/rest-facade/blob/master/src/exceptions/ArgumentError.js
 */

var util = require('util');

var ArgumentError = function ArgumentError(message) {
  this.name = 'ArgumentError';
  this.message = message || '';
  Error.captureStackTrace(this, this.constructor);
};

util.inherits(ArgumentError, Error);
module.exports = ArgumentError;