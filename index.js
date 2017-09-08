const express = require('express');
const bodyparser = require('body-parser')
const email = require('./components/sql/sql-email')
const connect = require('./components/sql/connect')
const contentful = require('./components/contentful/contentfulAPI');

const app = express();
const port = 3000;

const nunjucks = require('nunjucks');
nunjucks.configure('components/templates', {
  autoescape: true,
  express: app
})

app.use(bodyparser.json());


//Search Page
app.get('/search', (req, res) => {
  var query = req.parameters;
  contentful.search(query).then(posts => {
    var info = {posts, isPost: true};
    res.render('search.njk', postInfo);
  }).catch(err => {
    console.log(err);
    res.render('search.njk');
  })
});

//E-Mail API
app.post('/email', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  connect.doQuery([req.body.email], connect.connection, email.addEmail).then(response => {
      res.status(response.code).send(response.text)
  });
})
app.post('/email/unsubscribe', function(req, res) {
  connect.doQuery([0, req.body.email], connect.connection, email.updateStatus).then(response => {
    res.status(response.code).send(response.text)
  });
})
// app.use(handleRender);

// connect.doQuery([0, 'testuser@test.com'], connect.connection, email.addEmail)

app.listen(port);
