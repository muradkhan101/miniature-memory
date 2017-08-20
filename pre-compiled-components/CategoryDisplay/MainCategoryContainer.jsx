const React = require('react');
const react_redux = require('react-redux');
const contentful = require('../../contentful/contentfulAPI');
const CategoriesContainer = require('./CategoriesContainer');

// let CategoryListContainer = react.createClass({
//     getInitialState: () => {
//         return {
//             categories: []
//         }
//     },
    // componentDidMount: () => {
    //     contentful.client.getEntries({
    //       content_type: contentful.typeID.category
    //     }).then((data)=>{
    //       let allCategories = [];
    //       for (var i = 0; i < data.items.length; i++) {
    //         allCategories.push(data.items[i].fields.title);
    //       }
    //       this.setState({categories: allCategories})
    //     })
    // },
//     render: () => {
//       if (this.state.categories.length > 0) {
//         return (
//             (<CategoriesContainer categories={this.state.categories} />)
//           )
//       }
//     }
// })

const mapStateToProps = (state) => {
  return state;
}
const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (category) => dispatch(addCategory(category))
  }
}
let MainCategoryContainer = react_redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesContainer);

contentful.client.getEntries({
  content_type: contentful.typeID.category
}).then((data)=>{
  for (var i = 0; i < data.items.length; i++) {
    dispatch(addCategory(data.items[i].fields.title));
  }
})

module.exports = MainCategoryContainer;
