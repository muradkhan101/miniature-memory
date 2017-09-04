const MainCategoryContainer = require('../CategoryDisplay/MainCategoryContainer');
const actions = require('../redux/reducers/actions');
const reactDOM = require('react-dom/server');
const React = require('react');
const redux = require('redux');
const Provider = require('react-redux').Provider;
const thunk = require('redux-thunk').default;
const jsdom = require('jsdom').JSDOM;
const fs = require('fs');

const handleRender = (req, res) => {
  if (req.originalUrl.indexOf('.') === -1) {
  var request = req;
  const store = redux.createStore(actions.handleAction, redux.applyMiddleware(thunk));
  store.dispatch(actions.fetchCategories())
  .then((categories) => store.dispatch(actions.fetchUnloadedPosts(categories)))
  .then(() => {
    const html = reactDOM.renderToString(
      <Provider store={store} >
        <MainCategoryContainer />
      </Provider>
    );
    const preloadedState = store.getState();
    fs.writeFileSync('./categories-load.js', `var preloadedState = ${preloadedState}`);
    // console.log(`Opening file: ${request.originalUrl}`);
    // jsdom.fromFile(`./test/${request.originalUrl.slice(1)}.html`).then(dom => {
    //   return createPrerenderHtml(dom, html, preloadedState);
    // }).then((domString) => {
    //   res.send(domString);
    //   res.end();
    // });
  });
  return 1;
}
};

const createPrerenderHtml = (dom, html, preloadedState) => {
  let document = dom.window.document;
  document.getElementById('react-container').appendChild(jsdom.fragment(html));
  document.querySelector('body').appendChild(jsdom.fragment(
    `<script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script src='client-min.js'></script>`
  ))
  dom.window.document = document;
  return dom.serialize();
}

module.exports = {
  handleRender
}
