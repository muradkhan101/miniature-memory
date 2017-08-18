const MainCategoryContainer = require('../CategoryDisplay/MainCategoryContainer');
const react = require('react');
const redux = require('redux');
const reactDOM = require('react-dom');
import { Provider } from 'react-redux';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(MainCategoryContainer, preloadedState);

reactDOM.render(
  <Provider store={store}>
    <MainCategoryContainer />
  </Provider>,
  document.querySelector('.content-container');
)
