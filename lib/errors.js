'use strict';

var createError = require('errno').create;

var VpubcoreNodeError = createError('VpubcoreNodeError');

var RPCError = createError('RPCError', VpubcoreNodeError);

module.exports = {
  Error: VpubcoreNodeError,
  RPCError: RPCError
};
