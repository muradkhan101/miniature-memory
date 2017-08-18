var _this = this;

const react = require('react');
const SingleCategoryContainer = require('./SingleCategoryContainer');
const CategoryToggle = require('./CategoryToggle');

let CategoriesContainer = React.createClass({
  displayName: 'CategoriesContainer',

  getInitialState: () => {
    return {
      buttonStates: _this.props.categories.map(e => true)
    };
  },
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
        'this.props.categories.map((e, i) => ',
        React.createElement(CategoryToggle, { category: e, index: i, checked: _this.state.buttonStates[i], click: _this.toggleCategory }),
        ')'
      ),
      React.createElement(
        'div',
        { 'class': 'home-masonry-grid' },
        'this.props.categories.map((e, i) => ',
        React.createElement(SingleCategoryContainer, { category: e, visible: _this.state.buttonStates[i] }),
        ')'
      )
    );
  },
  toggleCategory: toggle => {
    console.log(_this);
    var buttons = _this.state.buttonStates;
    buttons[toggle.index] = !buttons[toggle.index];
    _this.setState({ buttonStates: buttons });
  }
});

module.exports = CategoriesContainer;
