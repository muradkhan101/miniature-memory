const React = require('react');
const contentful = require('../../contentful/contentfulAPI');
const CategoriesContainer = require('./CategoriesContainer');

// const toggleCategory = (toggle) => {
//   this.props.store.dispatch(toggleVisibility(toggle.category));
// }

// const mapStateToProps = (state) => {
//   return {
//     categories: state,
//     toggleCategory
//   };
// }
// let MainCategoryContainer = react_redux.connect(
//   mapStateToProps
// )(CategoriesContainer);

class MainCategoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {categories: props.state, store: props.store}
  }
  toggleCategory(toggle) {
    this.state.store.dispatch(toggleVisibility(toggle.category));
  }
  render() {
    return (
      <CategoriesContainer categories={this.state.categories} toggleCategory={this.toggleCategory} />
    )
  }
}
module.exports = MainCategoryContainer;
