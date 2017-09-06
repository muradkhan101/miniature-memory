const express = require('express');
// const email = require('./components/aws/email')
const bodyparser = require('body-parser')
const email = require('./components/sql/sql-email')
const connect = require('./components/sql/connect')

const app = express();
const port = 3000;

app.use(express.static('test'));
app.use(bodyparser.json());
app.post('/email', email.addEmail);
// app.use(handleRender);

connect.doQuery(['theorginazation@yahoo.com'], connect.connection, email.addEmail)

app.listen(port);
