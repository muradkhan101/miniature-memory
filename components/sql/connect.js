const sql = require('mysql');
const config = require('./config.json');

const connection = sql.createConnection(config.credentials);

const doQuery = (params, connection, f) => {
  connection.connect();
  f(params, connection);
  connection.end();
}
module.exports = {
  connection,
  doQuery
}
