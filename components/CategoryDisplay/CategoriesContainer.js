var _this = this;

const React = require('react');
const SingleCategoryContainer = require('./SingleCategoryContainer');
const CategoryToggle = require('./CategoryToggle');

let CategoriesContainer = React.createClass({
  displayName: 'CategoriesContainer',

  render: () => {
    return React.createElement(
      'div',
      { 'class': 'card article-container' },
      React.createElement(
        'div',
        { 'class': 'card-title' },
        React.createElement(
          'h1',
          null,
          'Posts by Category'
        )
      ),
      React.createElement(
        'div',
        { 'class': 'category-toggles flex-row' },
        _this.props.categories.map((e, i) => {
          return React.createElement(CategoryToggle, { category: e.category, checked: e.visible, click: _this.toggleCategory });
        })
      ),
      React.createElement(
        'div',
        { 'class': 'home-masonry-grid' },
        _this.props.categories.map((e, i) => {
          return React.createElement(SingleCategoryContainer, { category: e.category, posts: e.posts, visible: e.visible });
        })
      )
    );
  },
  toggleCategory: toggle => {
    dispatch(toggleVisibility(toggle.category));
  }
});

module.exports = CategoriesContainer;
