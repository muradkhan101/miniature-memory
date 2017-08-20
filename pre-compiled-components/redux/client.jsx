const MainCategoryContainer = require('../CategoryDisplay/MainCategoryContainer');
const React = require('react');
const redux = require('redux');
const reactDOM = require('react-dom');
const Provider = require('react-redux').Provider;

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(MainCategoryContainer, preloadedState);

reactDOM.render(
  <Provider store={store}>
    <MainCategoryContainer />
  </Provider>,
  document.getElementById('react-container')
)
