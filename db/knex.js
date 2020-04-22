// let knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host: 'localhost',
//     database: 'coda_connections_development'
//   }
// });

// module.exports = knex;

let environment = process.env.NODE_ENV || 'development' || 3000;
let config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);
