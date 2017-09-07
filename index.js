const express = require('express');
// const email = require('./components/aws/email')
const bodyparser = require('body-parser')
const email = require('./components/sql/sql-email')
const connect = require('./components/sql/connect')

const app = express();
const port = 3000;

app.use(express.static('test'));
app.use(bodyparser.json());

app.post('/email', function(req, res) {
  connect.doQuery([req.body.email], connect.connection, email.addEmail).then(code => {
    if (code === 200) {
      res.status(code).send('Success')
    } else if (code === 300) {
      res.status(code).send('Error')
    }
  });
})
app.post('/email/unsubscribe', function(req, res) {
  connect.doQuery([0, req.body.email], connect.connection, email.updateStatus).then(code => {
    if (code === 200) {
      res.status(code).send('Success')
    } else if (code === 400) {
      res.status(code).send('Error')
    }
  });
})
// app.use(handleRender);

// connect.doQuery([0, 'testuser@test.com'], connect.connection, email.addEmail)

app.listen(port);
