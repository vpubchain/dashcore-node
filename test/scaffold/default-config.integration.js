'use strict';

var path = require('path');
var should = require('chai').should();
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('#defaultConfig', function() {
  var expectedExecPath = path.resolve(__dirname, process.env.HOME, './.vpub/data/vpubd');

  it('will return expected configuration', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3002,
      services: [
        'vpubd',
        'web',
        '@vpubevo/insight-api',
        '@vpubevo/insight-ui'
      ],
      servicesConfig: {
        vpubd: {
          connect: [{
            rpchost: '127.0.0.1',
            rpcport: 11772,
            rpcuser: 'rpcuser',
            rpcpassword: '123456',
            zmqpubrawtx: 'tcp://127.0.0.1:28332'
           }]
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.vpub/vpubcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig();
    info.path.should.equal(home + '/.vpub');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3002);
    info.config.services.should.deep.equal(['vpubd', 'web']);
    var vpubd = info.config.servicesConfig.vpubd;
    should.exist(vpubd);
  });
  it('will include additional services', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3002,
      services: [
        'vpubd',
        'web',
        '@vpubevo/insight-api',
        '@vpubevo/insight-ui'
      ],
      servicesConfig: {
        vpubd: {
          connect: [{
            rpchost: '127.0.0.1',
            rpcport: 11772,
            rpcuser: 'rpcuser',
            rpcpassword: '123456',
            zmqpubrawtx: 'tcp://127.0.0.1:28332'
          }]
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.vpub/vpubcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig({
      additionalServices: ['insight-api', 'insight-ui']
    });
    info.path.should.equal(home + '/.vpub');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3002);
    info.config.services.should.deep.equal([
      'vpubd',
      'web',
      'insight-api',
      'insight-ui'
    ]);
    var vpubd = info.config.servicesConfig.vpubd;
    should.exist(vpubd);
  });
});
