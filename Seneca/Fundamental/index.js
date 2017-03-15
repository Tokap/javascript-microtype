const Bluebird = require('bluebird');
const seneca   = require('seneca')();
const R        = require('ramda')

const act = Bluebird.promisify(seneca.act, {context: seneca});
