const React = require('react');
const react_redux = require('react-redux');
const CategoriesContainer = require('./CategoriesContainer');

const mapStateToProps = (state) => {
  return {
    categories: state
  };
}
let MainCategoryContainer = react_redux.connect(
  mapStateToProps
)(CategoriesContainer);

module.exports = MainCategoryContainer;
