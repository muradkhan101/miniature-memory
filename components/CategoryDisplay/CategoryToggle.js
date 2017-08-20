var _this = this;

const React = require('react');

let CategoryToggle = React.createClass({
  displayName: "CategoryToggle",

  render: () => {
    return React.createElement(
      "div",
      { "class": "checkbox" },
      React.createElement("input", { type: "checkbox", id: `${_this.props.category}-checkbox`, onClick: _this.props.toggleCategory, checked: _this.props.checked }),
      React.createElement(
        "label",
        { "for": `${_this.props.category}-checkbox` },
        `${_this.props.category[0].toUpperCase() + _this.props.category.slice(1)}`
      )
    );
  }
});

module.exports = CategoryToggle;