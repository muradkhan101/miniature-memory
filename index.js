const express = require('express');
const bodyparser = require('body-parser')
const email = require('./components/sql/sql-email')
const random = require('./components/sql/sql-random')
const connect = require('./components/sql/connect')
const contentful = require('./components/contentful/contentfulAPI');
const cors = require('cors');
const constants = require('./components/constants')

const app = express();
const port = process.env.PORT || 3000;

const nunjucks = require('nunjucks');
nunjucks.configure('./components/templates', {
  autoescape: true,
  express: app
})



app.use(express.static('components/files'))
app.use(bodyparser.json());
app.use(cors());

//Random API

app.get('/random', (req, res) => {
  connect.poolQuery(connect.poolQuery, random.getRandomPost).then(result => {
    res.redirect(`${constants.baseURL}/posts/${result.text}`);
  })
})

//Search Page

app.get('/search/:terms', (req, res) => {
  var query = req.params.terms;
  contentful.search(query).then(posts => {
    var postInfo = Object.assign({}, {isPost: true, posts: posts}, constants);
    res.render('search.njk', postInfo);
  }).catch(err => {
    console.log(err);
    res.render('search.njk');
  })
});

//E-Mail API

app.post('/email', function(req, res) {
  connect.doQuery(connect.connection, email.addEmail, [req.body.email]).then(response => {
      res.status(response.code).send(response.text)
  }).catch(err => {
    console.log(err);
    res.send(err);
  });
})
app.post('/email/unsubscribe', function(req, res) {
  connect.doQuery(connect.connection, email.updateStatus, [0, req.body.email]).then(response => {
    res.status(response.code).send(response.text)
  }).catch(err => {
    console.log(err);
    res.send(err);
  })
})
// app.use(handleRender);

// connect.doQuery([0, 'testuser@test.com'], connect.connection, email.addEmail)
console.log('Listening on port:', port)
app.listen(port);
