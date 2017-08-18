const MainCategoryContainer = require('../CategoryDisplay/MainCategoryContainer');
const reactDOM = require('react-dom');
const react = require('react');
const redux = require('redux');
import { Provider } from 'react-redux';

const handleRender = (req, res) => {
  const store = redux.createStore(MainCategoryContainer);
  const html = reactDOM.renderToString(
    <Provider store={store}>
      <MainCategoryContainer/>
    </Provider>
  );
  const preloadedState = store.getState();
  res.send(renderPage(html, preloadedState));
}

const renderPage = (html, preloadedState) => {

}
