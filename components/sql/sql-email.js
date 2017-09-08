const emailConstants = {
  db: 'email',
  mainTable:  'MAILING_LIST'
}

// mysql.connection.changeUser({database: emaildb});

const checkEmail = (email, connection) => {
  return new Promise(function(resolve, reject) {
    connection.query(
      `SELECT * FROM ${emailConstants.mainTable}
       WHERE ADDRESS = ?;`,
      email, (error, results, fields) => {
        if (error) { reject(error);}
        resolve(results.length !== 0);
      }
    )
  })
}

const addEmail = (email, connection) => {
  return new Promise(function(resolve, reject) {
    resolve(connection.changeUser({database: emailConstants.db}));
  }).then(() => checkEmail(email, connection))
    .then((exists) => {
        if (!exists) {
        connection.query(
          `INSERT INTO ${emailConstants.mainTable} (ADDRESS)
          VALUES (?);`,
          email, (error, results, fields) => {
            if (error) throw (error);
            console.log(`${email} added to mailing list!`);
          }
        )
        return `${email} added to mailing list!`;
      } throw (`${email} already exists in Mailing List.`);
    })
}

const updateStatus = (parameters, connection) => {
  return new Promise(function(resolve, reject) {
    resolve(connection.changeUser({database: emailConstants.db}))
  }).then(() => checkEmail(parameters[1], connection))
    .then((exists) => {
      if (exists) {
        connection.query(
          `UPDATE ${emailConstants.mainTable}
          SET ACTIVE = ?
          WHERE ADDRESS = ?;`,
          parameters, (error, results, fields) => {
            if (error)  throw (error);
            console.log(`Mailing status updated for ${parameters[1]} to ${parameters[0]}.`);
          }
        )
        return `Mailing status updated for ${parameters[1]} to ${parameters[0]}`;
      } throw (`${parameters[1]} doesn't exist in Mailing List.`);
    })
  }

module.exports = {
  addEmail,
  updateStatus
}
