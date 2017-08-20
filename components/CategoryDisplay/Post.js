var _this = this;

const React = require('react');

let Post = React.createClass({
  displayName: "Post",

  render: () => {
    return React.createElement(
      "a",
      { "class": "grid-item post-link", href: `blog.khanmurad.com/post/${_this.props.data.slug}` },
      React.createElement(
        "div",
        { "class": "post cover-image", style: `background-image: url("https://source.unsplash.com/featured/?${_this.props.data.categories[0]}");` },
        React.createElement(
          "div",
          { "class": "post-title" },
          React.createElement(
            "h3",
            null,
            _this.props.data.title
          )
        ),
        React.createElement(
          "div",
          { "class": "post-summary" },
          React.createElement(
            "p",
            null,
            _this.props.data.summary
          )
        )
      )
    );
  }
});

module.exports = Post;