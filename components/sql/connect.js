const sql = require('mysql');
const config = require('./config.json');

const connection = sql.createConnection(config.credentials);

const doQuery = (params, connection, f) => {
  connection.connect();
  return f(params, connection).then((result) => {
    connection.end();
    return {
      code: 200,
      text: result
    };
  }).catch((error) => {
    console.log(error);
    connection.end();
    return {
      code: 400,
      text: error
    }
  })
}
module.exports = {
  connection,
  doQuery
}
