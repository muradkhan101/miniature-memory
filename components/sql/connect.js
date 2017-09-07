const sql = require('mysql');
const config = require('./config.json');

const connection = sql.createConnection(config.credentials);

const doQuery = (params, connection, f) => {
  connection.connect();
  return f(params, connection).then(() => {
    connection.end();
    return 200;
  }).catch((error) => {
    console.log(error);
    connection.end();
    return 400;
  })
}
module.exports = {
  connection,
  doQuery
}
