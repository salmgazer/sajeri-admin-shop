const host = require('./feathersClient').host;
const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');


export default feathers()
    .configure(rest(host).fetch(window.fetch.bind(window)))
 