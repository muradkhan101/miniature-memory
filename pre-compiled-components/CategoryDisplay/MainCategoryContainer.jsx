const React = require('react');
const react_redux = require('react-redux');
const contentful = require('../../contentful/contentfulAPI');
const CategoriesContainer = require('./CategoriesContainer');

const mapStateToProps = (state) => {
  return {
    categories: state
  };
}
let MainCategoryContainer = react_redux.connect(
  mapStateToProps
)(CategoriesContainer);

// class MainCategoryContainer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {categories: props.state, store: props.store}
//   }
//   toggleCategory(category) {
//     console.log(category);
//     this.state.store.dispatch(toggleVisibility(category));
//   }
//   render() {
//     return (
//       <CategoriesContainer categories={this.state.categories} toggleCategory={this.toggleCategory.bind(this)} />
//     )
//   }
// }
module.exports = MainCategoryContainer;
