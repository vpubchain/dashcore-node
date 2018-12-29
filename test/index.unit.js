'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export vpubcore-lib', function() {
    var vpubcore = require('../');
    should.exist(vpubcore.lib);
    should.exist(vpubcore.lib.Transaction);
    should.exist(vpubcore.lib.Block);
  });
});
