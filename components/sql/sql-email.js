const emailConstants = {
  db: 'email',
  mainTable:  'MAILING_LIST'
}

// mysql.connection.changeUser({database: emaildb});

const checkEmail = (email, connection) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${emailConstants.mainTable}
      WHERE 'ADDRESS' = ?;`,
      [email], (error, results, fields) => {
        if (error) reject(error);
        console.log(results)
        if (!(results)) resolve(results);
        reject(results);
      }
    )
  })
}

const addEmail = (email, connection) => {
  connection.changeUser({database: emailConstants.db});
  checkEmail(email, connection).then(data => {
    connection.query(
      `INSERT INTO '${emailConstants.mainTable}'
      VALUES 'ADDRESS' = ?, 'ACTIVE' = 1;`,
      [email], (error, results, fields) => {
        if (error) throw error;
        console.log(`${email} added to mailing list!`);
      }
    )
  }).catch(err => {
    console.log(err);
    console.log('Email may already exist');
  })
}

const updateStatus = (email, connection) => {
  mysql.connection.changeUser({database: emaildb});
  checkEmail(email, connection).then(data => {
    connection.query(
      `UPDATE ${emailConstants.mainTable}
      SET 'ACTIVE' = 0
      WHERE 'ADDRESS' = ?;`,
      [email], (error, results, fields) => {
        if (error) throw error;
        console.log(`Active status updated for ${email}`);
      }
    )
  }).catch(err => {
    console.log(err);
    console.log('Email may already exist');
  })
}

module.exports = {
  addEmail,
  updateStatus
}
