const MainCategoryContainer = require('../CategoryDisplay/MainCategoryContainer');
const action = require('./reducers/actions');
const reactDOM = require('react-dom');
const react = require('react');
const redux = require('redux');
const Provider = require('react-redux').Provider;
const jsdom = require('jsdom');
const express = require('express');

const handleRender = (req, res) => {
  const store = redux.createStore(action);
  const html = reactDOM.renderToString(
    <Provider store={store}>
      <MainCategoryContainer/>
    </Provider>
  );
  const preloadedState = store.getState();

  jsdom.fromFile(`${req.baseUrl}.html`).then((dom) => {
    return createHtml(dom, html, preloadedState);
  }).then(res.send);
}

const createHtml = (dom, html, preloadedState) => {
  let document = dom.window.document;
  document.getElementById('react-container').appendChild(html);
  document.querySelector('body').appendChild(jsdom.fragment(
    `<script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script src='client-min.js'></script>`
  ))
  return document.serialize();
}

const app = express();
const port = 3000;

app.use(express.static('test'));

app.use(handleRender);

app.listen(port)
