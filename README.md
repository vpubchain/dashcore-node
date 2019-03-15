Vpubcore Node
============

## Usages

### As a standalone server

```bash
git clone https://github.com/vpubchain/vpubcore-node.git
cd vpubcore-node
./bin/vpubcore-node start
```

When running the start command, it will seek for a .vpub folder with a vpubcore-node.json conf file.
If it doesn't exist, it will create it, with basic task to connect to vpubd.

Some plugins are available :

- Insight-API : `./bin/vpubcore-node addservice @vpubchain/insight-api`
- Insight-UI : `./bin/vpubcore-node addservice @vpubchain/insight-ui`

You also might want to add these index to your vpub.conf file :
```
-addressindex
-timestampindex
-spentindex
```

### As a library

```bash
npm install @vpubevo/vpubcore-node
```

```javascript
const vpubcore = require('@vpubevo/vpubcore-node');
const config = require('./vpubcore-node.json');

let node = vpubcore.scaffold.start({ path: "", config: config });
node.on('ready', function() {
    //Vpub core started
    vpubd.on('tx', function(txData) {
        let tx = new vpubcore.lib.Transaction(txData);
    });
});
```

## Prerequisites

- Vpub Core (vpubd) (v0.1.1) with support for additional indexing *(see above)*
- Node.js v0.10, v0.12, v4 or v5
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~20GB of disk storage
- ~1GB of RAM

## Configuration

Vpubcore includes a Command Line Interface (CLI) for managing, configuring and interfacing with your Vpubcore Node.

```bash
vpubcore-node create -d <vpub-data-dir> mynode
cd mynode
vpubcore-node install <service>
vpubcore-node install https://github.com/yourname/helloworld
vpubcore-node start
```

This will create a directory with configuration files for your node and install the necessary dependencies.

Please note that [Vpub Core](https://github.com/vpubchain/vpub) needs to be installed first.

## Add-on Services

There are several add-on services available to extend the functionality of Bitcore:

- [Insight API](https://github.com/vpubchain/insight-api/tree/master)
- [Insight UI](https://github.com/vpubchain/insight-ui/tree/master)



## Setting up dev environment (with Insight)

Prerequisite : Having a vpubd node already runing `vpubd --daemon`.

Vpubcore-node : `git clone https://github.com/vpubchain/vpubcore-node`
Insight-api (optional) : `git clone https://github.com/vpubchain/insight-api`
Insight-UI (optional) : `git clone https://github.com/vpubchain/insight-ui`

Install them :
```
cd vpubcore-node && npm install \
 && cd ../insight-ui && npm install \
 && cd ../insight-api && npm install && cd ..
```

Symbolic linking in parent folder :
```
npm link ../insight-api
npm link ../insight-ui
```

Start with `./bin/vpubcore-node start` to first generate a ~/.vpub/vpubcore-node.json file.
Append this file with `"@vpubchain/insight-ui"` and `"@vpubchain/insight-api"` in the services array.


## License

Code released under [the MIT license](https://github.com/vpubevo/vpubcore-node/blob/master/LICENSE).

Copyright 2013-2015 BitPay, Inc.

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)
